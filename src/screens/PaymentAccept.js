import react from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PaymentsAccept() {
  return(
    <View style>
      <Text>Pagamento Aprovado!!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})