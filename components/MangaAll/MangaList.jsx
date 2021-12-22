// import styles from "./index";
import React from "react";

import { Text, Image, FlatList, View, StyleSheet } from "react-native";
const MangaList = ({ manga }) => {
  function ratingTemp(rating) {
    if (rating == null) {
      return "0.00";
    } else {
      return rating;
    }
  }
  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      padding: 10,
    },
    container: {
      // backgroundColor: '#cfc9c9',
      
    },
    tinyLogo: {
      width: 100,
      height: 150,
    },
    logo: {
      width: 66,
      height: 58,
    },
    topManga: {
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: 30,
      fontWeight: "bold"
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.topManga}>Top popular manga</Text>
      <FlatList
        data={manga}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.image,
              }}
            />
            <View>
              <Text> {item.name} </Text>
              <Text> status: { item.status} </Text>
              <Text> rating: {item.rating} </Text>

            </View>
          </View>
        )}
      >
        {" "}
      </FlatList>
    </View>
  );
};

export default MangaList;

// const styles = StyleSheet.create({
// })
