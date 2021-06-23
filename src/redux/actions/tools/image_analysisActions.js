export const setAnalysisResult = (url, result, notification, loading) => {
    return {
        type : "SET_ANALYSIS_RESULT_IMAGE",
        payload : {
            notification : notification,
            loading : loading,
            url : url,
            result : result
        }
    }
};
export const setAnalysisComments = (data) => {
    return {
        type : "SET_ANALYSIS_PAGINATION_COMMENTS_IMAGE",
        payload : data
            
        
    }
};
export const setAnalysisLinkComments = (data) => {
    return {
        type : "SET_ANALYSIS_PAGINATION_LINK_COMMENTS_IMAGE",
        payload : data
            
        
    }
};
export const setAnalysisVerifiedComments = (data) => {
    return {
        type : "SET_ANALYSIS_PAGINATION_VERIFIED_COMMENTS_IMAGE",
        payload : data
            
        
    }
};

export const setAnalysisLoading = (loading) => {
    return {
        type : "SET_ANALYSIS_LOADING_IMAGE",
        payload : loading
    }
};

export const cleanAnalysisState = () => {
    return {
        type : "ANALYSIS_CLEAN_STATE_IMAGE"
    }
};