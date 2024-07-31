import { useEffect, useRef, useState } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { getMoviesById } from "../../movies-api";
import css from "../MovieDetailsPage/MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const location = useLocation();
  // const navigate = useNavigate();
  const movieLinkRef = useRef(location.state?.from ?? "/movies");

  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(false);
        const data = await getMoviesById(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [movieId]);

  // const handleGoBack = () => {
  //   navigate(movieLinkRef.current);
  // };

  return (
    <div>
      {loading && <p>Loading....</p>}
      {error && <p>Oops! There was an error, please reload this page!</p>}
      <Link to={movieLinkRef.current}>Go back</Link>
      {/* <button onClick={handleGoBack}>Go back</button> */}
      {movie && (
        <div>
          <div className={css.container}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={css.img}
            />
            <div>
              <h2>{movie.title}</h2>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>
          </div>
          <nav className={css.nav}>
            <Link to="cast">Cast</Link>
            <Link to="reviews">Reviews</Link>
          </nav>
          <Outlet />
        </div>
      )}
    </div>
  );
}