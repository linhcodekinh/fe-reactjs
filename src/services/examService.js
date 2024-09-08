import axios from '../axios';

const getDataOfExamByCode = (codeId) => {
    return axios.get('api/public/part/list-by-code', { params: {code: codeId} })
}

const getLinkByKeyAndName = (bucketKey, fileName) => {
    console.log('bucketKey, fileName', bucketKey, fileName)
    return axios.get('api/public/v1/files', { params: { bucketKey: bucketKey, fileName: fileName } })
}

export {getDataOfExamByCode, getLinkByKeyAndName}