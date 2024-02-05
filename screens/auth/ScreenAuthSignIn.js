import { StyleSheet, View } from "react-native";
import { Appbar, TextInput, Button } from "react-native-paper";
import useJWT from "../../hooks/useJWT";
import useHTTP from "../../hooks/useHTTP";
import { useContext, useState } from "react";
import { BASE_URL, CONTEXT_APP } from "../../settings";
import useMessage from "../../hooks/useMessage";
import useValidator from "../../hooks/useValidator";
import WidgetCommonValidator from "../../widgets/commons/WidgetCommonValidator";

const ScreenAuthSignIn = ({navigation, route}) => {
  const application = useContext(CONTEXT_APP)
  const jwt = useJWT()
  const http = useHTTP()
  const message = useMessage();

  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const userValidator = useValidator({
    email: [],
    password: []
  })

  const handleChangeUser = (text, field) => {
    setUser({...user, [field]: text})
  }

  const signIn = () => {
    userValidator.reset()

    const url = `${BASE_URL}/users/signin/`
    http.publicHTTP.post(url, user).then((response) => {
      console.log(response.data);
      jwt.set(response.data.token)
      message.success(response)
      application.setIsAuthenticated(true)
      navigation.navigate("ScreenBarangList")
    }).catch((error) => {
      message.error(error)
      userValidator.except(error);
      console.log(error);
    })
  }

  return (
    <>
      <View>
        <View style={styles.container}>  
          <View style={styles.wrapperControl}>
            <TextInput
              label="Email"
              autoCapitalize="none"
              value={user.email}
              onChangeText={text => handleChangeUser(text, "email")}
            />
            <WidgetCommonValidator messages={userValidator.get('email')} />
          </View>
          <View style={styles.wrapperControl}>
            <TextInput
              label="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              value={user.password}
              onChangeText={text => handleChangeUser(text, "password")}
            />
            <WidgetCommonValidator messages={userValidator.get('password')} />
          </View>

          <View style={styles.wrapperControl}>
            <Button icon="account-lock-open-outline" mode="contained" onPress={signIn}>
              Sign In
            </Button>
          </View>
        </View>
      </View>
      
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "90%",
    width: "100%",
    gap: 32,
    paddingHorizontal: 24
  },
  wrapperControl: {
    width: "100%"
  }
})

export default ScreenAuthSignIn;