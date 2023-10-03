import React from "react";
import styles from "./Sidebar.module.css";
import { AppNav } from "./AppNav";
import { Logo } from "./Logo";
import { Footer } from "./Footer";
import { PageNavigation } from "./PageNavigation";
import { Outlet } from "react-router-dom";
export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
};
