import axios from 'axios';


const BASE_URL = "http://localhost:8080/owner/";
const token = sessionStorage.getItem('jwtToken');
console.log(token);
class OwnerServices {
     
    getAuthHeaders() {
        const token = sessionStorage.getItem("jwtToken");
        
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }

    async registerProperty(data) {
        const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
        const userID = userDetails.userId;
        console.log(userID);
        const formattedData = {
            amenities: data.amenities ,
            capacity: data.capacity || 0,
            deposit: data.deposit || 0,
            forGender: data.gender,
            furnishType: data.furnishedType || "",
            location: data.location || "",
            nearByPlaces: data.nearbyPlaces || "",
            rent: data.rent || 0.01,
            ownerID: userID ,
            isavailable: true,
            type: data.propertyType ,
            image: data.image ,
            address: {
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2,
                city: data.city,
                state:data.state ,
                pincode: data.pincode ,
          },
        };
        console.log(formattedData);
        
    
        try {
          const response = await axios.post(`${BASE_URL}${userID}/properties/register`, formattedData,this.getAuthHeaders());
          return response.data;
        } catch (error) {
          console.error("Error registering property:", error);
          throw error;
        }
    }
    
    async getAllPropertiesByOwner(){
       const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
        const ownerId = userDetails.userId;
        try {
            const response = await axios.get(`${BASE_URL}${ownerId}/properties`,this.getAuthHeaders());
            console.log(response);
            
            return response.data;
          } catch (error) {
            console.error("Error fetching property:", error);
            throw error;
          }
    }
}

export default new OwnerServices();
