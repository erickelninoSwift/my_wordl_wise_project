import React from "react";
import styles from "./CityItem.module.css";
import { Time } from "./Time";
import { Link } from "react-router-dom";
import { useCities } from "../context/CitiesContext";

export const CityItem = ({ myCity }) => {
  const { cityName, emoji, date, position, id } = myCity;
  const { lat, lng } = position;
  const { currentCity } = useCities();

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id && styles["cityItem--active"]
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <Time currentTime={date} />
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};
