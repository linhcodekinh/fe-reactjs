import axios from '../axios';

const handleLoginApi = (userEmail, userPassword) => {
    console.log(userEmail, userPassword);
    return axios.post('api/public/login', {'username' : userEmail, 'password' : userPassword});
}

const getAllUsers = () => {
    return axios.get('api/public/account')
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
    return axios.post('api/public/account/', data)
} 

const updatedUser = (id, data) => {
    console.log('check data from service: ',id, data)
    return axios.put(`api/public/account/${id}`, data)
} 

const deleteUser = (id) => {
    return axios.patch(`api/public/account/${id}`)
}

const getUser = (id) => {
    return axios.get(`api/public/account/${id}`)
}

export { handleLoginApi, getAllUsers, getAllPositions, getAllRole, getAllType, createNewUser, deleteUser, getUser, updatedUser }