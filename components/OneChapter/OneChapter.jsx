// import styles from "./index";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import {SafeAreaView, ScrollView, Text, Image, FlatList, View, StyleSheet, Button, ActivityIndicator } from "react-native";
const OneChapter = ({ chapter, loading, rerender }) => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [chapterData, setChapterData] = useState(null);
  const fetchChaptersData = async (url) => {
    const mainUrl = url;

    let offset = 0;
    while (true) {
      const res = await getApiResource(url);
      console.log(url);
      let mangaList2 = res.data.map((element) => {
        // const mangaId = getMangaId(element.links.self);
        return {
          id: element.id,
          chapter: Number(element.attributes.chapter),
          title: element.attributes.title,
          hash: element.attributes.hash,
          data: element.attributes.data,
        };
      });
      Array.prototype.push.apply(mangaListMain, mangaList2);
      if (res.offset >= res.total) {
        break;
      } else {
        offset = offset + 500;
        url = mainUrl + "&offset=" + offset;
      }
    }

    mangaListMain = sortByKey(mangaListMain, "chapter");

    console.log(mangaListMain);
  };

  function rerenderChapter() {
    setLoading(false);
    setChapterData(null);
  } 

  useEffect(() => {
    if(rerender){
      rerenderChapter()
    }
    if (chapter != null) {
      console.log(chapter.data);
      var list = [];
      for (let index = 0; index < chapter.length; index++) {
        list.push(chapter[index].data);
      }
      setChapterData(list);
      setLoading(true);
      
      console.log(chapterData);
    }
    return () => {
      setLoading(false)
      setChapterData(null)
    }
  }, [chapter, loading]);
  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      padding: 10,
    },
    container: {
      backgroundColor: '#363130',
    },
    tinyLogo: {
      paddingTop: 150,
      width: 350,
      height: 550,
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
  });

  return (
    <SafeAreaView >
    <View >
      {isLoading ? (
        <FlatList style={styles.container}
          data={chapter.data}
          renderItem={
            ({ item }) => (
              <View style={styles.topManga}>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri:
                      "https://uploads.mangadex.org/data/" +
                      chapter.hash +
                      "/" +
                      item,
                  }}
                />
                <View style={styles.item}></View>
              </View>
            )
            // <Text  style={styles.item}>{item}</Text>
          }
        />
      ) : (
        <ActivityIndicator size="large" />

      )}
    </View>
    
    </SafeAreaView>

  );
};

export default OneChapter;

// const styles = StyleSheet.create({
// })
