import http from "./http-service";
import { baseApiUrl } from "../config.json";

const apiUrl = baseApiUrl + "users/";
const headerTokenKey = "x-auth-token";
export async function register(user) {
    const { username: email, password, name } = user;
    const response = await http.post(apiUrl, { email, password, name });
    return response.headers[headerTokenKey];
}

export default {
    register: register
}