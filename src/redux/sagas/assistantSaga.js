import uniqWith from "lodash/uniqWith";
import isEqual from "lodash/isEqual";

import {
    cleanAssistantState,
    setAssistantLoading,
    setDbkfImageMatchDetails,
    setDbkfTextMatchDetails,
    setDbkfVideoMatchDetails, setErrorKey,
    setHpDetails, setImageVideoSelected,
    setInputSourceCredDetails,
    setInputUrl,
    setMtDetails,
    setNeDetails,
    setProcessUrl,
    setProcessUrlActions,
    setScrapedData,
    setSingleMediaPresent,
    setUrlMode
} from "../actions/tools/assistantActions";

import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects'
import assistantApiCalls from "../../components/NavItems/Assistant/AssistantApiHandlers/useAssistantApi";
import DBKFApi from "../../components/NavItems/Assistant/AssistantApiHandlers/useDBKFApi";
import {
    CONTENT_TYPE,
    KNOWN_LINK_PATTERNS,
    KNOWN_LINKS,
    matchPattern,
    NE_SUPPORTED_LANGS,
    selectCorrectActions,
    TYPE_PATTERNS
} from "../../components/NavItems/Assistant/AssistantRuleBook";


/**
 * APIs
 **/
const dbkfAPI = DBKFApi()
const assistantApi = assistantApiCalls()


/**
 * WATCHERS
 **/
function* getUploadSaga() {
    yield takeLatest("SUBMIT_UPLOAD", handleSubmitUpload)
}

function* getMediaListSaga() {
    yield takeLatest("SET_SCRAPED_DATA", handleMediaLists)
}

function* getMediaActionSaga() {
    yield takeLatest("SET_PROCESS_URL", handleMediaActionList)
}

function* getAssistantScrapeSaga() {
    yield takeLatest("SUBMIT_INPUT_URL", handleAssistantScrapeCall)
}

function* getMediaSimilaritySaga() {
    yield takeLatest(["SET_PROCESS_URL", "CLEAN_STATE"], handleMediaSimilarityCall)
}

function* getDbkfTextMatchSaga() {
    yield takeLatest(["SET_SCRAPED_DATA", "CLEAN_STATE"], handleDbkfTextCall)
}

function* getHyperpartisanSaga() {
    yield takeLatest(["SET_SCRAPED_DATA", "CLEAN_STATE"], handleHyperpartisanCall)
}

function* getSourceCredSaga() {
    yield takeLatest(["SET_INPUT_URL", "CLEAN_STATE"], handleSourceCredibilityCall)
}

function* getNamedEntitySaga() {
    yield takeLatest(["SET_SCRAPED_DATA", "CLEAN_STATE"], handleNamedEntityCall)
}

function* getTranslationSaga() {
    yield takeLatest(["RUN_TRANSLATION", "CLEAN_STATE"], handleTranslateCall)
}


/**
 * NON-API HANDLERS
 **/
function* handleMediaLists() {
    const imageList = yield select(state => state.assistant.imageList);
    const videoList = yield select(state => state.assistant.videoList);

    if (imageList.length === 1 && videoList.length === 0) {
        yield put(setProcessUrl(imageList[0], CONTENT_TYPE.IMAGE))
        yield put(setSingleMediaPresent(true))

    } else if (videoList.length === 1 && imageList.length === 0) {
        yield put(setProcessUrl(videoList[0], CONTENT_TYPE.VIDEO))
        yield put(setSingleMediaPresent(true))
    }
}

function* handleMediaActionList() {
    const inputUrl = yield select((state) => state.assistant.inputUrl)
    const processUrl = yield select((state) => state.assistant.processUrl)
    const contentType = yield select(state => state.assistant.processUrlType);

    if (processUrl !== null) {
        let knownInputLink = yield call(matchPattern, inputUrl, KNOWN_LINK_PATTERNS);
        let knownProcessLink = yield call(matchPattern, processUrl, KNOWN_LINK_PATTERNS);
        let actions = yield call(selectCorrectActions, contentType, knownInputLink, knownProcessLink, processUrl);

        yield put(setProcessUrlActions(contentType, actions))
    }
}

function * handleSubmitUpload(action) {
    let contentType = action.payload.contentType
    let known_link = KNOWN_LINKS.OWN;
    let actions = selectCorrectActions(contentType, known_link, known_link, "");
    yield put(setProcessUrlActions(contentType, actions));
    yield put(setImageVideoSelected(true));
}


