import React, { useEffect, useState } from 'react';
import { View, StatusBar, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { api } from '../services/api';
import { FontAwesome5 } from "@expo/vector-icons"

const HotelsScreen = ({ navigation }) => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        api.get('/hotels')
            .then(response => setHotels(response.data))
            .catch(error => console.error('Erro ao carregar hotéis', error));
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F4F4F4" />
            <View style={styles.header}>
                <Text style={styles.title}>Hotéis Disponíveis</Text>
                <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
                    <FontAwesome5 style={styles.profileButtonText} name="user" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={hotels}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Booking', { hotel: item })}
                    >
                        {item.image && (
                            <Image source={{ uri: item.image }} style={styles.image} />
                        )}
                        <View style={styles.infoContainer}>
                            <Text style={styles.hotelName}>{item.name}</Text>
                            <Text style={styles.location}>{item.location}</Text>
                            <Text style={styles.price}>R$ {item.price_per_night}/noite</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    image: {
        width: '100%',
        height: 200,
    },
    infoContainer: {
        padding: 10,
    },
    hotelName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    location: {
        fontSize: 14,
        color: '#777',
    },
    price: {
        fontSize: 16,
        color: '#e67e22',
        fontWeight: 'bold',
        marginTop: 5,
    },
    button: {
        padding: 15,
        backgroundColor: "#cecece",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15
    },
    textButton: {
        fontSize: 16,
        fontWeight: "bold"
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    profileButton: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    profileButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default HotelsScreen;
