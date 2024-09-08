import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import adminReducer from "./adminReducer";
import userReducer from "./userReducer";
import userManageReducer from "./userManageReducer";
import examReducer from './examReducer';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { common } from '@mui/material/colors';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userManagePersistConfig = {
    ...persistCommonConfig,
    key: 'userManage',
    whitelist: ['userIdEdit']
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo', 'userView']
};

const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language']
}

const examPersistConfig = {
    ...persistCommonConfig,
    key: 'exam',
    whitelist: ['isShow']
}


export default (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    userManage: persistReducer(userManagePersistConfig, userManageReducer),
    exam:persistReducer(examPersistConfig, examReducer),
    //userManage: userManageReducer,
    app: persistReducer(appPersistConfig, appReducer)
})