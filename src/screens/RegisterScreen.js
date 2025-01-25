import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { api } from '../services/api';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await api.post('/users/register', {
                name,
                email,
                password
            });

            Alert.alert('Sucesso', response.data.message);
            navigation.navigate('Login');

        } catch (error) {
            console.log('Erro:', error.response ? error.response.data : error.message);
            Alert.alert('Erro', error.response?.data?.message || 'Erro ao cadastrar usuário');
        }
    };


    return (
        <View>
            <Text>Cadastro</Text>
            <TextInput placeholder="Nome" value={name} onChangeText={setName} />
            <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
            <TouchableOpacity onPress={handleRegister}>
                <Text>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterScreen;
