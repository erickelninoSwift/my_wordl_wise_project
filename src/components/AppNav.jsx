import React from "react";
import { nav } from "./AppNav.module.css";
import { Link, Outlet } from "react-router-dom";

export const AppNav = () => {
  return (
    <nav className={nav}>
      <ul>
        <li>
          <Link to="cities">Cities</Link>
        </li>
        <li>
          <Link to="countries">Countries</Link>
        </li>
      </ul>
    </nav>
  );
};
