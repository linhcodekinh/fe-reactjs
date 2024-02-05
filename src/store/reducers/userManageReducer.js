import { faL } from '@fortawesome/free-solid-svg-icons';
import actionTypes from '../actions/actionTypes';

const initialState = {
    listAllUser: [],
    totalUser: 0,
    listAllRole: [],
    listAllType: [],
    listAllPosition: [],
    aUser: {},
    imageLinkUser: '',
    isUserLoading: true,
    isRoleLoading: true,
    isTypeLoading: true,
    isPosLoading: true,
    isAUserLoading: true,
    isDeleteLoading: true,
    isAddLoading: true,
    isUpdateLoading: true,
    userIdEdit: ''

}

const userManageReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_ALL_USER_SUCCEED:
            return {
                ...state,
                isUserLoading: false,
                listAllUser: action.listAllUser,
                totalUser: action.totalUser
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            return {
                ...state,
                isUserLoading: true,
                listAllUser: [],
                totalUser: 0
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
            return {
                ...state,
                isDeleteLoading: false
            }
        case actionTypes.DELETE_USER_FAILED:
            return {
                ...state,
                isDeleteLoading: true
            }
        case actionTypes.UPDATE_DELETE_USER_LOADING:
            return {
                ...state,
                isDeleteLoading: true
            }
        case actionTypes.ADD_USER_SUCCEED:
            return {
                ...state,
                isAddLoading: false,
            }
        case actionTypes.ADD_USER_FAILED:
            return {
                ...state,
                isAddLoading: true
            }
        case actionTypes.UPDATE_ADD_USER_LOADING:
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
            return {
                ...state,
                aUser: action.resGetAUser,
                isAUserLoading: false
            }
        case actionTypes.GET_A_USER_FAILED:
            return {
                ...state,
                aUser: {},
                isAUserLoading: true
            }
        case actionTypes.GET_IMAGE_LINK_SUCCEED:
            return {
                ...state,
                imageLinkUser: action.resImageLink
            }
        case actionTypes.GET_IMAGE_LINK_FAILED:
            return {
                ...state,
                imageLinkUser: ''
            }
        case actionTypes.UPDATE_USER_SUCCEED:
            return {
                ...state,
                isUpdateLoading: false,
            }
        case actionTypes.UPDATE_USER_FAILED:
            return {
                ...state,
                isUpdateLoading: true
            }
        case actionTypes.UPDATE_EDIT_USER_LOADING:
            return {
                ...state,
                isUpdateLoading: true
            }
        default:
            return state;
    }
}

export default userManageReducer;