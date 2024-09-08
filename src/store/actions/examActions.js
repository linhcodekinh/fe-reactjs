import actionTypes from './actionTypes';
import { getDataOfExamByCode, getLinkByKeyAndName } from '../../services/examService.js';

export const examDataMap = []

export const showSideBar = (isShow) => ({
    type: actionTypes.SHOW_SIDE_BAR_SUCCEED,
    isShow: isShow
})


export const fetchAllExamDataStart = (codeId) => {
    return async (dispatch, getState) => {
        try {
            let examData = await getDataOfExamByCode(codeId);
            if (examData) {
                mapExamDataToArray(examData)
                dispatch(fetchAllExamDataSucceed(examData, examDataMap))
            } else {
                dispatch(fetchAllExamDataFailed());
            }

        } catch (e) {
            dispatch(fetchAllExamDataFailed());
            console.log('fetchAllExamDataFailed error', e)
        }
    }

}

export const fetchAllExamDataSucceed = (examData, examDataMap) => ({
    type: actionTypes.FETCH_ALL_EXAM_DATA_SUCCEED,
    examData: examData,
    examDataMap: examDataMap
})

export const fetchAllExamDataFailed = () => ({
    type: actionTypes.FETCH_ALL_EXAM_DATA_FAILED
})


export const mapExamDataToArray = (examData) => {
    examData.forEach((partData, indexP) => {
        (partData.partDetailList && partData.partDetailList.forEach(async (partDetail, indexPD) => {
            partDetail.partId = partData.id
            partDetail.partName = partData.name
            examDataMap[partDetail.questionNo] = partDetail
            if(partDetail.audioLink && partDetail.audioLink !== null){
                console.log('partDetail.audioLink', 'audio/' + partDetail.partId + '-' + partDetail.partName + '/detail/' + partDetail.audioLink  )
                let resAudioLink = await getLinkByKeyAndName('PART', 'audio/' + partDetail.partId + '-' + partDetail.partName + '/detail/' + partDetail.audioLink);
                if (resAudioLink) {
                    if(examDataMap && examDataMap != null){
                        examDataMap[partDetail.questionNo].audioLink = resAudioLink
                    }
                } 
            }
            if(partDetail.photoLink && partDetail.photoLink !== null){
                console.log('partDetail.photoLink', 'image/' + partDetail.partId + '-' + partDetail.partName + '/detail/' + partDetail.photoLink  )
                let resImageLink = await getLinkByKeyAndName('PART', 'image/' + partDetail.partId + '-' + partDetail.partName + '/detail/' + partDetail.photoLink);
                if (resImageLink) {
                    if(examDataMap && examDataMap != null){
                        examDataMap[partDetail.questionNo].photoLink = resImageLink
                    }
                } 
            }
         }))
    });
 }  