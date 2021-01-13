const defaultState = {
    url: undefined,
    b64Image: undefined,
    loading : false,
    fail: false,
    done: false,
    result: null,
};

const ocrReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_OCR_INPUT":
        case "SET_OCR_RESULT":
        case "SET_B64_IMG":
            return Object.assign({}, state, action.payload)
        case "OCR_CLEAN_STATE":
            state = {
                url: undefined,
                b64Image: undefined,
                loading : false,
                fail: false,
                done: false,
                result: null,
            };
            return state;
        default:
            return state;
    }
};
export default ocrReducer;