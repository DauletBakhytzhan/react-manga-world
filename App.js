import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./containers/HomePage";
import MangaPage from "./containers/MangaPage";
import MangaAllPage from "./containers/MangaAllPage";
import Settings from "./containers/Settings";
import Profile from "./containers/Profile";
import MangaOnePape from "./containers/MangaOnePage/MangaOnePape";
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MangaDis from "./containers/MangaDis/MangaDis";
import { useState, useEffect } from "react";
import { userAuth } from "./hooks/userAuth";
import { Button } from "react-native-paper";
import { login, singUp } from "./hooks/Firebase";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const { isLoggedIn } = userAuth();
  const [user, setUser] = useState({});
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const loginText = "Login"
  const singUpText = "SingUp"

  useEffect(() => {}, []);

  return (
    <View>
      {isLoggedIn ? (
        <View>
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName="Top 10"
              screenOptions={{
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: "#363130" },
              }}
            >
              <Drawer.Screen name="Home" component={HomePage} />
              <Drawer.Screen name="Top 10" component={MangaPage} />
              <Drawer.Screen name="All manga" component={MangaAllPage} />
              <Drawer.Screen name="Authorization" component={Profile} />
              <Drawer.Screen name="Settings" component={Settings} />
              <Stack.Screen name=" " component={MangaOnePape} />
              <Stack.Screen name="  " component={MangaDis} />
            </Drawer.Navigator>
          </NavigationContainer>
        </View>
      ) : (
        <View style={styles.wrapper}>
          <TextInput style={styles.input} value={email} defaultValue={"Login"} onChangeText={setEmail}/>
          <TextInput style={styles.input}
defaultValue={"Password"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <View style={styles.buttons}>
          <Button onPress={async()=>await singUp(email, password)
          }> <Text >
                    {singUpText}

          
        </Text>  </Button>
          <Button onPress={async()=>await login(email, password)}><Text >
          {loginText}
        </Text> </Button>
        </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input:{
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    borderColor: '#2d2e30',
    borderWidth: 2,
    color: '#2d2e30',
    borderRadius: 9,
  },
  wrapper: {
    paddingTop: 250,
  }
});
