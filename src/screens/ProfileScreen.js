import React from 'react';
import { View, Text, Button } from 'react-native';
import { logout } from '../services/api'; // Importa a função logout do serviço API

const ProfileScreen = ({ navigation }) => {
    const handleLogout = async () => {
        try {
            await logout();
            navigation.replace('Login');
        } catch (error) {
            console.error('Erro ao realizar o logout', error);
        }
    };

    return (
        <View>
            <Text>Perfil</Text>
            <Button title="Sair" onPress={handleLogout} />
        </View>
    );
};

export default ProfileScreen;
