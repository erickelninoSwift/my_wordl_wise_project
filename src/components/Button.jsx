import React from "react";
import styles from "./Button.module.css";

export const Button = ({ onclick }) => {
  return (
    <button className={`${styles.btn} ${styles.primary}`} onClick={onclick}>
      Login
    </button>
  );
};
