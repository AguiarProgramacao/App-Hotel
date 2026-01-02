import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.0.108:5000/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.Authorization;
    }
};

export const logout = async () => {
    try {
        await AsyncStorage.removeItem('token');
        setAuthToken(null);
    } catch (error) {
        console.error('Erro ao remover token', error);
    }
};

export default api;
