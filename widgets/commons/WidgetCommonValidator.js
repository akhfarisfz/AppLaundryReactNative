import { StyleSheet, View } from 'react-native';
import { Text, Icon } from 'react-native-paper';

const WidgetCommonValidator = ({ messages }) => {
  return (
    <>
      <View style={styles.container}>
        {messages?.map((message, index) => (
          <Text key={index} style={styles.text} variant="labelSmall">
            <Icon source="alert-outline" color='red' size={16}/> {message}
          </Text>
        ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  text: {
    color: "red",
    fontWeight: "normal"
  }
})

export default WidgetCommonValidator;