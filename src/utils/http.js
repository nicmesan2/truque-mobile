import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import { AsyncStorage } from 'react-native';

const url = 'http://54f40b01ee93.ngrok.io';

const instance = axios.create({
    baseURL: url,
    adapter: httpAdapter,
});

instance.interceptors.request.use(async(config) => {
    const token = await AsyncStorage.getItem('token')
    config.contentType = 'application/json'

    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }

    return config;
}, error => Promise.reject(error));



export const apiUrls = {
    item: {
        create: '/item',
    }
}

export default instance