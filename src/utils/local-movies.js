import { MOVIES_KEY } from "../models/movies";

export const moviesFromLocalStorage = () => {
    const movies = localStorage.getItem(MOVIES_KEY);
    const res = JSON.parse(movies ?? "[]");
    return res;
}

export const saveMoviesInLocalStore = (movie) => {
    const movies = moviesFromLocalStorage();
    localStorage.setItem(MOVIES_KEY, JSON.stringify([...movies, movie]));
}

export const removeMovieFromLocalStore = (movie) => {
    const movies = moviesFromLocalStorage();
    const res = [...movies].filter(x => x.id.toString() !== movie.id.toString());
    localStorage.setItem(MOVIES_KEY, JSON.stringify([...res]));
}
