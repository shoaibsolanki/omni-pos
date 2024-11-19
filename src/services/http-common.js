import axios from 'axios'
import { BASE_Url } from '../URL';

export const BASEURL = {
   ENDPOINT_URL: BASE_Url,
   LOYALTY_URL: "https://loyaltyprdapi.photonsoftwares.com/prod/api/v1",
//    ENDPOINT_URL: "http://192.168.1.14:9000/",
//    ENDPOINT_URL: "http://localhost:5000/",
}

export const authToken = localStorage.getItem('token');

export default axios.create({
    baseURL: `${BASEURL.ENDPOINT_URL}`,
    timeout: 7200000,
    // headers: {
    //     "Access-Control-Allow-Origin":"*",
    //     "authtoken": `${authToken}`
    // }
});
