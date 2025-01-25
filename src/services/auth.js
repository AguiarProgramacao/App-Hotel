import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, setAuthToken } from './api';

// Registrar usuário
export const register = async (name, email, password) => {
    const response = await api.post('/users/register', { name, email, password });
    return response.data;
};

// Fazer login
export const login = async (email, password) => {
    const response = await api.post('/users/login', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    setAuthToken(response.data.token);
    return response.data;
};

// Verificar se o usuário está autenticado
export const checkAuth = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        setAuthToken(token);
        return true;
    }
    return false;
};

// Logout
export const logout = async () => {
    await AsyncStorage.removeItem('token');
    setAuthToken(null);
};
