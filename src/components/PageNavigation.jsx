import React from "react";
import { NavLink } from "react-router-dom";
import style from "./PageNavigation.module.css";

export const PageNavigation = () => {
  return (
    <nav className={style.nav}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/Products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/Pricing">Pricing</NavLink>
        </li>
      </ul>
    </nav>
  );
};
