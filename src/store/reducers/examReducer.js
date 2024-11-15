import actionTypes from '../actions/actionTypes';
import { examDataMap } from '../actions/examActions';

const initialState = {
    isShow: false,
    examData: [],
    examDataMap: [],
    partDataMap: [],
    isExamLoading: true,
    isExamMapLoading: true
}

const examReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_SIDE_BAR_SUCCEED:
            return {
                ...state,
                isShow: action.isShow
            }
        case actionTypes.FETCH_ALL_EXAM_DATA_SUCCEED:
            console.log('action.examData ', action.examData)
            return {
                ...state,
                examData: action.examData,
                partDataMap: action.partDataMap,
                isExamLoading: action.isExamLoading
            }
        case actionTypes.FETCH_ALL_EXAM_DATA_FAILED:
            return {
                ...state,
                examData: [],
                partDataMap: [],
                isExamLoading: true
            }
        case actionTypes.FETCH_ALL_EXAM_DATA_MAP_SUCCEED:
            console.log('action.examDataMap ', action.examDataMap)
            return {
                ...state,
                examDataMap: action.examDataMap,
                isExamMapLoading: action.isExamMapLoading
            }
        case actionTypes.FETCH_ALL_EXAM_DATA_MAP_FAILED:
            return {
                ...state,
                examDataMap: [],
                isExamMapLoading: true
            }
        default:
            return state;
    }
}

export default examReducer;