import React from "react";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()}
        {"   "}
        <span style={{ color: "white" }}>by Erick Elnino</span>
      </p>{" "}
    </footer>
  );
};
