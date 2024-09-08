import actionTypes from '../actions/actionTypes';
import { examDataMap } from '../actions/examActions';

const initialState = {
    isShow: false,
    examData: [],
    examDataMap: []
}

const examReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_SIDE_BAR_SUCCEED:
            return {
                ...state,
                isShow: action.isShow
            }
        case actionTypes.FETCH_ALL_EXAM_DATA_SUCCEED:
            return {
                ...state,
                examData: action.examData,
                examDataMap: action.examDataMap
            }
        case actionTypes.FETCH_ALL_EXAM_DATA_FAILED:
            return {
                ...state,
                examData: [],
                examDataMap: []
            }
        case actionTypes.GET_IMAGE_LINK_SUCCEED:
            return {
                ...state,
                examDataMap: action.examDataMap
            }
        case actionTypes.GET_IMAGE_LINK_FAILED:
            return {
                ...state,
                examDataMap: []
            }
        default:
            return state;
    }
}

export default examReducer;