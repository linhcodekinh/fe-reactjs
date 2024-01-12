import { faL } from '@fortawesome/free-solid-svg-icons';
import actionTypes from '../actions/actionTypes';

const initialState = {
    listAllUser: [],
    listAllRole: [],
    listAllType: [],
    listAllPosition: [],
    aUser: {},
    isUserLoading: true,
    isRoleLoading: true,
    isTypeLoading: true,
    isPosLoading: true,
    isAUserLoading: true,
    isDeleteLoading: true,
    isAddLoading: true,
    userIdEdit: ''

}

const userManageReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_ALL_USER_SUCCEED:
            return {
                ...state,
                isUserLoading: false,
                listAllUser: action.listAllUser
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            return {
                ...state,
                isUserLoading: true,
                listAllUser: []
            }
        case actionTypes.FETCH_ALL_ROLE_SUCCEED:
            return {
                ...state,
                isRoleLoading: false,
                listAllRole: action.listAllRole
            }
        case actionTypes.FETCH_ALL_ROLE_FAILED:
            return {
                ...state,
                isRoleLoading: true,
                listAllRole: []
            }
        case actionTypes.FETCH_ALL_TYPE_SUCCEED:
            return {
                ...state,
                isTypeLoading: false,
                listAllType: action.listAllType
            }
        case actionTypes.FETCH_ALL_TYPE_FAILED:
            return {
                ...state,
                isTypeLoading: true,
                listAllType: []
            }
        case actionTypes.FETCH_ALL_POS_SUCCEED:
            return {
                ...state,
                isPosLoading: false,
                listAllPos: action.listAllPos
            }
        case actionTypes.FETCH_ALL_POS_FAILED:
            return {
                ...state,
                isPosLoading: true,
                listAllPos: []
            }
        case actionTypes.DELETE_USER_SUCCEED:
            console.log('here DELETE_USER_SUCCEED')
            return {
                ...state,
                isDeleteLoading: false
            }
        case actionTypes.DELETE_USER_FAILED:
            return {
                ...state,
                isDeleteLoading: true
            }
        case actionTypes.ADD_USER_SUCCEED:
            console.log('here ADD_USER_SUCCEED')
            return {
                ...state,
                isAddLoading: false,
            }
        case actionTypes.ADD_USER_FAILED:
            return {
                ...state,
                isAddLoading: true
            }
        case actionTypes.EDIT_USER_ID:
            return {
                ...state,
                userIdEdit: action.userIdEdit
            }
        case actionTypes.GET_A_USER_SUCCEED:
            console.log('here GET_A_USER_SUCCEED')
            return {
                ...state,
                aUser: action.resGetAUser,
                isAUserLoading: false
            }
        case actionTypes.GET_A_USER_FAILED:
            return {
                ...state,
                aUser: {},
                isLoadAUserDone: true
            }
        default:
            return state;
    }
}

export default userManageReducer;