import { RECEIVE_MOVIE, RECEIVE_MOVIES, ERROR_GETTING_MOVIES, GET_SINGLE_MOVIE, GET_MOVIES, SEARCH_MOVIES } from "./actions";

export const initialState = {
    movies: [],
    movie: {},
    loading: true,
    message: '',
    search: '',
    rating: 0,
    page: 1
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SEARCH_MOVIES:
            return {...state, loading: true }
        case GET_SINGLE_MOVIE:
            return {...state, loading: true }
        case GET_MOVIES:
            return {...state, loading: true }
        case RECEIVE_MOVIE:
            return {
                ...state,
                loading: false,
                movie: action.data,
            }

        case RECEIVE_MOVIES:
        
            return {
                ...state,
                loading: false,
                movies: action.data.results,
                page: action.data.page,
                search: action.data.search,
                rating: action.data.stars / 2
            }

        case ERROR_GETTING_MOVIES:
            return {
                ...state,
                message: action.message,
                loading: false
            }
        default:
            return state
    }
}

export default reducer