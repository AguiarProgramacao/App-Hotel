import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token');
            setIsLoggedIn(!!token);
        };
        checkAuth();
    }, []);

    const login = async (token) => {
        await AsyncStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
