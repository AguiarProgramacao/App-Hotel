import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
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
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.textButton}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.textReturn}>Retornar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        backgroundColor: "#FFF"
    },
    input: {
        width: "100%",
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 6,
        borderColor: "#B4BEC9"
    },
    button: {
        padding: 12,
        marginBottom: 15,
        backgroundColor: "#002333",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6
    },
    textButton: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20
    },
    textReturn: {
        textDecorationLine: "underline"
    }
});

export default RegisterScreen;
