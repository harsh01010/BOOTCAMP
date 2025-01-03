import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  //we can also update the query string using setSearchParams(also in url)
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>MAP</h1>
      {lat && lng && (
        <h1>
          Position: {lat},{lng}
        </h1>
      )}
    </div>
  );
}

export default Map;
