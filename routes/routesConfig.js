import MangaPage from "../containers/MangaPage";
import HomePage from "../containers/HomePage";
import ErrorPage from "../containers/ErrorPage";
import MangaPageTrending from "../containers/MangaPageTrending";
// import { ApiManga } from "../../constants/api";

const routerConfig = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "/manga",
    exact: true,
    component: MangaPage,
  },
  {
    path: "/manga/trend",
    exact: true,
    component: MangaPageTrending,
  },
  {
    path: "*",
    exact: false,
    component: ErrorPage,
  },
];

export default routerConfig;