/**
 * API HANDLERS
 **/
function* handleMediaSimilarityCall(action) {
    if (action.type === "CLEAN_STATE") return

    const processUrl = yield select((state) => state.assistant.processUrl)
    const contentType = yield select(state => state.assistant.processUrlType);

    if (contentType === CONTENT_TYPE.IMAGE) {
        yield call(similaritySearch,
            () => dbkfAPI.callImageSimilarityEndpoint(processUrl),
            (result, loading, done, fail) => setDbkfImageMatchDetails(result, loading, done, fail)
        )
    } else if (contentType === CONTENT_TYPE.VIDEO) {
        yield call(similaritySearch,
            () => dbkfAPI.callVideoSimilarityEndpoint(processUrl),
            (result, loading, done, fail) => setDbkfVideoMatchDetails(result, loading, done, fail)
        )
    }
}

function* similaritySearch(searchEndpoint, stateStorageFunction) {
    yield put(stateStorageFunction(null, true, false, false))

    try {
        let result = yield call(searchEndpoint)
        if (Object.keys(result).length) {
            let similarityResult = result
            let resultList = []
            Object.keys(similarityResult).forEach(key=>{
                result[key].appearancesResults.forEach(appearance=>{
                    resultList.push({
                        "claimUrl": key,
                        "similarity": appearance.similarity})
                })
                result[key].evidencesResults.forEach(evidence=>{
                    resultList.push({
                        "claimUrl": key,
                        "similarity": evidence.similarity})
                })
            })
            resultList.sort((a, b) => b.similarity - a.similarity);
            resultList = resultList.slice(0,3)
            yield put(stateStorageFunction(resultList, false, true, false))
        } else {
            yield put(stateStorageFunction(null, false, true, false))
        }
    } catch (error) {
        console.log(error)
        yield put(stateStorageFunction(null, false, false, true))
    }
}

function* handleSourceCredibilityCall(action) {
    if (action.type === "CLEAN_STATE") return

    try {
        const inputUrl = yield select((state) => state.assistant.inputUrl)
        const result = yield call(assistantApi.callSourceCredibilityService, [inputUrl])
        const filteredResults = filterSourceCredibilityResults(result)
        const uncredibleResults = filteredResults[0].length ? filteredResults[0] : null
        const credibleResults = filteredResults[1].length ? filteredResults[1] : null

        yield put(setInputSourceCredDetails(uncredibleResults, credibleResults, false, true, false))
    } catch (error) {
        console.log(error)
        yield put(setInputSourceCredDetails(null, false, false, true))
    }
}

function* handleDbkfTextCall(action) {
    if (action.type === "CLEAN_STATE") return

    try {
        const text = yield select((state) => state.assistant.urlText)

        if (text) {
            let textToUse = text.length > 500 ? text.substring(0, 500) : text
            textToUse = textToUse.replace(/[^\w\s]/gi, '')

            let result = yield call(dbkfAPI.callTextSimilarityEndpoint, textToUse)
            let filteredResult = filterDbkfTextResult(result)

            yield put(setDbkfTextMatchDetails(filteredResult, false, true, false))
        }
    } catch (error) {
        console.log(error)
        yield put(setDbkfTextMatchDetails(null, false, false, true))
    }
}

function* handleHyperpartisanCall(action) {
    if (action.type === "CLEAN_STATE") return

    try {
        const text = yield select((state) => state.assistant.urlText)
        const lang = yield select((state) => state.assistant.textLang)

        if (text && lang === "en") {
            yield put(setHpDetails(null, true, false, false))

            const result = yield call(assistantApi.callHyperpartisanService, text)

            let hpProb = result.entities.hyperpartisan[0].hyperpartisan_probability
            hpProb = parseFloat(hpProb).toFixed(2) > 0.70 ? parseFloat(hpProb).toFixed(2) : null

            yield put(setHpDetails(hpProb, false, true, false))
        }
    } catch (error) {
        yield put(setHpDetails(null, false, false, true))
    }
}

