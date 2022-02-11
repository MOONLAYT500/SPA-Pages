import axios from 'axios';
import { message } from 'antd';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/', // creating baseURL
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        'token'
    )}`;
    return config;
});

api.interceptors.response.use(
    // error han
    (response) => response,
    (error) => {
        let errorMessage;
        const res = error.request.response;
        if (!res) {
            errorMessage = 'No responce';
        }
        if (res === undefined) {
            errorMessage = 'Client side trouble';
        }
        if (error.response) {
            errorMessage = `${error.response.status}: ${error.response.data.message}`;
        }
        message.error(errorMessage);
        console.log(errorMessage);
    }
);