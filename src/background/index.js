// If your extension doesn't need a background script, just leave this file empty
import ReactGA, {ga} from "react-ga"
let page_name = 'popup.html';

const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS_KEY;
ReactGA.initialize(trackingId, {
    //debug: true,
    titleCase: false,
});
ReactGA.ga('set', 'checkProtocolTask', ()=>{});
ReactGA.pageview('/popup.html');



function rightClickEvent (toolName, media) {
    ga('send', 'event',
        'Contextual menu',
        'Contextual menu click on :' + toolName + " for "+ media,
        JSON.stringify( {
            toolName : toolName,
            media : media,
        })
    );
    return true;
}

const get_images = (url) => {
    let video_id = url.split('v=')[1].split('&')[0];
    let img_url = "http://img.youtube.com/vi/%s/%d.jpg";
    let search_url = "https://www.google.com/searchbyimage?&image_url="
    let img_arr = ["","","",""];
    for (let count = 0; count < 4; count++){
        img_arr[count] = search_url + img_url.replace("%s", video_id).replace("%d", count);
        img_url = "http://img.youtube.com/vi/%s/%d.jpg";
    }
    return img_arr;
};

const karmadecaySearch = function(word){
    // from User JavaScript @https://static.karmadecay.com/js/karma-decay.user.js
    let search_url = "http://karmadecay.com/search?kdtoolver=b1&q=";
    let img = getUrlImg(word);
    if (img !== ""){
        let url = search_url + encodeURIComponent(img);
        window.chrome.tabs.create({url: url, selected: false});
        //Google analytics
        rightClickEvent("Image Reverse Search Reddit", url)
    }
};

const thumbnailsSearch = function(word){
    let url = word.linkUrl;
    if (url !== "") {
        let lst = get_images(url);
        for (let index in lst){
            window.chrome.tabs.create({url:lst[index]});
        }
        // Google analytics
        rightClickEvent("YouTubeThumbnails", url)
        //ga("send", "event", "ContextualMenu - ThumbnailYouTube", "click", url);
    }
};

const getUrlImg = (word) => {
    var query = word.pageUrl;
    if(word.mediaType==="image"){
       return word.srcUrl;
    }
    return query;
    /*if (word.srcUrl)
        return String(word.srcUrl);
    return String(word.linkUrl);*/
};

const analysisVideo = function(word){
    let url = word.linkUrl;
    if (url !== "") {
        window.chrome.tabs.create({url:page_name+"#/app/tools/Analysis/" + encodeURIComponent(url)});
        // Google analytics
        rightClickEvent("Analysis", url)
        //ga("send", "event", "ContextualMenu - AnalysisVideo", "click", url);
    }
};


const imageMagnifier = function(word){
    let url = getUrlImg(word);
    if (url !== "") {
        window.chrome.tabs.create({url:page_name+"#/app/tools/magnifier/" + encodeURIComponent(url)});
        // Google analytics
        rightClickEvent("Magnifier", url)
        //ga("send", "event", "ContextualMenu - Magnifier", "click", url);
    }
};

const mediaAssistant = function(word){
    let url = getUrlImg(word);
    if (url !== "") {
        window.chrome.tabs.create({url:page_name+"#/app/assistant/" + encodeURIComponent(url)});
        // Google analytics
        rightClickEvent("Assistant", url)
    }
};

const ocr = function(word){
    let url = getUrlImg(word);
    if (url !== "") {
        window.chrome.tabs.create({url:page_name+"#/app/tools/ocr/" + encodeURIComponent(url)});
        // Google analytics
        rightClickEvent("OCR", url)
    }
};

const imageReversesearch = function(word){
    let search_url = "https://www.google.com/searchbyimage?image_url=";
    let img = getUrlImg(word);
    if (img !== ""){
        let url = search_url + encodeURIComponent(img);
        window.chrome.tabs.create({url: url, selected: false});
        // Google analytics
        rightClickEvent("Image Reverse Search Google", url)
        //console.error("right Click : " + bool)
        //ga("send", "event", "ContextualMenu - Google", "click", url);
    }
};

const imageReversesearchDBKF = function(word){
    let search_url = "http://weverify-demo.ontotext.com/#!/similaritySearchResults&type=Images&params=";
    let img = getUrlImg(word);
    if (img !== ""){
        let url = search_url + encodeURIComponent(img);
        window.chrome.tabs.create({url: url, selected: false});
        // Google analytics
        rightClickEvent("Image Reverse Search - DBKF (beta)", url)
        //ga("send", "event", "ContextualMenu - DBKF", "click", url);
    }
};

const imageForensic = function(word){
    let url = getUrlImg(word);
    if (url !== ""){
        window.chrome.tabs.create({url:page_name+"#/app/tools/forensic/" + encodeURIComponent(url)});
        // Google analytics
        rightClickEvent("Forensic", url)
        //ga("send", "event", "ContextualMenu - Forensic", "click", url);
    }
};

