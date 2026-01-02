import react from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();

  const handleReturn = () => {
    navigation.goBack();
  }

  return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleReturn}>
        <FontAwesome5 name="arrow-left" size={28} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    top: 10,
    left: 15
  }
})