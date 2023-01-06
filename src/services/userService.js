import axios from '../axios';

const handleLoginApi = (userEmail, userPassword) => {
    console.log(userEmail, userPassword);
    return axios.post('api/public/login', {'username' : userEmail, 'password' : userPassword});
}

export { handleLoginApi }