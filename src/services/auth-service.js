import http from "./http-service";
import { baseApiUrl } from "../config.json";
import JwtDecode from 'jwt-decode';
const tokenKey = "token";
const apiUrl = baseApiUrl + "auth/";

http.setToken(getToken());


export async function login(email, password) {
    const data = await http.post(apiUrl, { email, password });
    if (data) {
        localStorage.setItem(tokenKey, data);
    }
}

export async function loginWithToken(token) {
    localStorage.setItem(tokenKey, token);
}

export function logout(user) {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const token = localStorage.getItem(tokenKey);
        return JwtDecode(token);
    } catch (error) {
        return null;
    }
}
export function getToken() {
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    logout,
    getCurrentUser,
    loginWithToken,
    getToken,
}