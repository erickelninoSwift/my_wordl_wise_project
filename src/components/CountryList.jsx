import React, { useEffect, useState } from "react";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import { Message } from "./Message";
import { v4 as uuidv4 } from "uuid";
import { useCities } from "../context/CitiesContext";

export const CountryList = () => {
  const { allMyCities, isloading } = useCities();

  const allCountries = allMyCities.reduce((acc, currentCity) => {
    return !acc.map((data) => data.country).includes(currentCity.country)
      ? [...acc, { country: currentCity.country, emoji: currentCity.emoji }]
      : acc;
  }, []);

  return (
    <>
      {isloading && <Spinner />}
      {allCountries.length > 0 ? (
        <ul className={styles.countryList}>
          {allCountries.map((countries) => {
            const id = uuidv4();
            return <CountryItem key={id} myCountry={countries} />;
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
