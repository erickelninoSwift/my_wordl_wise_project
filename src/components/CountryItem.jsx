import styles from "./CountryItem.module.css";

function CountryItem({ myCountry }) {
  const { country, emoji } = myCountry;
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}

export default CountryItem;
