import React from "react";
import styles from "./Button1.module.css";
import { useNavigate } from "react-router-dom";

export const Backbutton = ({ type }) => {
  const navigation = useNavigate();
  const backButton = (e) => {
    e.preventDefault();
    navigation(-1);
  };
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={backButton}>
      {" "}
      Return{" "}
    </button>
  );
};
