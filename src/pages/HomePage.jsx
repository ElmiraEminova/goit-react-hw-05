import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import {getMoviesTrending} from "../movies-api"

export default function HomePage() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchMovies() {
            try {
                setLoading(true);
                setError(false);
                const data = await getMoviesTrending();
                setMovies(data);
                console.log(data);                
            } catch (error) {
                setError(true);
            }
            finally {
                setLoading(false);
            }
           
        }  fetchMovies()
    }, [])

    return (<div>
        {loading && <p>Loading...</p>}
        {movies && (<MovieList movies={movies} />)}
        {error && <p>Oops! There was an error, please reload this page!</p>}
    </div>)

}