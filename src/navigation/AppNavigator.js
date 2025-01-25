import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HotelsScreen from '../screens/HotelsScreen';
import BookingScreen from '../screens/BookingScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('token').then((token) => {
            setIsLoggedIn(!!token);
        });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!isLoggedIn ? (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Hotels" component={HotelsScreen} />
                        <Stack.Screen name="Booking" component={BookingScreen} />
                        <Stack.Screen name="Payment" component={PaymentScreen} />
                        <Stack.Screen name="Profile" component={ProfileScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
