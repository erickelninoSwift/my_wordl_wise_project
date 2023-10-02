import React from "react";
import { PageNavigation } from "../components/PageNavigation";
import { AppNav } from "../components/AppNav";
export const Applayout = () => {
  return (
    <div>
      <PageNavigation />
      <AppNav />
      <h1>App</h1>
    </div>
  );
};
