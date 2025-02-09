
import axios from 'axios';
import { use } from 'react';

const BASE_URL = "http://localhost:8080/api/authenticate";

export function verify(email,password) {
    const requestBody = {
        email: email,
        password: password
    };
   const loginResponse = axios.post(BASE_URL+"/login",requestBody);
//    console.log(loginResponse);
   
   return loginResponse;
}  

export async function registerUser(userData){
    try{
        // const userRole = userData.role === "user"?"ROLE_USER":"ROLE_OWNER";
        // const userGender = userData.gender === "MALE"?"MALE":"FEMALE";
        var requestBody={
            firstName : userData.firstName,
            lastName : userData.lastName,
            role : userData.role,
            gender : userData.gender,
            contact : userData.contact,
            email : userData.email,
            password : userData.password
        }
        const registerResponse =await axios.post(BASE_URL+"/register",requestBody);
        return registerResponse;
    }catch(error){
        return error;
    }
}