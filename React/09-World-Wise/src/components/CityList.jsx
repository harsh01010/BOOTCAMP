import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (cities?.length == 0) return <Message message={"please add cities"} />;
  return (
    <ul className={styles.cityList}>
      {cities?.map((city) => (
        <CityItem city={city} />
      ))}
    </ul>
  );
}

export default CityList;