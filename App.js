import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HotelsScreen from './src/screens/HotelsScreen';
import BookingScreen from './src/screens/BookingScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PaymentsAccept from './src/screens/PaymentAccept';

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
                        <Stack.Screen name='PaymentsAccept' component={PaymentsAccept} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
