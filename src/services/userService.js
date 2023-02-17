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
    return axios.post('api/public/account', data)
} 

export { handleLoginApi, getAllUsers, getAllPositions, getAllRole, getAllType, createNewUser }