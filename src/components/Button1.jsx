import React from "react";
import styles from "./Button1.module.css";

export const Button1 = ({ children, onClick, type }) => {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
};
