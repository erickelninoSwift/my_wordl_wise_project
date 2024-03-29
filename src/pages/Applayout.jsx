import React from "react";

import { Sidebar } from "../components/Sidebar";
import styles from "./Applayout.module.css";
import { Map } from "../components/Map";
import User from "../components/User";

export default function Applayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
