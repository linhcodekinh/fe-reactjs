import actionTypes from './actionTypes.js';
import { getAllUsers, getAllPositions, getAllRole, getAllType, deleteUser, createNewUser, getUser } from '../../services/userService.js';
import { ToastUtil } from '../../utils/index.js'

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let resAllUser = await getAllUsers();
            if (resAllUser) {
                dispatch(fetchAllUserSucceed(resAllUser))
            } else {
                dispatch(fetchAllUserFailed());
            }
        } catch (e) {
            dispatch(fetchAllUserFailed());
            console.log('fetchAllUserStart error', e)
        }
    }

}

export const fetchAllUserSucceed = (resAllUser) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCEED,
    listAllUser: resAllUser
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})


export const fetchAllRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let resAllRole = await getAllRole();
            if (resAllRole) {
                dispatch(fetchAllRoleSucceed(resAllRole))
            } else {
                dispatch(fetchAllRoleFailed());
            }

        } catch (e) {
            dispatch(fetchAllRoleFailed());
            console.log('fetchAllRoleFailed error', e)
        }
    }

}

export const fetchAllRoleSucceed = (resAllRole) => ({
    type: actionTypes.FETCH_ALL_ROLE_SUCCEED,
    listAllRole: resAllRole
})

export const fetchAllRoleFailed = () => ({
    type: actionTypes.FETCH_ALL_ROLE_FAILED
})

export const fetchAllTypeStart = () => {
    return async (dispatch, getState) => {
        try {
            let resAllType = await getAllType();
            if (resAllType) {
                dispatch(fetchAllTypeSucceed(resAllType))
            } else {
                dispatch(fetchAllTypeFailed());
            }

        } catch (e) {
            dispatch(fetchAllTypeFailed());
            console.log('fetchAllTypeFailed error', e)
        }
    }

}

export const fetchAllTypeSucceed = (resAllType) => ({
    type: actionTypes.FETCH_ALL_TYPE_SUCCEED,
    listAllType: resAllType
})

export const fetchAllTypeFailed = () => ({
    type: actionTypes.FETCH_ALL_TYPE_FAILED
})


export const fetchAllPosStart = () => {
    return async (dispatch, getState) => {
        try {
            let resAllPos = await getAllPositions();
            if (resAllPos) {
                dispatch(fetchAllPosSucceed(resAllPos))
            } else {
                dispatch(fetchAllPosFailed());
            }

        } catch (e) {
            dispatch(fetchAllPosFailed());
            console.log('fetchAllPosFailed error', e)
        }
    }

}

export const fetchAllPosSucceed = (listAllPos) => ({
    type: actionTypes.FETCH_ALL_POS_SUCCEED,
    listAllPos: listAllPos
})

export const fetchAllPosFailed = () => ({
    type: actionTypes.FETCH_ALL_POS_FAILED
})


export const deleteUserStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let resDeleteUser = await deleteUser(id);
            if (resDeleteUser && resDeleteUser.message) {
                ToastUtil.show('SUCCESS', 'common.confirm', resDeleteUser.message, false)
                dispatch(deleteUserSucceed())
                dispatch(fetchAllUserStart())
            } else {
                ToastUtil.show('ERROR', 'common.error', 'error', false)
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log('deleteUserStart error', e)
        }
    }
}

export const deleteUserSucceed = () => ({
    type: actionTypes.DELETE_USER_SUCCEED,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


export const addUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let resAddUser = await createNewUser(data);
            if (resAddUser[0] && !resAddUser[0].bindingFailure) {
                ToastUtil.show('ERROR', 'common.unknown-error', resAddUser[0].defaultMessage, false)
                dispatch(addUserFailed());
            } else if (resAddUser && resAddUser.message) {
                ToastUtil.show('SUCCESS', 'common.confirm', resAddUser.message, false)
                dispatch(addUserSucceed())
            }
        } catch (e) {
            dispatch(addUserFailed());
            console.log('addUserFailed error', e)
        }
    }
}

export const addUserSucceed = () => ({
    type: actionTypes.ADD_USER_SUCCEED,
})

export const addUserFailed = () => ({
    type: actionTypes.ADD_USER_FAILED
})


export const getAUserStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let resGetAUser = await getUser(id);
            if (resGetAUser) {
                dispatch(getAUserSucceed(resGetAUser))
            } else {
                dispatch(getAUserFailed());
            }
        } catch (e) {
            dispatch(getAUserFailed());
            console.log('getAUserFailed error', e)
        }
    }
}

export const getAUserSucceed = (resGetAUser) => ({
    type: actionTypes.GET_A_USER_SUCCEED,
    resGetAUser: resGetAUser
})

export const getAUserFailed = () => ({
    type: actionTypes.GET_A_USER_FAILED
})

export const setAUserIdEdit = (userIdEdit) => ({
    type: actionTypes.EDIT_USER_ID,
    userIdEdit: userIdEdit
})






