import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
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

function WatchedList({ watched }) {
  return (
    <ul className="list barInvis">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie }) {
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
    (acc, curr) => (acc, curr) => acc || curr.imdbID === movie.imdbID,
    false
  );

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
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState([]);
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
  }

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
              <WatchedList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

/*
dependency array of useeffect
-> by defalut, effects run after every render.we can prevent that by passing a dependency array
->without this array react don't know when to run the effect
->each time one of the dependencies changes, the effect will be executed again.
->every state variable and prop used inside the effect must be included in the dependency array.

->UseEffect is like an event listener that is listening for one dependency to change. Whenever a dependency changes, it will execute the effect again.
->we can use the dependency array to run effects when the component renders or re-renders

useEffect(fn,[x,y,z])-> effect sync with x,y,z . runs on mount(initial render) and re-render by updating x,y or z
useEffect(fn,[])-> effect sync with no props , runs  only on mount
useEffect(fn)-> effect sync with every thing , runs on every render(usually bad)



cleanup function:
  -> function that we can return from an effect (optional)
  ->runs on two different occasions:
      -> before the effect is executed again
      -> after a componet has unmounted
  ->Each effect should do only one thing! use one useeffect hook for each side effect


Abort controller and listening to keypress in react (also solving the addition of multiple eventlisteners)
*/
