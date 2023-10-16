// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { Button1 } from "./Button1";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL_LOCATION =
  "https://api.bigdatacloud.net/data/reverse-geocode-client?";
function Form() {
  const [cityName, setCityName] = useState("");

  // const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const { cityLocation } = useUrlPosition();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const navigation = useNavigate();

  const clickbutton = (e) => {
    e.preventDefault();
    console.log("we good homie");
  };

  const backButton = (e) => {
    e.preventDefault();
    navigation(-2);
  };

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setIsLoadingLocation(true);
        const response = await fetch(
          `${BASE_URL_LOCATION}latitude=${cityLocation[0]}&longitude=${cityLocation[1]}`
        );
        const data = await response.json();
        setCityName(data.city || data.locality || "");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingLocation(false);
      }
    };
    fetchCityData();
  }, [cityLocation]);
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button1 onClick={clickbutton} type={"primary"}>
          Add
        </Button1>
        <Button1 onClick={backButton} type={"back"}>
          &larr; Back
        </Button1>
      </div>
    </form>
  );
}

export default Form;