const imageReversesearchBaidu = function(word){
    let search_url = "https://image.baidu.com/n/pc_search?queryImageUrl=";
    let img = getUrlImg(word);
    if (img !== ""){
        let url = search_url + encodeURIComponent(img) + "&fm=index&uptype=urlsearch";
        window.chrome.tabs.create({url: url, selected: false});
        // Google analytics
        rightClickEvent("Image Reverse Search Baidu", url)
        //ga("send", "event", "ContextualMenu - Baidu", "click", url);
    }
};

const imageReversesearchYandex = function(word){
    let search_url = "https://yandex.com/images/search?url=";
    let img = getUrlImg(word);
    if (img !== ""){
        let url = search_url + encodeURIComponent(img)+ "&rpt=imageview";
        window.chrome.tabs.create({url: url, selected: false});
        // Google analytics
        rightClickEvent("Image Reverse Search Yandex", url)
        //ga("send", "event", "ContextualMenu - Yandex", "click", url);
    }
};

const imageReversesearchTineye = function(word){
    let search_url = "https://www.tineye.com/search?url=";
    let img = getUrlImg(word);
    if (img !== ""){
        let url = search_url + encodeURIComponent(img);
        window.chrome.tabs.create({url: url, selected: false});
        // Google analytics
        rightClickEvent("Image Reverse Search Tineye", url)

        //ga("send", "event", "ContextualMenu - Tineye", "click", url);
    }
};

const imageReversesearchBing = function(word){
    let search_url = "https://www.bing.com/images/search?q=imgurl:";
    let img = getUrlImg(word);
    if (img !== ""){
        let url = search_url + encodeURIComponent(img) + "&view=detailv2&iss=sbi";
        window.chrome.tabs.create({url: url, selected: false});
        // Google analytics
        rightClickEvent("Image Reverse Search Bing", url)
        //ga("send", "event", "ContextualMenu - Bing", "click", url);
    }
};

const imageReversesearchAll = function(word){
    rightClickEvent("Image Reverse Search All", getUrlImg(word));
    imageReversesearchDBKF(word);
    imageReversesearch(word);
    imageReversesearchBaidu(word);
    imageReversesearchBing(word);
    imageReversesearchTineye(word);
    imageReversesearchYandex(word);
    karmadecaySearch(word);

    
};

window.chrome.contextMenus.create({
    id: "assistant",
    title: "Open with assistant",
    contexts:["image", "video"],
    onclick: mediaAssistant,
})

window.chrome.contextMenus.create({
    id: "ocr",
    title: "Open with OCR",
    contexts:["image"],
    onclick: ocr,
})

window.chrome.contextMenus.create({
    title: "Youtube thumbnails reverse search",
    contexts:["link", "video"],
    onclick: thumbnailsSearch,
    targetUrlPatterns: ["https://www.youtube.com/*", "https://youtu.be/*"]
});

window.chrome.contextMenus.create({
    title: "Video contextual Analysis",
    contexts:["link", "video"],
    onclick: analysisVideo,
    targetUrlPatterns: ["https://www.youtube.com/*", "https://youtu.be/*", "https://www.facebook.com/*/videos/*", "https://www.facebook.com/*", "https://twitter.com/*"]
});


window.chrome.contextMenus.create({
    title: "Image Magnifier",
    contexts:["image", "link"],
    onclick: imageMagnifier,
});

window.chrome.contextMenus.create({
    title: "Image Forensic",
    contexts:["image"],
    onclick: imageForensic,
});

window.chrome.contextMenus.create({
    title: "Image Reverse Search - ALL",
    contexts:["image", "link"],
    onclick: imageReversesearchAll,
});

window.chrome.contextMenus.create({
    title: "Image Reverse Search - DBKF (beta)",
    contexts:["image"],
    onclick: imageReversesearchDBKF,
});

window.chrome.contextMenus.create({
    title: "Image Reverse Search - Google",
    contexts:["image", "link"],
    onclick: imageReversesearch,
});

window.chrome.contextMenus.create({
    title: "Image Reverse Search - Yandex",
    contexts:["image", "link"],
    onclick: imageReversesearchYandex,
});

window.chrome.contextMenus.create({
    title: "Image Reverse Search - Bing",
    contexts:["image"],
    onclick: imageReversesearchBing,
});

window.chrome.contextMenus.create({
    title: "Image Reverse Search - Tineye",
    contexts:["image", "link"],
    onclick: imageReversesearchTineye,
});

window.chrome.contextMenus.create({
    title: "Image Reverse Search - Baidu",
    contexts:["image", "link"],
    onclick: imageReversesearchBaidu,
});

window.chrome.contextMenus.create({
    title: "Image Reverse Search - Reddit",
    contexts:["image"],
    onclick: karmadecaySearch,
});