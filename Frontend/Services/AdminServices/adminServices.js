import axios from 'axios';
const BASE_URL = "http://localhost:8080/admin";
const token = sessionStorage.getItem('jwtToken');
console.log(token);
class AdminServices {

    async getAuthHeaders() {
        const token = sessionStorage.getItem("jwtToken");

        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }

    async getAllProperties(){
        try{
            const propertyResponse = await axios.get(`${BASE_URL}/getAllProperties`,this.getAuthHeaders);
            return propertyResponse.data;
        }catch(error){
            console.log(error);         
        }
    }

    async getAllUsers(){
        try{
            const userResponse = await axios.get(`${BASE_URL}/getAllUsers`,this.getAuthHeaders);
            console.log(userResponse);
            
            return userResponse.data;
        }catch(error){
            console.log(error);         
        }
    }

    async getAllOwners(){
        try{
            const ownerResponse = await axios.get(`${BASE_URL}/getAllOwners`,this.getAuthHeaders);
            return ownerResponse.data;
        }catch(error){
            console.log(error);         
        }
    }

    async getPropertyDetailsByID(pid){
        try{
            const PropertyResponse = await axios.get(`${BASE_URL}/getPropertyById/${pid}`,this.getAuthHeaders);
            return PropertyResponse;
        }catch(error){
            console.log(error);         
        }
    }


}

export default new AdminServices();
