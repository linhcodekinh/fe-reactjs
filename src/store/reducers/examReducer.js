import actionTypes from '../actions/actionTypes';
import { examDataMap } from '../actions/examActions';

const initialState = {
    isShow: false,
    examData: [],
    examDataMap: [],
    isExamLoading: true
}

const examReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_SIDE_BAR_SUCCEED:
            return {
                ...state,
                isShow: action.isShow
            }
        case actionTypes.FETCH_ALL_EXAM_DATA_SUCCEED:
            console.log('isExamLoading suc ', state.isExamLoading)
            return {
                ...state,
                examData: action.examData,
                examDataMap: action.examDataMap,
                isExamLoading: action.isExamLoading
            }
        case actionTypes.FETCH_ALL_EXAM_DATA_FAILED:
            console.log('isExamLoading fai', state.isExamLoading)
            return {
                ...state,
                examData: [],
                examDataMap: [],
                isExamLoading: true
            }
        default:
            return state;
    }
}

export default examReducer;