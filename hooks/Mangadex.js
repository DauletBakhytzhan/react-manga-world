import { useEffect, useState } from "react";
import { LANGUAGE, MANGADEX_GET, MANGADEX_MANGA } from "../constants/api";
import { getApiResource } from "../utils/network";

function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

export const chapter = (title, language) => {
  const [mangaInfo, setMangaInfo] = useState(false);
  const [chapters, setChapters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMangaData = async (url) => {
    console.log(url);
    const res = await getApiResource(url);
    const mangaList = res.data.map((element) => {
      // const mangaId = getMangaId(element.links.self);
      return {
        id: element.id,
      };
    });

    console.log(mangaList[0].id);
    setMangaInfo(mangaList[0].id);
    return mangaList[0].id;
  };
  const fetchChaptersData = async (url) => {
    const mainUrl = url;
    let mangaList = [];
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
      Array.prototype.push.apply(mangaList, mangaList2);
      if (res.offset >= res.total) {
        break;
      } else {
        offset = offset + 500;
        url = mainUrl + "&offset=" + offset;
      }
    }

    mangaList = sortByKey(mangaList, "chapter");
    
    console.log(mangaList);
    return mangaList;
  };

  function useEffectif(id, fn) {
    console.log(mangaInfo);
    const chapterUrl =
      MANGADEX_MANGA +
      id +
      "/feed?" +
      LANGUAGE +
      language +
      "&limit=500";
    var a = async () => {
      await fetchChaptersData(chapterUrl);
    };
    // debugger;
    // setMangaInfo(false)
    setChapters(a);
    console.log(chapters);
  }

  useEffect(() => {
    const url = MANGADEX_GET + title;
    const fetchdata = async () => {
      setIsLoading(true);
      try {
        let id = await fetchMangaData(url);
        useEffectif(id, true);
      } catch (e) {
        setError("Could not fetch chapters data from MangaDex API");
      }
      setIsLoading(false);
    };
    fetchdata();
  }, [title, language]);
  // console.log('finish')
  console.log(chapters)
};
