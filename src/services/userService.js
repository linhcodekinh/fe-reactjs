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

export { handleLoginApi, getAllUsers, getAllPositions }