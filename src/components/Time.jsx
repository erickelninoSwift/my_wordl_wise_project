import React from "react";
import styles from "./CityItem.module.css";
export const Time = ({ currentTime }) => {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));
  return <time className={styles.date}>({formatDate(currentTime)})</time>;
};
