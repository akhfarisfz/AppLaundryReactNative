import 'react-native-gesture-handler';

import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from "react-native";
import ListBelanja from "./components/ListBelanja";
import FormSignIn from "./components/FormSignIn";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenHome from './screens/ScreenHome';
import ScreenAbout from './screens/ScreenAbout';
import { CONTEXT_APP } from './settings';
import ScreenAuthSignIn from './screens/auth/ScreenAuthSignIn';
import ScreenBarangList from './screens/barang/ScreenBarangList';
import ScreenBarangCreate from './screens/barang/ScreenBarangCreate';
import ScreenBarangDetail from './screens/barang/ScreenBarangDetail';
import ScreenMain from './screens/main/ScreenMain';
import ScreenTerimaList from './screens/terima/ScreenTerimaList';
import ScreenTerimaCreate from './screens/terima/SreenTerimaCreate';
import ScreenTerimaDetail from './screens/terima/ScreenTerimaDetail';
import ScreenKasList from './screens/kas/ScreenKasList';
import ScreenKasDetail from './screens/kas/ScreenKasDetail';



const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <CONTEXT_APP.Provider value={{isAuthenticated, setIsAuthenticated}}>
      
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name='ScreenMain'
            component={ScreenMain}
            options={{ title: "Main", headerShown: false }}
          />
          <Stack.Screen 
            name='ScreenBarangList'
            component={ScreenBarangList}
            options={{ headerShown: false }}
          />

          <Stack.Screen 
            name='ScreenBarangCreate'
            component={ScreenBarangCreate}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name='ScreenBarangDetail'
            component={ScreenBarangDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name='ScreenTerimaList'
            component={ScreenTerimaList}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name='ScreenTerimaCreate'
            component={ScreenTerimaCreate}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name='ScreenKasList'
            component={ScreenKasList}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name='ScreenKasDetail'
            component={ScreenKasDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name='ScreenTerimaDetail'
            component={ScreenTerimaDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ScreenAbout" component={ScreenAbout} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style='dark' hidden={true} />
    </CONTEXT_APP.Provider>
  );
};

// mobile RN
// jika direction = vertical
// maka justify content = vertical (sumbu y)
// dan maka align items = horizontal (sumbu x)

// web
// jika direction = horizontal
// maka justify content = horizontal (sumbu x)
// dan maka align items = vertikal (sumbu y)
export default App;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    height: "100%"
  },
  textHeading1: {
    fontSize: 20,
    color: "#000088",
  },

  btn: {
    border: 1,
    padding: 16,
    backgroundColor:'red',
  },

  btnText: {
    color: 'white'
  }
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
});

