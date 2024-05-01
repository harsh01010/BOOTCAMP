import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (cities?.length == 0) return <Message message={"please add cities"} />;
  const countrySet = new Set();
  const countries = cities.filter((city) => {
    if (!countrySet.has(city.country)) {
      countrySet.add(city.country);
      return true;
    }
    return false;
  });
  return (
    <ul className={styles.countryList}>
      {countries?.map((city) => (
        <CountryItem country={city} />
      ))}
    </ul>
  );
}

export default CountryList;
