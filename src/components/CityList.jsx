import React from "react";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import { CityItem } from "./CityItem";
import { Message } from "./Message";
import { v4 as uuidv4 } from "uuid";
import { useCities } from "../context/CitiesContext";

export const CityList = () => {
  const { allMyCities, isloading } = useCities();
  return (
    <>
      {isloading && <Spinner />}
      {allMyCities.length > 0 ? (
        <ul className={styles.cityList}>
          {allMyCities.map((city) => {
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
