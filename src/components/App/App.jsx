import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import Navigation from "../Navigation/Navigation"
// import HomePage from "../../pages/HomePage"
// import MoviesPage from "../../pages/MoviesPage"
// import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage"
// import NotFoundPage from "../../pages/NotFoundPage"
// import MovieCast from "../MovieCast/MovieCast"
// import MovieReviews from "../MovieReviews/MovieReviews"


const HomePage = lazy(() => import("../../pages/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));

export default function App() {
    return (
        <div>
        <Navigation />
        
        <Suspense fallback={<div>Loading, please wait</div>}>    
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                <Route path="cast" element={<MovieCast />} />
                <Route path="reviews" element={<MovieReviews />} /> 
            </Route>
            <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>    
    </div>
    );
}