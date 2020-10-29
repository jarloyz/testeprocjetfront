import axios from 'axios'
const API_URL = 'http://localhost:8000/api/'
class BaseService {
    getUsers(options){
        let formData = new FormData();
        formData.append("options", options);
        console.log(options)
        return axios.get(API_URL + 'users',{
            params: options})
    }
    createUser(user){
        let formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("birthdate", user.birthdate);
        formData.append("address", user.address);
        formData.append("position", user.position);
        formData.append("skills", user.skills);
        return axios.post(API_URL + 'users', formData)
    }
}
export default new BaseService()