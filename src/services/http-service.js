import axios from "axios";
import { headerTokenKey } from '../config.json';



axios.interceptors.response.use((result) => {
    const url = result.config.url;
    const fullResponseList = [
        '/api/users/',
        '/api/auth/',
    ];
    let hasFullResponse = false;
    fullResponseList.every((item) => {
        if (url.indexOf(item) > -1) {
            return hasFullResponse = true;
        }
    });

    if (!hasFullResponse)
        return Promise.resolve(result.data);
    else
        return Promise.resolve(result);
}, (error) => {
    return Promise.reject(error);
});

export function setToken(token) {
    axios.defaults.headers.common[headerTokenKey] = token;
}

const is400Ex = (ex) => {
    return ex && ex.response && ex.response.status === 400
}
const is404Ex = (ex) => {
    return ex && ex.response && ex.response.status === 404
}

export default {
    get: axios.get,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch,
    post: axios.post,
    setToken,
    is404Ex: is404Ex,
    is400Ex: is400Ex
}