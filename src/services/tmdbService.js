import httpCommon from "../common/http-common";

/**
 * 
 * @param {*} page Current page to be requested. 
 * @param {*} language Current language to be requested. 
 * @returns Get a list of movies in theatres. 
 * @description This is a release type query that looks for all movies that have a release type of 2 or 3 within the specified date range.
 */
export const getAll = async ({page = 1, language = 'en-US'}) => {
    const response = await httpCommon.get(`/movie/now_playing?language=${language}&page=${page}`);
    return response.data;
}

export const getAllByQuery = async ({query = "", page = 1, language = 'en-US'}) => {
    const response = await httpCommon.get(`/search/movie?language=${language}&page=${page}&query=${query}&include_adult=true`);
    return response.data;
}

export const getMovieDetail = async ({id = "", language = 'en-US'}) => {
    const response = await httpCommon.get(`/movie/${id}?language=${language}`);
    return response.data;
}
