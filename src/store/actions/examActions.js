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
                setTimeout(() => {
                    dispatch(fetchAllExamDataSucceed(examData, examDataMap, false))
                }, 700)
            } else {
                dispatch(fetchAllExamDataFailed());
            }

        } catch (e) {
            dispatch(fetchAllExamDataFailed());
            console.log('fetchAllExamDataFailed error', e)
        }
    }

}

export const fetchAllExamDataSucceed = (examData, examDataMap, isExamLoading) => ({
    type: actionTypes.FETCH_ALL_EXAM_DATA_SUCCEED,
    examData: examData,
    examDataMap: examDataMap,
    isExamLoading: isExamLoading
})

export const fetchAllExamDataFailed = () => ({
    type: actionTypes.FETCH_ALL_EXAM_DATA_FAILED
})


export const mapExamDataToArray = (examData) => {
    examData.forEach(async (partData, indexP) => {

        if(partData.audioLink && partData.audioLink !== null){
            console.log('partData.audioLink', 'audio/' + partData.id + '-' + partData.name + '/' + partData.audioLink  )
            let resAudioLink = await getLinkByKeyAndName('PART', 'audio/' + partData.id + '-' + partData.name + '/' + partData.audioLink);
            if (resAudioLink) {
                partData.audioLink = resAudioLink
            } 
        }
        if(partData.photoLink && partData.photoLink !== null){
            console.log('partData.photoLink', 'image/' + partData.id + '-' + partData.name + '/' + partData.photoLink  )
            let resImageLink = await getLinkByKeyAndName('PART', 'image/' + partData.id + '-' + partData.name + '/' + partData.photoLink);
            if (resImageLink) {
                partData.photoLink = resImageLink
            } 
        }
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
    return true;
 }  