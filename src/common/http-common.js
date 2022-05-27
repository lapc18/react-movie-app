import axios from "axios";

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    headers: {
        "Content-type": "application/json",
        "Authorization": 'Bearer ' + process.env.REACT_APP_BEARER_TKN
    }
});