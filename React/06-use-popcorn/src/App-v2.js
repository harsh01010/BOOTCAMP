import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const KEY = `d6b639f2`;

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  /*
  useEffect(function () {
    const el = document.querySelector(".search");
    el.focus();
  }, []);
    above is not the react way of doing dom manipulation , we will use useRef hook
  */
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  const x = movies.length;
  return (
    <p className="num-results">
      Found <strong>{x}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box barInvis">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

function MovieList({ movies, handleClick }) {
  return (
    <ul className="list barInvis list-movies">
      {movies.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} handleClick={handleClick} />
      ))}
    </ul>
  );
}

function Movie({ movie, handleClick }) {
  return (
    <li onClick={() => handleClick(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedList({ watched, onDeleteWatched }) {
  return (
    <ul className="list barInvis">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
          <span onClick={() => onDeleteWatched(movie)}>❌</span>
        </p>
      </div>
    </li>
  );
}

function Loader() {
  return <div className="loader"></div>;
}

function Error({ children }) {
  return <p className="error">{children}</p>;
}

function SelectedMovie({ selectedId, onCloseMovie, watched, onAddWatched }) {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

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

  function callback(e) {
    if (e.code === "Escape") {
      onCloseMovie();
    }
  }

  useEffect(
    function () {
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );

  const present = watched.reduce(
    (acc, curr) => acc || curr.imdbID === movie.imdbID,
    false
  );
  console.log(present);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  function handleSetRating(rate) {
    setMovie({ ...movie, userRating: rate });
  }

  useEffect(
    function () {
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt="poster"></img>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released}&bull; {runtime}
              </p>
              <p>{genre}</p>

              <p>
                <span>⭐</span>
                {imdbRating}IMDB Rating
              </p>
              <AnimateBtn movie={movie} onAddWatched={onAddWatched}>
                {present ? "remove from watched" : "add to watched"}
              </AnimateBtn>
            </div>
          </header>
          <section>
            {!present ? (
              <div className="rating">
                <StarRating
                  maxRating={6}
                  size={24}
                  onSetRating={handleSetRating}
                ></StarRating>
              </div>
            ) : (
              <p> {"You rated this movie " + watchedUserRating}</p>
            )}
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
}

function AnimateBtn({ movie, onAddWatched, children }) {
  return (
    <div onClick={() => onAddWatched(movie)} className="animatebtndiv">
      <div className="animatebtn" href="#">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("Thor");
  //   const [watched, setWatched] = useState(
  //     JSON.parse(localStorage.getItem("watched"))
  //   ); avoid  this
  const [watched, setWatched] = useState(function () {
    const storedVal = localStorage.getItem("watched");
    return JSON.parse(storedVal);
  });
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    if (selectedId !== id) {
      setSelectedId(id);
    } else {
      handleCloseMovie();
    }
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    console.log("added");
    const present = watched.reduce(
      (acc, curr) => acc || curr.imdbID === movie.imdbID,
      false
    );
    if (!present) {
      setWatched((watched) => [...watched, movie]);
    } else {
      setWatched((watched) =>
        watched.filter((curr) => curr.imdbID !== movie.imdbID)
      );
    }

    handleCloseMovie();
  }
  function handleDeleteWatched(movie) {
    setWatched((watched) =>
      watched.filter((curr) => curr.imdbID != movie.imdbID)
    );
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
      console.log(typeof JSON.parse(localStorage.getItem("watched")));
    },
    [watched]
  );
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error("something went wrong with fetching movies");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("movie not found");
          }
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message ? err.message : "No Movies Found!");
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
      }
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {error !== "" ? (
            <Error>{error}</Error>
          ) : isLoading ? (
            <Loader />
          ) : (
            <MovieList handleClick={handleSelectMovie} movies={movies} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

/*
states are  updated asynchronously we cannot get the the value of state immediately after updaing it.
eg.:
const [aveRating,setAveRating] = useState(0)
function hadleAvg(){
    setAvgRating(Number(imdbRating));
    setAvgRating((aveRAting+userRating)/2); // this is put wrong value , becaue we cannot get the value of aveRating immediatly after updating , it it "stale state"
    it can solved by passing a callback function
    e.g:
    setAvgRating((avgRating)=>(avgRating+userRating)/2)
}


// localStorage.setItem("key",value(should be string(Json.stringigy))) -> local storage stores items as keyvalue pair
*/
/*
use state summary:

create state -> simple , based of function(lazy evaluation)(function must be pure and accept no arguments,called only on initial render)


updating state -> simple,based on current state(preffered)
*/

/*
    REF with useRef

    "BOX"(object) with a mutable .current property that is persisted across renders("normal" variables are always reset)
    usecases:
        creating a variable that stays the same between renders (eg. previous state,setTimeout id , etc)

        selecting and storing DOM elements

    refs are for data that is not rendered: usually only appear in event handlers or effects , not  in JSX(otherwise use state)

    do not read write or read .curr in render logic(like state)

    updaing refs do not renrenders the component. 
    unlike state refs are mutable
    updates are synchronous in ref , we can read just after updaing a ref. 
*/