function* handleNamedEntityCall(action) {
    if (action.type === "CLEAN_STATE") return

    try {
        const text = yield select((state) => state.assistant.urlText)
        const textLang = yield select((state) => state.assistant.textLang)
        if (text !== null && NE_SUPPORTED_LANGS.includes(textLang)) {
            yield put(setNeDetails(null, null, true, false, false))
            const result = yield call(assistantApi.callNamedEntityService, text)
            let entities = []

            Object.entries(result.response.annotations).forEach(entity => {
                entity[1].forEach(instance => {
                    entities.push({
                        "word": instance.features.string,
                        "category": entity[0]
                    })
                })
            })

            if (entities.length === 0) {
                yield put(setNeDetails(null, null, false, true, false))
            } else {
                let wordCloudList = buildWordCloudList(entities)
                let categoryList = buildCategoryList(wordCloudList)
                categoryList.map((v,k)=>{
                    return categoryList[k].words.sort(function(a,b){
                        return b.value - a.value;
                    })
                })
                yield put(setNeDetails(categoryList, wordCloudList, false, true, false))
            }
        }
    } catch (error) {
        yield put(setNeDetails(null, null, false, false, true))
    }
}

function* handleTranslateCall(action) {
    if (action.type === "CLEAN_STATE") return

    try {
        let lang = action.payload.lang
        let text = action.payload.text

        yield put(setMtDetails(null, true, false, false))
        const result = yield call(assistantApi.callAssistantTranslator, lang, text)
        let result_text = result.text ? result.text : null
        yield put(setMtDetails(result_text, false, true, false))
    } catch (error) {
        yield put(setMtDetails(null, false, false, true))
    }
}

function * handleAssistantScrapeCall(action) {

    let inputUrl = action.payload.inputUrl

    try {
        yield put(cleanAssistantState())
        yield put(setUrlMode(true))
        yield put(setAssistantLoading(true))

        let urlType = matchPattern(inputUrl, KNOWN_LINK_PATTERNS)
        let contentType = matchPattern(inputUrl, TYPE_PATTERNS)

        let scrapeResult = null
        if (decideWhetherToScrape(urlType, contentType, inputUrl)) {
            scrapeResult = urlType === KNOWN_LINKS.TIKTOK ?
                yield call(assistantApi.callTiktokScraper, inputUrl) :
                yield call(assistantApi.callAssistantScraper, urlType, inputUrl)
        }

        let filteredSR = filterAssistantResults(urlType, contentType, inputUrl, scrapeResult)

        yield put(setInputUrl(inputUrl, urlType))
        yield put(setScrapedData(filteredSR.urlText, filteredSR.textLang, filteredSR.linkList, filteredSR.imageList, filteredSR.videoList))
        yield put(setAssistantLoading(false))
    } catch (error) {
        yield put(setAssistantLoading(false))
        yield put(setErrorKey(error.message));
    }
}



/**
* PREPROCESS FUNCTIONS
**/
const removeUrlsAndEmojisFromText = (text) => {
    if (text !== null) {
        let urlRegex = new RegExp("(http(s)?://.)?(www\\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_+.~#?&//=]*)", "g");
        // credit where credit is due: https://thekevinscott.com/emojis-in-javascript/
        let emojiRegex = new RegExp("(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|" +
            "[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|" +
            "\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|" +
            "[\ud83c\ude32-\ude3a]|[\ud83c\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|" +
            "\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|" +
            "\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])", "g")
        return text.replace(urlRegex, "").replaceAll(emojiRegex, "")
    }
    return text
}

const decideWhetherToScrape = (urlType, contentType) => {
    switch (urlType) {
        case KNOWN_LINKS.YOUTUBE:
        case KNOWN_LINKS.LIVELEAK:
        case KNOWN_LINKS.VIMEO:
        case KNOWN_LINKS.DAILYMOTION:
            return false;
        case KNOWN_LINKS.TIKTOK:
        case KNOWN_LINKS.INSTAGRAM:
        case KNOWN_LINKS.FACEBOOK:
        case KNOWN_LINKS.TWITTER:
            return true;
        case KNOWN_LINKS.MISC:
            if (contentType === null) {
                return true
            }
            return false;
        default:
            throw new Error("please_give_a_correct_link")
    }
}

/**
 * POSTPROCESS FUNCTIONS
 **/
const buildWordCloudList = (entities) => {
    return entities.reduce((accumulator, currentWord) => {
        accumulator.filter(wordObj => wordObj.text === currentWord["word"]).length ?
            accumulator.filter(wordObj => wordObj.text === currentWord["word"])[0].value += 1 :
            accumulator.push({"text": currentWord["word"], "category": currentWord["category"], "value": 1})

        return accumulator
    }, [])
}

