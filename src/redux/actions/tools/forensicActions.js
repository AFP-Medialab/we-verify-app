export const setForensicsResult = (url, result, notification, loading) => {
    return {
        type: "SET_FORENSIC_RESULT",
        payload: {
            notification: notification,
            loading: loading,
            url: url,
            result: result,
            gifAnimation: false,
            
        }
    }
};
//masks: masks,
export const setForensicMask = (masks) => {
    return {
        type: "SET_FORENSIC_MASK",
        payload: masks

    }
};

export const setForensicsLoading = (loading) => {
    return {
        type: "SET_FORENSIC_LOADING",
        payload: loading
    }
};

export const cleanForensicState = () => {
    return {
        type: "FORENSIC_CLEAN_STATE"
    }
};

export const setForensicsGifAnimateShow = () => {
    return {
        type: "SET_FORENSIC_GIF_SHOW",
    }
};

export const setForensicsGifAnimateHide = () => {
    return {
        type: "SET_FORENSIC_GIF_HIDE",
    }
};

export const setForensicMaskGif = (url) => {
    return {
        type: "SET_FORENSIC_MASK_GIF",
        payload: url
    }
};