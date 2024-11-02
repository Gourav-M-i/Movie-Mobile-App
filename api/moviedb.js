import axios from 'axios'
import { apiKey } from '../constants'
const apiBaseurl = 'https://api.themoviedb.org/3'
const trendingMoviesEndpoint = `${apiBaseurl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${apiBaseurl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoint = `${apiBaseurl}/movie/top_rated?api_key=${apiKey}`

const movieDetailsEndpoint = id => `${apiBaseurl}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = id => `${apiBaseurl}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = id => `${apiBaseurl}/movie/${id}/similar?api_key=${apiKey}`
const personDetailsEndpoint = id => `${apiBaseurl}/person/${id}?api_key=${apiKey}`
const personmoviesEndpoint = id => `${apiBaseurl}/person/${id}/movie_credits?api_key=${apiKey}`
const searchmoviesEndpoint = `${apiBaseurl}/search/movie?api_key=${apiKey}`



export const image500 = (path) => {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : null
}
export const image342 = (path) => {
    return path ? `https://image.tmdb.org/t/p/w342${path}` : null
}
export const image185 = (path) => {
    return path ? `https://image.tmdb.org/t/p/w185${path}` : null
}

export const fallbackMoviePoster = 'https://kamayo.in/wp-content/themes/koji/assets/images/default-fallback-image.png'
export const fallbackPersonImage = 'https://www.indigomedical.je/media/yznlwur3/fallback-man.png?width=900&height=900&quality=90&format=jpg'
const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }
    try {
        const response = await axios.request(options)
        return response.data
    } catch (err) {
        console.log(err)
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint)
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint)
}
export const fetchtopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint)
}

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id))
}

export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id))
}
export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndpoint(id))
}
export const fetchPersonDetails = id => {
    return apiCall(personDetailsEndpoint(id))
}
export const fetchPersonMovies = id => {
    return apiCall(personmoviesEndpoint(id))
}
export const searchMovies = params => {
    return apiCall(searchmoviesEndpoint, params)
}