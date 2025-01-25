import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { login } from '../services/auth';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await login(email, password);
            Alert.alert('Sucesso', 'Login realizado!');
            navigation.replace('Hotels');
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    return (
        <View>
            <Text>Login</Text>
            <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
            <Button title="Entrar" onPress={handleLogin} />
            <Button title="Criar conta" onPress={() => navigation.navigate('Register')} />
        </View>
    );
};

export default LoginScreen;
