import { Text, View, LogBox } from "react-native";
import ListBelanja from "../components/ListBelanja";
import FormSignIn from "../components/FormSignIn";
import WrapperPageAuth from "../wrappers/WrapperPageAuth";

LogBox.ignoreLogs(['Warning'])
LogBox.ignoreAllLogs()

const ScreenAbout = ({navigation, route}) => {
  return (
    <View>
      <WrapperPageAuth />
      <Text>About Me</Text>
    </View>
  )
}

export default ScreenAbout;