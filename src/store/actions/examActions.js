import actionTypes from './actionTypes';
import { getDataOfExamByCode, getLinkByKeyAndName } from '../../services/examService.js';

export let examDataMap = []
export let examDataMerge = []
export let partDataMap = [{}, {}, {}, {}, {}, {}, {}, {}]

export const showSideBar = (isShow) => ({
    type: actionTypes.SHOW_SIDE_BAR_SUCCEED,
    isShow: isShow
})

export const fetchExamDataStart = (ids) => {
    console.log('ids', ids)
    return async (dispatch, getState) => {
        for (let i = 0; i < ids.length; i++) {
            dispatch(fetchAllExamDataStart(ids[i]))
        }
        setTimeout(() => {
            dispatch(fetchAllExamDataSucceed(examDataMerge, partDataMap, false))
        }, 2000)
    }
}

export const fetchAllExamDataStart = (codeId) => {
    return async (dispatch, getState) => {
        try {
            let examData = await getDataOfExamByCode(codeId)
            if (examData) {
                examDataMerge = examDataMerge.concat(examData)
                mapExamDataToArray(examData)
            } else {
                dispatch(fetchAllExamDataFailed());
            }

        } catch (e) {
            dispatch(fetchAllExamDataFailed());
            console.log('fetchAllExamDataFailed error', e)
        }
    }
}

export const fetchAllExamDataSucceed = (examDataMerge, partDataMap, isExamLoading) => ({
    type: actionTypes.FETCH_ALL_EXAM_DATA_SUCCEED,
    examData: examDataMerge,
    partDataMap: partDataMap,
    isExamLoading: isExamLoading
})

export const fetchAllExamDataFailed = () => ({
    type: actionTypes.FETCH_ALL_EXAM_DATA_FAILED
})

export const fetchAllExamDataMapStart = () => {
    return async (dispatch, getState) => {
        try {
            setTimeout(() => {
                console.log('examDataMap ', examDataMap)
                dispatch(fetchAllExamDataMapSucceed(examDataMap, partDataMap, false))
            }, 500)
        } catch (e) {
            dispatch(fetchAllExamDataMapFailed());
            console.log('fetchAllExamDataFailed error', e)
        }
    }
}

export const fetchAllExamDataMapSucceed = (examDataMap, isExamMapLoading) => ({
    type: actionTypes.FETCH_ALL_EXAM_DATA_MAP_SUCCEED,
    examDataMap: examDataMap,
    partDataMap: partDataMap,
    isExamMapLoading: isExamMapLoading
})

export const fetchAllExamDataMapFailed = () => ({
    type: actionTypes.FETCH_ALL_EXAM_DATA_MAP_FAILED
})


export const mapExamDataToArray = (examData) => {
    examData.forEach(async (partData, indexP) => {
        let part = {};
        part.active = 1
        part.index = indexP
        partDataMap[partData.partNo] = part
        if (partData.audioLink && partData.audioLink !== null) {
            let resAudioLink = await getLinkByKeyAndName('PART', 'audio/' + partData.id + '-' + partData.name + '/' + partData.audioLink);
            if (resAudioLink) {
                partData.audioLink = resAudioLink
            }
        }
        if (partData.photoLink && partData.photoLink !== null) {
            let resImageLink = await getLinkByKeyAndName('PART', 'image/' + partData.id + '-' + partData.name + '/' + partData.photoLink);
            if (resImageLink) {
                partData.photoLink = resImageLink
            }
        }
        (partData.partDetailList && partData.partDetailList.forEach(async (partDetail, indexPD) => {
            partDetail.partId = partData.id
            partDetail.partName = partData.name
            examDataMap[partDetail.questionNo] = partDetail
            if (partDetail.audioLink && partDetail.audioLink !== null) {
                console.log('partDetail.audioLink', 'audio/' + partDetail.partId + '-' + partDetail.partName + '/detail/' + partDetail.audioLink)
                let resAudioLink = await getLinkByKeyAndName('PART', 'audio/' + partDetail.partId + '-' + partDetail.partName + '/detail/' + partDetail.audioLink);
                if (resAudioLink) {
                    if (examDataMap && examDataMap != null) {
                        examDataMap[partDetail.questionNo].audioLink = resAudioLink
                    }
                }
            }
            if (partDetail.photoLink && partDetail.photoLink !== null) {
                console.log('partDetail.photoLink', 'image/' + partDetail.partId + '-' + partDetail.partName + '/detail/' + partDetail.photoLink)
                let resImageLink = await getLinkByKeyAndName('PART', 'image/' + partDetail.partId + '-' + partDetail.partName + '/detail/' + partDetail.photoLink);
                if (resImageLink) {
                    if (examDataMap && examDataMap != null) {
                        examDataMap[partDetail.questionNo].photoLink = resImageLink
                    }
                }
            }
        }))
    });
    return true;
}  