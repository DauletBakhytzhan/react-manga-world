import { useState, useEffect } from "react";
import { getApiResource } from "../../utils/network";
import { ApiManga } from "../../constants/api";
import { getMangaId } from "../../services/getMangaData";
import MangaList from "../../components/MangaPage/MangaList";

import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
// import MangaList from "../../components/MangaPage/MangaList";
// import { useQueryParams } from "../../hooks/useQueryParams";

import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  Button,
  StyleSheet,
} from "react-native";

const MangaAllPage = (page) => {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(true);

  const showMenu = () => setVisible(false);

  const [manga, setManga] = useState(null);
  // const [prevMangaPage, setPrevMangaPage] = useState(null);
  // const [nextMangaPage, setNextMangaPage] = useState(null);

  // const query = useQueryParams();
  const [queryPage, setQueryPage] = useState(0);
  // let queryPage = page.page;

  const getResource = async (url) => {
    const res = await getApiResource(url);
    const mangaList = res.data.map((element) => {
      // const mangaId = getMangaId(element.links.self);
      return {
        id: element.id,
        name: element.attributes.canonicalTitle,
        url: element.links.self,
        image: element.attributes.posterImage.small,
        rating: element.attributes.averageRating,
        startDate: element.attributes.startDate,
        status: element.attributes.status,
        description: element.attributes.description,
        popularityRank: element.attributes.popularityRank,
        subtype: element.attributes.subtype,
        
      };
    });
    

    setManga(mangaList);
  };

  useEffect(() => {
    getResource(ApiManga + queryPage);
  }, [queryPage]);

  return (
    <SafeAreaView>
      <View style={styles.ButtonPage}>
        <Button
          title="First page"
          onPress={() => {
            setQueryPage(0);
          }}
        />
        <Button
          title="Prev"
          onPress={() => {
            setQueryPage(queryPage - 10);
          }}
        />
        <Button
          title="Next"
          onPress={() => {
            setQueryPage(queryPage + 10);
          }}
        />

        <MenuContext>
          <View>
            <Menu>
              <MenuTrigger text="SORTING" />

              <MenuOptions>
                <MenuOption onSelect={() => alert(`by name`)} text="by name" />
                <MenuOption
                  onSelect={() => alert(`release date`)}
                  text="release date"
                />
              </MenuOptions>
            </Menu>
          </View>
        </MenuContext>
      </View>

      <MangaList manga={manga} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ButtonPage: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
});

export default MangaAllPage;
