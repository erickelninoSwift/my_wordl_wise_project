import React from "react";

import { Sidebar } from "../components/Sidebar";
import styles from "./Applayout.module.css";
import { Map } from "../components/Map";
export const Applayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};
