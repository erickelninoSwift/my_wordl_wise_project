import React, { useEffect, useState } from "react";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import { Message } from "./Message";
import { v4 as uuidv4 } from "uuid";

export const CountryList = ({ allCities, loading }) => {
  const [countries, setCountries] = useState([]);

  const allCountries = allCities.reduce((acc, currentCity) => {
    return !acc.map((data) => data.country).includes(currentCity.country)
      ? [...acc, { country: currentCity.country, emoji: currentCity.emoji }]
      : acc;
  }, []);
  console.log(allCountries);
  return (
    <>
      {loading && <Spinner />}
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
