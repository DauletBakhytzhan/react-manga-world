import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <NavLink to="/" exact className={styles.navbar__item}>
        <div className={styles.navbar__text}>Home</div>
      </NavLink>
      <NavLink to="/manga/trend" exact className={styles.navbar__item}>
        <div className={styles.navbar__text}>Top manga</div>
      </NavLink>
      <NavLink to="/manga/?page=0" exact className={styles.navbar__item}>
        <div className={styles.navbar__text}>Manga</div>
      </NavLink>
      <NavLink to="/404" exact className={styles.navbar__item}>
        <div className={styles.navbar__text}>Error Page</div>
      </NavLink>
    </div>
  );
};

export default NavBar;
