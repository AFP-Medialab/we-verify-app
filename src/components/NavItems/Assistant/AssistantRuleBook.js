import analysisIconOff from "../../NavBar/images/tools/video_logoOff.png";
import keyframesIconOff from "../../NavBar/images/tools/keyframesOff.png";
import thumbnailsIconOff from "../../NavBar/images/tools/youtubeOff.png";
import magnifierIconOff from "../../NavBar/images/tools/magnifierOff.png";
import metadataIconOff from "../../NavBar/images/tools/metadataOff.png";
import videoRightsIconOff from "../../NavBar/images/tools/copyrightOff.png";
import forensicIconOff from "../../NavBar/images/tools/forensic_logoOff.png";

export const NE_SUPPORTED_LANGS =  ["en", "pt", "fr", "de", "el", "es"]

export const CONTENT_TYPE = {
    VIDEO: "video",
    IMAGE: "image"
};

export const KNOWN_LINKS = {
    TWITTER: "twitter",
    INSTAGRAM: "instagram",
    FACEBOOK: "facebook",
    TIKTOK: "tiktok",
    YOUTUBE: "youtube",
    DAILYMOTION: "dailymotion",
    LIVELEAK: "liveleak",
    VIMEO: "vimeo",
    OWN: "own",
    MISC: "general"
}

export const TYPE_PATTERNS = [
    {
        key: CONTENT_TYPE.VIDEO,
        patterns: [/.(mp4|mkv)(.*)?$/i]
    },
    {
        key: CONTENT_TYPE.IMAGE,
        patterns: [/.(jpg|jpeg|png)(.*)?$/i]
    }
];

export const KNOWN_LINK_PATTERNS = [
    {
        key: KNOWN_LINKS.TWITTER,
        patterns: ["((https?:/{2})?(www.)?twitter.com/\\w{1,15}/status/\\d*)"],
    },
    {
        key: KNOWN_LINKS.TIKTOK,
        patterns:["((https?:\\/{2})?(www.)?tiktok.com\\/.*\\/video/\\d*)"]
    },
    {
        key: KNOWN_LINKS.INSTAGRAM,
        patterns: ["((https?:\\/{2})?(www.)?instagram.com\\/p\\/.*)"]
    },
    {
        key: KNOWN_LINKS.FACEBOOK,
        patterns: ["^(https?:/{2})?(www.)?facebook.com/.*/(videos|photos|posts)/.*"]
    },
    {
        key: KNOWN_LINKS.YOUTUBE,
        patterns: ["(https?:\\/{2})?(www.)?((youtube.com\\/watch\\?v=)|youtu.be\\/)([a-zA-Z0-9_-]{11})"]
    },
    {
        key: KNOWN_LINKS.VIMEO,
        patterns: ["^(https?:/{2})?(www.)?vimeo.com/\\d*"]
    },
    {
        key: KNOWN_LINKS.DAILYMOTION,
        patterns: ["^(https?:/{2})?(www.)?dailymotion.com/video/.*"]
    },
    {
        key: KNOWN_LINKS.LIVELEAK,
        patterns: ["^(https?:/{2})?(www.)?liveleak.com/view\\?t=.*"]
    },
    {
        key: KNOWN_LINKS.MISC,
        patterns: ["(http(s)?://.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)"]
    }
]

