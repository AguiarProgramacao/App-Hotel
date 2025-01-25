import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { api } from '../services/api';

const PaymentScreen = ({ route, navigation }) => {
    const { bookingId } = route.params;
    const [paymentUrl, setPaymentUrl] = useState('');
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);

    useEffect(() => {
        api.post('/payments/checkout', { booking_id: bookingId })
            .then(response => setPaymentUrl(response.data.url))
            .catch(error => console.error('Erro ao gerar pagamento', error));
    }, [bookingId]);

    const handleNavigationStateChange = (state) => {
        if (state.url.includes('payment-success')) {
            setIsPaymentComplete(true);
        }
    };

    useEffect(() => {
        if (isPaymentComplete) {
            navigation.navigate("PaymentsAccept");
        }
    }, [isPaymentComplete, navigation]);

    if (!paymentUrl) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <WebView
            source={{ uri: paymentUrl }}
            onNavigationStateChange={handleNavigationStateChange}
        />
    );
};

export default PaymentScreen;
