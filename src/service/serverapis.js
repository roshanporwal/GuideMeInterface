
import axios from "axios";
/**
 * All the server apis will be posted here and used from here and here only
 */

export const API_URL = "";

//Master axios function from where we will send all the data
export default axios.create({
    baseURL: API_URL,
});

//Header to validate the login request
/* export function authHeader() {
    let token = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).auth_token : '';
    if (token) 
    {
        return `bearer ${token}`;
    } 
    else 
    {
        return '';
    }
}; */