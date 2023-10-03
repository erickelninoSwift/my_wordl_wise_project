import React from "react";
import { NavLink } from "react-router-dom";
import style from "./PageNavigation.module.css";
import { Logo } from "../components/Logo";

export const PageNavigation = () => {
  return (
    <nav className={style.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/Product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/Pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/Login" className={style.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
