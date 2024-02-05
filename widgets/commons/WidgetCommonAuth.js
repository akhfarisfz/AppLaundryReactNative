import { useContext, useEffect } from "react"
import { CONTEXT_APP } from "../../settings";
import { useIsFocused } from '@react-navigation/native';
import { Text } from "react-native";
import ScreenAuthSignIn from "../../screens/auth/ScreenAuthSignIn";

const WidgetCommonAuth = ({child}) => {
  const isFocused = useIsFocused();
  const application = useContext(CONTEXT_APP);

  // useEffect(() => {
  //   console.log("horee", isFocused)
  //   if (isFocused) {
  //     console.log(application.isAuthenticated)
  //   }
  // }, [isFocused, application.isAuthenticated])

  return (
    <>
      {application.isAuthenticated ? child : (<ScreenAuthSignIn />)}
    </>
  )
}


export default WidgetCommonAuth;

