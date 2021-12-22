import styles from "./MangaNavigation.module.css";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types';

const MangaNavigation = (counterPage) => {
  const nextPage = counterPage.counterPage + 1;
  const prevPage = counterPage.counterPage - 1;

  // const handleClickNext
  return (
    <div className={styles.wrapper}>
      <Link to={"/manga/?page=" + prevPage}>
        <button className={styles.effect04, styles.btn} disabled={prevPage < 0}>
          prev
        </button>
      </Link>
      <Link to={"/manga/?page=" + nextPage}>
        <button className={styles.effect04, styles.btn}>next</button>
      </Link>
    </div>
  );
};

// MangaNavigation.propTypes = {
// counterPage: PropTypes.number,
// }

export default MangaNavigation;
