import { combineReducers } from "redux";

import languageReducer from "./languagesReducer";
import dictionaryReducer from "./dictionaryReducer";
import navReducer from "./navReducer";
import toolReducer from "./tools/toolReducer";
import humanRightsCheckBoxReducer from "./humanRightsCheckBoxReducer";
import interactiveExplanationReducer from "./interactiveExplanationReducer";
import errorReducer from "./errorReducer";
import authenticationReducer from './authenticationReducer';
import analysisReducer from "./tools/analysisReducer";
import forensicReducer from "./tools/forensicReducer";
import keyframesReducer from "./tools/keyframesReducer";
import magnifierReducer from "./tools/magnifierReducer";
import metadataReducer from "./tools/metadataReducer";
import thumbnailsReducer from "./tools/thumbnailsReducer";
import twitterSnaReducer from "./tools/twitterSnaReducer";
import videoRightsReducer from "./tools/videoRightsReducer";
import cookiesReducer from "./cookiesReducers";
import covidSearchReducer from "./tools/covidSearchReducer";
import assistantReducer from "./assistantReducer";
import ocrReducer from "./tools/ocrReducer";
import defaultLanguageReducer from "./defaultLanguageReducer";
import gifReducer from "./tools/gifReducer";
import ImageAnalysisReducer from "./tools/analysisReducerImage";

const allReducers = combineReducers({
    language : languageReducer,
    defaultLanguage : defaultLanguageReducer,
    dictionary : dictionaryReducer,
    nav : navReducer,
    tool : toolReducer,
    humanRightsCheckBox : humanRightsCheckBoxReducer,
    interactiveExplanation : interactiveExplanationReducer,
    error : errorReducer,
    userSession: authenticationReducer,
    analysis: analysisReducer,
    analysisImage: ImageAnalysisReducer,
    forensic : forensicReducer,
    keyframes : keyframesReducer,
    magnifier: magnifierReducer,
    metadata : metadataReducer,
    thumbnails : thumbnailsReducer,
    twitterSna : twitterSnaReducer,
    videoRights : videoRightsReducer,
    cookies : cookiesReducer,
    covidSearch: covidSearchReducer,
    assistant : assistantReducer,
    ocr: ocrReducer,
    gif: gifReducer,
});

export default allReducers;
