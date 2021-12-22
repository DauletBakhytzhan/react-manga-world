import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import OneChapter from "../../components/OneChapter";
import { useEffect, useState } from "react";

const MangaDis = ({ route, navigation }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#363130",
    },
    itemText: {
      fontSize: 14,
      paddingLeft: 10,
      fontWeight: "bold",
    },
    tinyLogo: {
      // flex: 1,
      paddingTop: 150,
      width: 150,
      height: 250,
    },
    logo: {
      width: 66,
      height: 58,
    },
    topManga: {
      paddingLeft: 10,

      paddingTop: 50,
    },
    item: {
      paddingTop: 60,
      paddingLeft: 50,
      fontSize: 18,
      height: 44,
    },

    wrapper: {
      padding: 20,
      flexDirection: "row",
    },
    description: {
      // marginLeft:10,
    },
    button: {
      color: "#fff",
      textDecorationColor: "#fff",
    },
  });

  useEffect(() => {
    console.log(route.params);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={styles.wrapper}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: route.params.image,
            }}
          />
          <View>
            <Text style={styles.itemText}>Status: {route.params.status}</Text>
            <Text style={styles.itemText}>
              Start date: {route.params.startDate}
            </Text>
            <Text style={styles.itemText}>Rating: {route.params.rating}</Text>
            <Text style={styles.itemText}>
              popularity rank: {route.params.popularityRank}
            </Text>
            <Text style={styles.itemText}>Subtype: {route.params.subtype}</Text>
          </View>
        </View>
        <View></View>
        <View>
          <Button
            title="Chapters"
            style={styles.button}
            color="#841584"
            onPress={() => navigation.navigate(" ", route.params)}
          />
        </View>

        <Text style={styles.description}>{route.params.description.substr(0, route.params.description.length - 20)}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MangaDis;
