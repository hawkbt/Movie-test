export const GET_MOVIES = 'GET_MOVIES'
export const GET_SINGLE_MOVIE = 'GET_SINGLE_MOVIE'
export const SEARCH_MOVIES = 'SEARCH_MOVIES'
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES'
export const RECEIVE_MOVIE = 'RECEIVE_MOVIE'
export const ERROR_GETTING_MOVIES = 'ERROR_GETTING_MOVIES'

// Get Movies
export const getMovies = (page, stars) => ({ type: GET_MOVIES, page, stars })
export const getSingleMovie = id => ({ type: GET_SINGLE_MOVIE, id })
export const searchMovies = (search) => ({ type: SEARCH_MOVIES, search })

// Receive Movies
export const receiveMovies = data => ({ type: RECEIVE_MOVIES, data })
export const receiveMovie = data => ({ type: RECEIVE_MOVIE, data })

// Error
export const errorGettingMovies = message => ({ type: ERROR_GETTING_MOVIES, message })