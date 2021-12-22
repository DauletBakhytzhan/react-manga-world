// import styles from './HomePage.module.css';
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from "react-native";
import { chapter } from "../../hooks/Mangadex";
import DropDownPicker from "react-native-dropdown-picker";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import { LANGUAGE, MANGADEX_GET, MANGADEX_MANGA } from "../../constants/api";
import { getApiResource } from "../../utils/network";
import { set } from "react-native-reanimated";
import OneChapter from "../../components/OneChapter";
import { RadioButton } from "react-native-paper";

// import ModalDropdown from 'react-native-modal-dropdown';

function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

const MangaOnePape = ({ route, navigation }) => {
  const [mangaInfo, setMangaInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("ru");
  const [chapters, setChapters] = useState([{ title: 0 }]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "russion", value: "ru" },
    { label: "english", value: "en" },
  ]);
  const [items2, setItems2] = useState([]);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [checked, setChecked] = useState(false);

  let mangaListMain = [];
  let loading = false;

  const [oneChapter, setOneChapter] = useState(null);

  const fetchMangaData = async (url) => {
    console.log(url);
    const res = await getApiResource(url);
    console.log("1");
    const mangaList = res.data.map((element) => {
      console.log("2");

      // const mangaId = getMangaId(element.links.self);
      return {
        id: element.id,
      };
    });
    console.log("3");

    console.log(mangaList[0].id);
    setMangaInfo(mangaList[0].id);
    console.log(mangaInfo);
    return mangaList[0].id;
  };

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

    loading = true;
    setChapters(mangaListMain);
    let dict = [];
    for (let index = 0; index < mangaListMain.length; index++) {
      dict.push({
        label:
          "chapter:" +
          mangaListMain[index].chapter +
          ". " +
          mangaListMain[index].title,
        value: mangaListMain[index].id,
      });
    }

    setItems2(dict);
    setIsLoading(true);

    return mangaListMain;
  };

  useEffect(() => {
    const url = MANGADEX_GET + route.params.name;
    const fetchdata = async () => {
      // setIsLoading(true);
      try {
        let id = await fetchMangaData(url);
        const chapterUrl =
          MANGADEX_MANGA + id + "/feed?" + LANGUAGE + language + "&limit=500";
        fetchChaptersData(chapterUrl);
        console.log(listManga);
      } catch (e) {}
      setIsLoading(false);
      setChecked(false);
    };
    fetchdata();
  }, [language, route.params.name, loading, setOneChapter]);

  const styles = StyleSheet.create({
    wrapper: {
      
    },
    ButtonPage: {
      // paddingLeft: 50,
      backgroundColor: '#363130',
      flexDirection: "row",
      flexWrap: "wrap",
      padding: 10,
    },
    button: {
      width: "50%",
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
    },
  });
  return (
    <SafeAreaView>
      {/* <View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={(value) => {
            setLanguage(value);
            console.log(language);
          }}
        />
      </View> */}

<View style="">
            {checked ? (
               <View style={styles.ButtonPage}>
               <Pressable
                 style={styles.button}
                 onPress={() => {
                   setOneChapter(chapters[chapters.indexOf(oneChapter) - 1]);
                   setValue2(chapters[chapters.indexOf(oneChapter) - 1].id);
                   navigation.setOptions({ title: chapters[chapters.indexOf(oneChapter) - 1].chapter + ". " + chapters[chapters.indexOf(oneChapter) - 1].title })
                 }}
               >
                 <Text style={styles.text}>Prev</Text>
               </Pressable>
 
               <Pressable
                 style={styles.button}
                 onPress={() => {
                   setOneChapter(chapters[chapters.indexOf(oneChapter) + 1]);
                   setValue2(chapters[chapters.indexOf(oneChapter) + 1].id);
                   navigation.setOptions({ title: chapters[chapters.indexOf(oneChapter) + 1].chapter+ ". " + chapters[chapters.indexOf(oneChapter) + 1].title} )
                 }}
               >
                 <Text style={styles.text}>Next</Text>
               </Pressable>
             </View>
            ) : (
              <View/>
            )}
           
          </View>
      {isLoading ? (
        <View >
          <View>
            {checked ? (
              <OneChapter
                chapter={oneChapter}
                loading={false}
                rerender={true}
              />
            ) : (
              <View/>
            )}
          </View>
          <View>
            <RadioButton.Group
              onValueChange={(value) => setLanguage(value)}
              value={value}
            >
              <RadioButton.Item label="RU" value="ru" />
              <RadioButton.Item label="EN" value="en" />
            </RadioButton.Group>
          </View>

          
          <DropDownPicker
            style={{
              paddingTop: 50,
            }}
            open={open2}
            value={value2}
            items={items2}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setItems2}
            onChangeValue={(value) => {
              console.log(chapters.find((x) => x.id === value));
              setOneChapter(chapters.find((x) => x.id === value));
              setChecked(true);
              navigation.setOptions({ title: chapters.find((x) => x.id === value).chapter + ". " + chapters.find((x) => x.id === value).title })
            }}
          />
        </View>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </SafeAreaView>
  );
};

export default MangaOnePape;
