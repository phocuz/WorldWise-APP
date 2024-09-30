import Spinner from "./Spinner"; 
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "../components/Message"
import { useCity } from "../context/CityContext";

function CityList() {
  const {cities,isLoading} = useCity();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  // Render city list
  return (
    <ul className={styles.cityList}> 
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