export const ASSISTANT_ACTIONS = [
    {
        title: "navbar_analysis_video",
        icon: analysisIconOff,
        linksAccepted: [KNOWN_LINKS.YOUTUBE, KNOWN_LINKS.FACEBOOK, KNOWN_LINKS.TWITTER],
        cTypes: [CONTENT_TYPE.VIDEO],
        exceptions: [],
        useInputUrl: true,
        text: "analysis_text",
        tsvPrefix: "api",
        path: "tools/analysis",
    },
    {
        title: "navbar_analysis_image",
        icon: analysisIconOff,
        linksAccepted: [KNOWN_LINKS.FACEBOOK, KNOWN_LINKS.TWITTER],
        cTypes: [CONTENT_TYPE.IMAGE],
        exceptions: [],
        useInputUrl: true,
        text: "analysis_text",
        tsvPrefix: "api",
        path: "tools/analysis_image",
    },
    {
        title: "navbar_keyframes",
        icon:  keyframesIconOff,
        linksAccepted: [KNOWN_LINKS.YOUTUBE, KNOWN_LINKS.FACEBOOK, KNOWN_LINKS.TWITTER,
            KNOWN_LINKS.DAILYMOTION, KNOWN_LINKS.VIMEO, KNOWN_LINKS.YOUTUBE, KNOWN_LINKS.LIVELEAK,
            KNOWN_LINKS.OWN],
        cTypes: [CONTENT_TYPE.VIDEO],
        exceptions: [],
        useInputUrl: true,
        text: "keyframes_text",
        tsvPrefix: "keyframes",
        path: "tools/keyframes",
    },
    {
        title: "navbar_thumbnails",
        icon: thumbnailsIconOff,
        linksAccepted: [KNOWN_LINKS.YOUTUBE],
        cTypes: [CONTENT_TYPE.VIDEO],
        exceptions: [],
        useInputUrl: true,
        text: "thumbnails_text",
        tsvPrefix: "thumbnails",
        path: "tools/thumbnails",
    },
    {
        title: "navbar_magnifier",
        icon: magnifierIconOff,
        linksAccepted: [KNOWN_LINKS.MISC, KNOWN_LINKS.OWN],
        cTypes: [CONTENT_TYPE.IMAGE],
        exceptions: [],
        useInputUrl: false,
        text: "magnifier_text",
        tsvPrefix: "magnifier",
        path: "tools/magnifier",
    },
    {
        title: "navbar_metadata",
        icon: metadataIconOff,
        linksAccepted: [KNOWN_LINKS.MISC, KNOWN_LINKS.OWN],
        cTypes: [CONTENT_TYPE.IMAGE, CONTENT_TYPE.VIDEO],
        exceptions:  [/(pbs.twimg.com)|(youtu.be|youtube)|(instagram)|(fbcdn.net)|(vimeo)|(tiktok.com)/],
        useInputUrl: false,
        text: "metadata_text",
        tsvPrefix: "metadata",
        path: "tools/metadata",
    },
    {
        title: "navbar_rights",
        icon:  videoRightsIconOff,
        linksAccepted: [KNOWN_LINKS.YOUTUBE, KNOWN_LINKS.FACEBOOK, KNOWN_LINKS.TWITTER],
        cTypes: [CONTENT_TYPE.VIDEO],
        exceptions: [],
        useInputUrl: true,
        text: "rights_text",
        tsvPrefix: "copyright",
        path: "tools/copyright",
    },
    {
        title: "navbar_forensic",
        icon: forensicIconOff,
        linksAccepted: [KNOWN_LINKS.MISC, KNOWN_LINKS.OWN],
        cTypes: [CONTENT_TYPE.IMAGE],
        exceptions: [],
        useInputUrl: false,
        text: "forensic_text",
        tsvPrefix: "forensic",
        path: "tools/forensic",
    },
    {
        title: "navbar_ocr",
        icon: forensicIconOff,
        linksAccepted: [KNOWN_LINKS.MISC, KNOWN_LINKS.OWN],
        cTypes: [CONTENT_TYPE.IMAGE],
        exceptions: [],
        useInputUrl: false,
        text: "ocr_text",
        tsvPrefix: "ocr",
        path: "tools/ocr",
    }
];

export const selectCorrectActions = (contentType, inputUrlTYpe, processUrlType, processUrl) => {
    let possibleActions =
        ASSISTANT_ACTIONS.filter(action=>
            ((action.useInputUrl && action.linksAccepted.includes(inputUrlTYpe) && action.cTypes.includes(contentType)) ||
            (!action.useInputUrl && action.linksAccepted.includes(processUrlType) && action.cTypes.includes(contentType))) &&
            (action.exceptions.length===0 || !(processUrl.match(action.exceptions)))
        );
    return possibleActions;
}

export const matchPattern = (toMatch, matchObject) => {
    // find the record where from the regex patterns in said record, one of them matches "toMatch"
    let match = matchObject.find(record=>record.patterns.some((rgxpattern)=>toMatch.match(rgxpattern)!=null));
    return match !=null ? match.key : null;
}