import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
function CityList({ cities, isLoading }) {
  return (
    <ul className={styles.cityList}>
      {cities?.map((city) => (
        <CityItem city={city} />
      ))}
    </ul>
  );
}

export default CityList;
