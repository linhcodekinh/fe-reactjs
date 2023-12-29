import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: true,
    userInfo: null,
    userView: 'view'
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.CHANGE_USER_VIEW:
            console.log("userView", action.view)
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
                userView: action.view
            }
        default:
            return state;
    }
}

export default userReducer;