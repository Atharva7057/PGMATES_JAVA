import axios from 'axios';


const BASE_URL = "http://localhost:8080/user/";
const token = sessionStorage.getItem('jwtToken');
console.log(token);
class UserServices {
    getAllProperties() {
        return axios.get(BASE_URL + "getAllProperties", {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    getPropertyDetailsByID(pid) {
        return axios.get(`${BASE_URL}properties/${parseInt(pid)}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    addReview(reviewData) {
        return axios.post(`${BASE_URL}addreview`,reviewData ,{
            headers: { Authorization: `Bearer ${token}` }
        });
    }
    bookAppointment( userId,appointmentId){
        console.log(token);
        
        return axios.post(`${BASE_URL}bookAppointment/${userId}/${appointmentId}`,{
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    getBookedAppointments(){
        const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
        const userID = userDetails.userId;
        return axios.get(`${BASE_URL}bookedAppointmentsByUserId/${userID}`,{
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    cancelAppointment(apptId){
        return axios.post(`${BASE_URL}cancelAppointment/${apptId}`,{
            headers: { Authorization: `Bearer ${token}` }
        });
    }
}

export default new UserServices();
