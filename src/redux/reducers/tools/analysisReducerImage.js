const defaultState = {
    notification : false,
    loading : false,
    url: "",
    result: null,
};

const ImageAnalysisReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_ANALYSIS_RESULT_IMAGE":
            return action.payload;
        case "SET_ANALYSIS_PAGINATION_COMMENTS_IMAGE":
            return {
                ...state,
                result: { ...state.result, comments:action.payload.comments, pagination:action.payload.pagination },
              };
        case "SET_ANALYSIS_PAGINATION_LINK_COMMENTS_IMAGE":
            return {
                ...state,
                result: { ...state.result, 
                    link_comments:action.payload.comments,
                    pagination:action.payload.pagination 
                    }, 
                
              };
        case "SET_ANALYSIS_PAGINATION_VERIFIED_COMMENTS_IMAGE":
                return {
                    ...state,
                    result: { ...state.result, 
                        verification_comments:action.payload.comments, 
                        pagination:action.payload.pagination },
                  };         
        case "SET_ANALYSIS_LOADING_IMAGE":
            state.loading = action.payload;
            return state;
        case "ANALYSIS_CLEAN_STATE_IMAGE":
            state.result = null;
            state.url = "";
            return state;
        default:
            return state;
    }
};
export default ImageAnalysisReducer;