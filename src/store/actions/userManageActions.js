import actionTypes from './actionTypes.js';
import { getAllUsers, getAllPositions, getAllRole, getAllType, deleteUser, createNewUser, getUser, updatedUser, getImageLinkByName } from '../../services/userService.js';
import { ToastUtil } from '../../utils/index.js'

export const fetchAllUserStart = (offset, pageSize, field, direction, textSearch) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers(offset, pageSize, field, direction, textSearch);
            if (res.listAccountDTO && res.totalItem) {
                dispatch(fetchAllUserSucceed(res.listAccountDTO, res.totalItem))
                console.log('res.totalItem ',res.totalItem)
            } else {
                dispatch(fetchAllUserFailed());
            }
        } catch (e) {
            dispatch(fetchAllUserFailed());
            console.log('fetchAllUserStart error', e)
        }
    }

}

export const fetchAllUserSucceed = (listAccount, totalItem) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCEED,
    listAllUser: listAccount,
    totalUser: totalItem
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

export const deleteMultiUserStart = (ids) => {
    console.log('ids', ids)
    return async (dispatch, getState) => {
        for (let i = 0; i < ids.length; i++) {
            console.log('ids ', i, ids[i])
            dispatch(deleteUserStart(ids[i]))
        }
    }
}

export const deleteUserStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let resDeleteUser = await deleteUser(id);
            if (resDeleteUser && resDeleteUser.message) {
                setTimeout(() => {
                    ToastUtil.show('SUCCESS', 'common.confirm', resDeleteUser.message, false)
                    dispatch(deleteUserSucceed())
                    dispatch(fetchAllUserStart())
                    dispatch(updateDeleteUserLoading())
                }, 500)
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

export const updateDeleteUserLoading = () => ({
    type: actionTypes.UPDATE_DELETE_USER_LOADING,
})

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
                dispatch(updateAddUserLoading())
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

export const updateAddUserLoading = () => ({
    type: actionTypes.UPDATE_ADD_USER_LOADING,
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

export const getImageLinkStart = (bucketKey, fileName) => {
    return async (dispatch, getState) => {
        try {
            let resImageLink = await getImageLinkByName(bucketKey, fileName);
            if (resImageLink) {
                dispatch(getImageLinkSucceed(resImageLink))
            } else {
                dispatch(getImageLinkFailed());
            }
        } catch (e) {
            dispatch(getImageLinkFailed());
            console.log('getImageLinkFailed error', e)
        }
    }
}

export const getImageLinkSucceed = (resImageLink) => ({
    type: actionTypes.GET_IMAGE_LINK_SUCCEED,
    resImageLink: resImageLink
})

export const getImageLinkFailed = () => ({
    type: actionTypes.GET_IMAGE_LINK_FAILED
})


export const updateUserStart = (id, data) => {
    return async (dispatch, getState) => {
        try {
            let resUpdateUser = await updatedUser(id, data);
            if (resUpdateUser[0] && !resUpdateUser[0].bindingFailure) {
                ToastUtil.show('ERROR', 'common.unknown-error', resUpdateUser[0].defaultMessage, false)
                dispatch(updateUserFailed());
            } else if (resUpdateUser && resUpdateUser.message) {
                setTimeout(() => {
                    ToastUtil.show('SUCCESS', 'common.confirm', resUpdateUser.message, false)
                    dispatch(updateUserSucceed())
                    dispatch(updateEditUserLoading())
                }, 500)
            }
        } catch (e) {
            dispatch(updateUserFailed());
            console.log('updateUserFailed error', e)
        }
    }
}

export const updateUserSucceed = () => ({
    type: actionTypes.UPDATE_USER_SUCCEED,
})

export const updateEditUserLoading = () => ({
    type: actionTypes.UPDATE_EDIT_USER_LOADING,
})

export const updateUserFailed = () => ({
    type: actionTypes.UPDATE_USER_FAILED
})






