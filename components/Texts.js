import { StyleSheet } from "react-native";
import { Text } from "react-native";

export const Heading6 = ({ text }) => {
  return <Text style={styles.heading6}>{text}</Text>;
};

const styles = StyleSheet.create({
  heading6: {
    color: "black",
    fontSize: 24,
    fontWeight: "400",
  },
});
