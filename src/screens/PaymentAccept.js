import react from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";

export default function PaymentsAccept({ navigation }) {
  const handleAccept = () => {
    navigation.navigate("Hotels")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamento Aprovado!!</Text>
      <TouchableOpacity style={styles.button} onPress={handleAccept}>
        <Text style={styles.text}>Início</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 30
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 6,
    backgroundColor: "#002333"
  },
  text: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "bold"
  }
})