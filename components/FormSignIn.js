import { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { BASE_URL } from "../settings";
import useJWT from "../hooks/useJWT";
import useHTTP from "../hooks/useHTTP";

const FormSignIn = () => {
  const jwt = useJWT()
  const http = useHTTP()

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleChangeUser = (text, field) => {
    setUser({...user, [field]: text})
  }

  const signIn = () => {
    console.log(user)
    const url = `${BASE_URL}/users/signin/`
    http.publicHTTP.post(url, user).then((response) => {
      console.log(response.data);
      jwt.set(response.data.token)
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.signinWrapper}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Username</Text>
          <TextInput 
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor={"#ced4da"}
            style={styles.input}
            onChangeText={(text) => handleChangeUser(text, "email")}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Password</Text>
          <TextInput 
            placeholder="Password"
            autoCapitalize="none"
            placeholderTextColor={"#ced4da"}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(text) => handleChangeUser(text, "password")}
          />
        </View>

        <View style={styles.formControl}>
          <TouchableOpacity onPress={signIn}>
            <Text style={styles.btn}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#001524"
  },
  signinWrapper: {
    width: "70%"
  },
  formControl: {
    paddingVertical: 4
  },
  label: {
    marginVertical: 10,
    color: '#ffecd1'
  },
  input: {
    backgroundColor: "#15616d",
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 15,
    borderRadius: 5,
    color: "#ffecd1"
  },
  btn: {
    textAlign: "center",
    width: "100%",
    backgroundColor: "#ff7f00",
    paddingVertical: 16,
    fontWeight: "bold",
    color: "#001524",
    marginVertical: 10,
    borderRadius: 10,
  }

})

export default FormSignIn