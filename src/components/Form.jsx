// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { Button1 } from "./Button1";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { Message } from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import { useCities } from "../context/CitiesContext";

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
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const { cityLocation } = useUrlPosition();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [myEmoji, setMyEmoji] = useState("");
  const navigation = useNavigate();
  const [geoCodingError, setGeoCodingError] = useState("");
  const { createCity, isloading } = useCities();
  const naviation = useNavigate();

  const clickbutton = (e) => {
    e.preventDefault();
    console.log("we good homie");
  };

  const backButton = (e) => {
    e.preventDefault();
    navigation(-2);
  };

  const handleSubmitbutton = async (e) => {
    e.preventDefault();
    if (!cityName && !startDate) return;
    const currentID = uuidv4();
    const newCity = {
      cityName: cityName,
      country: country,
      emoji: myEmoji,
      date: startDate,
      notes: notes,
      position: { lat: cityLocation[0], lng: cityLocation[1] },
      id: currentID,
    };

    console.log(newCity);
    await createCity(newCity);
    naviation("/App/cities");
  };
  useEffect(() => {
    if (cityLocation.length === 0) return;
    const fetchCityData = async () => {
      try {
        setCityName("");
        setGeoCodingError("");
        setIsLoadingLocation(true);
        const response = await fetch(
          `${BASE_URL_LOCATION}latitude=${cityLocation[0]}&longitude=${cityLocation[1]}`
        );
        const data = await response.json();

        if (!data.countryCode || !data.countryName || !data.city)
          throw new Error(
            "This does not seem to be a city pleae click on the right one"
          );

        setCityName(data.city || data.locality);
        setCountry(data.countryName);
        setMyEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingLocation(false);
      }
    };
    fetchCityData();
  }, [cityLocation[0], cityLocation[1]]);

  return (
    <>
      {isLoadingLocation && <Spinner />}
      {geoCodingError ? (
        <Message message={geoCodingError} />
      ) : (
        !isLoadingLocation && (
          <form
            className={`${styles.form} ${isloading && styles.loading}`}
            onSubmit={handleSubmitbutton}
          >
            <div className={styles.row}>
              <label htmlFor="cityName">City name</label>
              <input
                id="cityName"
                onChange={(e) => setCityName(e.target.value)}
                value={cityName}
              />
              <span className={styles.flag}>{myEmoji}</span>
            </div>

            <div className={styles.row}>
              <label htmlFor="date">When did you go to {cityName}?</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat={"dd/MM/yyyy"}
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
              <Button1 type={"primary"}>Add</Button1>
              <Button1 onClick={backButton} type={"back"}>
                &larr; Back
              </Button1>
            </div>
          </form>
        )
      )}
    </>
  );
}

export default Form;
