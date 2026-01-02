import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../services/api';
import Header from '../components/Header';

const BookingScreen = ({ route, navigation }) => {
    const { hotel } = route.params;
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [showCheckInPicker, setShowCheckInPicker] = useState(false);
    const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.header}>Fazendo reserva em {hotel.name}</Text>

            <Text style={styles.label}>Check-in</Text>
            <TouchableOpacity
                style={styles.input}
                onPress={() => setShowCheckInPicker(true)}
            >
                <Text style={styles.inputText}>{checkIn || 'Selecionar data'}</Text>
            </TouchableOpacity>
            {showCheckInPicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="calendar"
                    onChange={(event, selectedDate) => {
                        setShowCheckInPicker(false);
                        if (selectedDate) {
                            setCheckIn(formatDate(selectedDate));
                        }
                    }}
                />
            )}

            <Text style={styles.label}>Check-out</Text>
            <TouchableOpacity
                style={styles.input}
                onPress={() => setShowCheckOutPicker(true)}
            >
                <Text style={styles.inputText}>{checkOut || 'Selecionar data'}</Text>
            </TouchableOpacity>
            {showCheckOutPicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="calendar"
                    onChange={(event, selectedDate) => {
                        setShowCheckOutPicker(false);
                        if (selectedDate) {
                            setCheckOut(formatDate(selectedDate));
                        }
                    }}
                />
            )}

            <Button
                title="Reservar"
                onPress={async () => {
                    try {
                        const checkInISO = checkIn.split('/').reverse().join('-');
                        const checkOutISO = checkOut.split('/').reverse().join('-');

                        const response = await api.post('/bookings/add', {
                            hotel_id: hotel.id,
                            check_in: checkInISO,
                            check_out: checkOutISO,
                        });

                        Alert.alert('Reserva criada!', 'Agora vá para o pagamento.');
                        navigation.navigate('Payment', { bookingId: response.data.booking.id });
                    } catch (error) {
                        console.error('Erro na reserva:', error.response?.data || error.message);
                        Alert.alert('Erro', error.response?.data?.message || 'Falha ao criar reserva');
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
        justifyContent: "center",
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: "center"
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: '#fff',
        width: "100%"
    },
    inputText: {
        fontSize: 16,
        color: '#333',
    },
});

export default BookingScreen;
