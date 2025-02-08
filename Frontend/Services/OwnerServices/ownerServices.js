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
      amenities: data.amenities,
      capacity: data.capacity || 0,
      deposit: data.deposit || 0,
      forGender: data.gender,
      furnishType: data.furnishedType || "",
      location: data.location || "",
      nearByPlaces: data.nearbyPlaces || "",
      rent: data.rent || 0.01,
      ownerID: userID,
      isavailable: true,
      type: data.propertyType,
      image: data.image,
      address: {
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
      },
    };
    console.log(formattedData);


    try {
      const response = await axios.post(`${BASE_URL}${userID}/properties/register`, formattedData, this.getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error registering property:", error);
      throw error;
    }
  }

  async updateProperty(propertyId,data) {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const userID = userDetails.userId;
    console.log(userID);
    const formattedData = {
      amenities: data.amenities,
      capacity: data.capacity || 0,
      deposit: data.deposit || 0,
      forGender: data.gender,
      furnishType: data.furnishedType || "",
      location: data.location || "",
      nearByPlaces: data.nearbyPlaces || "",
      rent: data.rent || 0.01,
      ownerID: userID,
      isavailable: true,
      type: data.propertyType,
      image: data.image,
      address: {
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
      },
    };
    console.log(formattedData);


    try {
      const response = await axios.put(`${BASE_URL}${userID}/properties/${propertyId}`, formattedData, this.getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error registering property:", error);
      throw error;
    }
  }
  async getAllPropertiesByOwner() {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const ownerId = userDetails.userId;
    try {
      const response = await axios.get(`${BASE_URL}${ownerId}/properties`, this.getAuthHeaders());
      console.log(response);

      return response.data;
    } catch (error) {
      console.error("Error fetching property:", error);
      throw error;
    }
  }
  async getPropertyDetails(propertyId) {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const ownerId = userDetails.userId;
    try {
      const response = await axios.get(`${BASE_URL}getPropertyDetails/${propertyId}`, this.getAuthHeaders());
      console.log(response);

      return response.data;
    } catch (error) {
      console.error("Error fetching property:", error);
      throw error;
    }
  }
  async addAppointmentSlot(slotDetails) {

    try {
      const response = await axios.post(`${BASE_URL}addAppointmentSlot`, slotDetails, this.getAuthHeaders());
      console.log(response);

      return response.data;
    } catch (error) {
      toast.error("Error fetching property:", error);
      throw error;
    }
  }

  async removeAppointmentSlot(appointmentId){
    try{
      const removeSlotResponse = await axios.delete(`${BASE_URL}deleteAppointmentSlot/${appointmentId}`, this.getAuthHeaders());
      return removeSlotResponse.data;
    }catch(error){
      console.log(error);
    }
  }

  async updateAppointmentSlot(appointmentId,slot){
    try{
      const updateSlotResponse = await axios.put(`${BASE_URL}update/${appointmentId}`,slot, this.getAuthHeaders());
      return updateSlotResponse.data;
    }catch(error){
      console.log(error);
    }
  }

  async deleteProperty(propertyId){
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const ownerId = userDetails.userId;
    try{
      const deleteSlotResponse = await axios.delete(`${BASE_URL}${ownerId}/properties/${propertyId}`, this.getAuthHeaders());
      return deleteSlotResponse.data;
    }catch(error){
      console.log(error);
    }
  }

  async getBookedAppointments(){
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const ownerId = userDetails.userId;
    try{
      const apptlist = await axios.get(`${BASE_URL}getBookedAppointments/${ownerId}`, this.getAuthHeaders());
      return apptlist.data;
    }catch(error){
      console.log(error);
    }
  }

  async cancelAppointment(apptId) {
    try {
      const cancelAppointmentResponse = await axios.delete(
        `${BASE_URL}cancelAppointment/${apptId}`, 
        {}, // Empty data since it's a POST request
        { headers: this.getAuthHeaders() } // Pass headers correctly
      );
      return cancelAppointmentResponse.data;
    } catch (error) {
      console.error("Error canceling appointment:", error);
      throw error; // Throw error so it can be caught in the calling function
    }
  }

  async toggleAvailability(propertyId){
    try{
      const updateSlotResponse = await axios.put(`${BASE_URL}toggleAvailability/${propertyId}`, this.getAuthHeaders());
      return updateSlotResponse.data;
    }catch(error){
      console.log(error);
    }
  }
  
}

export default new OwnerServices();
