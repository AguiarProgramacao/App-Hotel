import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { login as apiLogin } from '../services/auth';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const response = await apiLogin(email, password);
            login(response.token);
            Alert.alert('Sucesso', 'Login realizado!');
        } catch (error) {
            Alert.alert('Erro', error.message || 'Erro ao fazer login');
        }
    };   

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
            <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
                <Text style={styles.textButton}>Acessar</Text>
            </TouchableOpacity>
            <View style={styles.containerRegister}>
                <Text>Ainda não tem conta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.textRegister}>Clique aqui</Text>
                </TouchableOpacity>
            </View>
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
    buttonLogin: {
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
    containerRegister: {
        flexDirection: "row"
    },
    textRegister: {
        textDecorationLine: "underline",
        marginLeft: 5
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20
    }
})

export default LoginScreen;
