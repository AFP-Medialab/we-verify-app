export const setStateInit = () => {
    return {
        type: "SET_STATE_INIT"
    }
};

export const setStateSelectingLocal = () => {
    return {
        type: "SET_STATE_SELECTINGFILES_LOCAL"
    }
};

export const setStateSelectingUrl = () => {
    return {
        type: "SET_STATE_SELECTINGFILES_URL"
    }
};

export const setStateReady = () => {
    return {
        type: "SET_STATE_READY"
    }
};

export const setStateLoading = () => {
    return {
        type: "SET_STATE_LOADING"
    }
};

export const setStateDownloading = () => {
    return {
        type: "SET_STATE_DOWNLOADING"
    }
};

export const setStateError = () => {
    return {
        type: "SET_STATE_ERROR"
    }
};


export const setStateBackResults= () => {
    return {
        type: "SET_STATE_BACKRESULTS"
    }
};



export const setStateShow = (urlImg1, urlImg2) => {
    return {
        type: "SET_STATE_SHOW",
        payload: {
            toolState: 5,
            homoImg1: urlImg1,
            homoImg2: urlImg2,
        }
    }
};
