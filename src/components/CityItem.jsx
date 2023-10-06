import React from "react";
import styles from "./CityItem.module.css";
import { Time } from "./Time";
import { Link } from "react-router-dom";

export const CityItem = ({ myCity }) => {
  const { cityName, country, emoji, date, notes, position, id } = myCity;

  return (
    <li>
      <Link
        className={styles.cityItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <Time currentTime={date} />
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};
