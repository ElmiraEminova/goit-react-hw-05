import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getCast } from "../../movies-api"

export default function MovieCast() {
   
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        async function fetchCast() {
            try {
                setLoading(true);
                setError(false);
                const data = await getCast(movieId);
                console.log(data);
                setCast(data);
              
            } catch (error) {
                setError(true);
            }
            finally {
                setLoading(false);
            }
        } fetchCast()
    }, [movieId]);
    


    return (
        <div>
              {loading && <p>Loading....</p>}
      {error && <p>Oops! There was an error, please reload this page!</p>}
            <h3>Cast</h3>
      <ul>
        {cast.map(actor => (
          <li key={actor.id} >
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
               
              />
            )}
            <p>{actor.name}</p>
          </li>
        ))}
            </ul></div>)
}
    