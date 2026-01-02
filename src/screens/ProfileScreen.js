import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';

const ProfileScreen = ({ navigation }) => {
    const { logout } = useContext(AuthContext);
    const [user, setUser] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/profile')
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao carregar dados do usuário', error);
                setLoading(false);
            });
    }, []);

    const handleLogout = async () => {
        await logout();
        navigation.navigate('Login');
    };
    
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>Nome: {user.name || 'Usuário'}</Text>
                <Text style={styles.userEmail}>E-mail: {user.email || 'E-mail não disponível'}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.textButton}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userInfo: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        width: "100%"
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userEmail: {
        fontSize: 16,
        color: '#555',
    },
    button: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 6,
        backgroundColor: "#002333"
    },
    textButton: {
        color: "#FFF",
        fontSize: 17,
        fontWeight: "bold"
    }
});

export default ProfileScreen;