import React from "react";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import { CityItem } from "./CityItem";
import { Message } from "./Message";
import { v4 as uuidv4 } from "uuid";

export const CityList = ({ allCities, loading }) => {
  return (
    <>
      {loading && <Spinner />}
      {allCities.length > 0 ? (
        <ul className={styles.cityList}>
          {allCities.map((city) => {
            const id = uuidv4();
            return <CityItem key={id} myCity={city} />;
          })}
        </ul>
      ) : (
        <Message
          message={
            "There is no city selected yet Please Select cities from the Map"
          }
        />
      )}
    </>
  );
};
