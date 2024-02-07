/*
const KEY = `d6b639f2`;
export function useMovieDetails(selectedId) {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  useEffect(
    function () {
      async function getMovieDetails() {
        setLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );
  return { movie, loading };
}

*/
