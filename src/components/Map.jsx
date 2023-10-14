import React from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const long = searchParams.get("lng");
  const navigation = useNavigate();
  console.log(lat);

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        return navigation("Form");
      }}
    >
      <h1>Map</h1>
      <h3>Position : </h3>
      <h5>
        lat : {lat} & long : {long}
      </h5>
      <button
        onClick={() => {
          setSearchParams(() => {
            return { lat: 45, lng: 150 };
          });
        }}
      >
        Change position
      </button>
    </div>
  );
};