const buildCategoryList = (wordCloudList) => {
    // group by category
    return wordCloudList.reduce((accumulator, currentWord) => {
        accumulator.filter(wordObj => wordObj.category === currentWord["category"]).length ?
            accumulator.filter(wordObj => wordObj.category === currentWord["category"])[0].words.push(currentWord) :
            accumulator.push({"category": currentWord["category"], "words": [currentWord]})

        return accumulator
    }, [])
}

const filterAssistantResults = (urlType, contentType, userInput, scrapeResult) => {
    let videoList = []
    let imageList = []
    let linkList = []
    let urlText = null
    let textLang = null
    switch (urlType) {
        case KNOWN_LINKS.YOUTUBE:
        case KNOWN_LINKS.LIVELEAK:
        case KNOWN_LINKS.VIMEO:
        case KNOWN_LINKS.DAILYMOTION:
            videoList = [userInput];
            break;
        case KNOWN_LINKS.TIKTOK:
            videoList = scrapeResult.videos
            break;
        case KNOWN_LINKS.INSTAGRAM:
            if (scrapeResult.videos.length === 1) {
                videoList = [scrapeResult.videos[0]]
            } else {
                imageList = [scrapeResult.images[1]]
            }
            break;
        case KNOWN_LINKS.FACEBOOK:
            if (scrapeResult.videos.length === 0) {
                imageList = scrapeResult.images
                imageList = imageList.filter(imageUrl => imageUrl.includes("//scontent") && !(imageUrl.includes("/cp0/")));
            } else {
                videoList = scrapeResult.videos;
            }
            break;
        case KNOWN_LINKS.TWITTER:
            if (scrapeResult.images.length > 0) {
                imageList = scrapeResult.images
            }
            if (scrapeResult.videos.length > 0) {
                videoList = scrapeResult.videos
            }
            break;
        case KNOWN_LINKS.MISC:
            if (contentType) {
                contentType === CONTENT_TYPE.IMAGE ? imageList = [userInput] : videoList = [userInput]
            } else {
                imageList = scrapeResult.images
                videoList = scrapeResult.videos
            }
            break;
        default:
            break;
    }

    if (scrapeResult) {
        urlText = removeUrlsAndEmojisFromText(scrapeResult.text)
        textLang = scrapeResult.lang
        linkList = scrapeResult.links
    }

    return {
        urlText: urlText,
        textLang: textLang,
        videoList: videoList,
        imageList: imageList,
        linkList: linkList,

    };
}

const filterSourceCredibilityResults = (originalResult) => {
    let sourceCredResult = []
    let factCheckerResult = []

    if(!(originalResult.entities.SourceCredibility)) {return [sourceCredResult, factCheckerResult]}

    let sourceCredibility = originalResult.entities.SourceCredibility

    sourceCredibility.forEach(dc => {
        delete dc["indices"]
        delete dc["resolved-url"]
    })
    sourceCredibility = uniqWith(sourceCredibility, isEqual)

    sourceCredibility.forEach(result => {
        if(result["type"] === "fact checker"){
            factCheckerResult.push({
                "credibility_source": result["source"],
                "credibility_labels": result["type"],
                "credibility_description": result["description"]
            })
        }
        else {
            sourceCredResult.push({
                "credibility_source": result["source"],
                "credibility_labels": result["type"],
                "credibility_description": result["description"]
            })
        }
    })

    return [sourceCredResult, factCheckerResult]
}


const filterDbkfTextResult = (result) => {
    let resultList = []
    result.forEach((value) => {
        if (value.score > 900) {
            resultList.push({
                "text": value.text,
                "claimUrl": value.claimUrl,
                "score": value.score
            })
        }
    })
    return resultList.length ? resultList : null
}

/**
 * EXPORT
 **/
export default function* assistantSaga() {
    yield all([
        fork(getDbkfTextMatchSaga),
        fork(getSourceCredSaga),
        fork(getMediaActionSaga),
        fork(getMediaSimilaritySaga),
        fork(getMediaListSaga),
        fork(getHyperpartisanSaga),
        fork(getNamedEntitySaga),
        fork(getTranslationSaga),
        fork(getAssistantScrapeSaga),
        fork(getUploadSaga)
    ])
}
