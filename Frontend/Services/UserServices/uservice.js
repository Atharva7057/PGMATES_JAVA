import axios from 'axios';

const BASE_URL = "http://localhost:8080/user/";

class UserServices {
    getAllProperties() {
        return axios.get(BASE_URL + "getAllProperties");
    }

    getPropertyDetailsByID(pid){
        const id = parseInt(pid);
        return axios.get(BASE_URL+`properties/${id}`);
    
        
    }

}

export default new UserServices();
