// src/store/reducers/userReducer.js

const initialState = {
    loading: false,
    user: null,
    skills: [],
    error: "",
};

function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                loading: action.payload,
            };
        case "ERROR":
            return {
                ...state,
                error: action.payload,
            };
        case "USER":
            return {
                ...state,
                user: action.payload,
            };
        case "SKILLS":
            return {
                ...state,
                skills: action.payload,
            };
        default:
            return state;
    }
}

export default userReducer;
