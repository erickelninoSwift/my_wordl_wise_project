import { useParams } from "react-router-dom";
import styles from "./City.module.css";

import { useEffect } from "react";
import { useCities } from "../context/CitiesContext";
import Spinner from "./Spinner";
import { Button1 } from "./Button1";
import { Backbutton } from "./Backbutton";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export function City() {
  const { id } = useParams();
  const { getCurrentCity, currentCity, isloading } = useCities();

  useEffect(() => {
    getCurrentCity(id);
  }, [id]);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const lat = searchParams.get("lat");
  // const long = searchParams.get("lng");

  // TEMP DATA

  const { cityName, emoji, date, notes } = currentCity;
  if (isloading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia
        </a>
      </div>

      <div>
        <Backbutton type={"back"} />
      </div>
    </div>
  );
}
