import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.0.107:5000/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Middleware para adicionar o token JWT automaticamente a todas as requisições
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Função para remover o token
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.Authorization;
    }
};

// Função para limpar o token do AsyncStorage e da API
export const logout = async () => {
    try {
        await AsyncStorage.removeItem('token'); // Remove o token do AsyncStorage
        setAuthToken(null); // Remove o token da configuração da API
    } catch (error) {
        console.error('Erro ao remover token', error);
    }
};

export default api;
