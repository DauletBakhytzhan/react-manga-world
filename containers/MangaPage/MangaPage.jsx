import { useState, useEffect } from "react";
import { getApiResource } from "../../utils/network";
import { ApiMangaTrending } from "../../constants/api";
import { getMangaId } from '../../services/getMangaData';
import  MangaList  from '../../components/MangaPage/MangaList'
// import MangaList from "../../components/MangaPage/MangaList";
// import { useQueryParams } from "../../hooks/useQueryParams";

import React from 'react';
import { SafeAreaView, View, Text, FlatList, Image} from "react-native";
const MangaPage = () => {

  const [manga, setManga] = useState(null);
  // const [prevMangaPage, setPrevMangaPage] = useState(null);
  // const [nextMangaPage, setNextMangaPage] = useState(null);

  // const query = useQueryParams();

  const queryPage = 0;
 
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
    getResource(ApiMangaTrending );
  }, [queryPage]);

  return <SafeAreaView>
    <MangaList manga={manga}> </MangaList>
  </SafeAreaView>;
};

export default MangaPage;
