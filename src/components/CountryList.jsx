import Spinner from "./Spinner"; 
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";

function CountryList({ cities, isLoading }) {
  // Show a spinner while loading
  if (isLoading) return <Spinner />;

  // If no cities, show a message
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  // Reduce cities to a unique list of countries
  const countries = cities.reduce((arr, city) => {
    if (!arr.some((el) => el.country === city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    return arr;
  }, []);

  // Render country list
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
