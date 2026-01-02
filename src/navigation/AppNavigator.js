import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext'; // Importar o contexto
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HotelsScreen from '../screens/HotelsScreen';
import BookingScreen from '../screens/BookingScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PaymentsAccept from '../screens/PaymentAccept';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator >
                {!isLoggedIn ? (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Hotels" component={HotelsScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Booking" component={BookingScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="paymentAccept" component={PaymentsAccept} options={{ headerShown: false }} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
