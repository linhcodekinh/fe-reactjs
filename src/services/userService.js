import axios from '../axios';

const handleLoginApi = (userEmail, userPassword) => {
    console.log(userEmail, userPassword);
    return axios.post('api/public/login', { 'username': userEmail, 'password': userPassword });
}

const getAllUsers = (offset, pageSize, field, direction, textSearch) => {
    return axios.get('api/public/account', { params: { offset: offset, pageSize: pageSize, field: field, direction: direction, textSearch: textSearch } })
}

const getAllPositions = () => {
    return axios.get('api/public/position')
}

const getAllType = () => {
    return axios.get('api/public/type')
}

const getAllRole = () => {
    return axios.get('api/public/role')
}

const createNewUser = (data) => {
    console.log('check data from service: ', data)
    return axios.post('api/public/account/', data, {
        headers: {
            // "X-AUTH-TOKEN": token,
            "Content-Type": "multipart/form-data",
        },
    }
    )
}

const updatedUser = (id, data) => {
    console.log('check data from service: ', id, data)
    return axios.put(`api/public/account/${id}`, data)
}

const deleteUser = (id) => {
    return axios.patch(`api/public/account/${id}`)
}

const getUser = (id) => {
    return axios.get(`api/public/account/${id}`)
}


const getImageLinkByName = (bucketKey, fileName) => {
    console.log('bucketKey, fileName', bucketKey, fileName)
    return axios.get('api/public/v1/files', { params: { bucketKey: bucketKey, fileName: fileName } }
    )
}

export { handleLoginApi, getAllUsers, getAllPositions, getAllRole, getAllType, createNewUser, deleteUser, getUser, updatedUser, getImageLinkByName }