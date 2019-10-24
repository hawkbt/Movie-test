import { takeEvery, call, put } from 'redux-saga/effects'
import axios from 'axios'
import handler from "../../Utils/cookieHandler";
import { receiveMovies, GET_MOVIES, GET_SINGLE_MOVIE, receiveMovie, SEARCH_MOVIES } from './actions';

// This will be in the .env file but ill be using it here
let api_key = 'b493ab7233d7a87134203c1b8bd2ecfa'

function* getAll(action) {
    try {
        let filters = {
            stars: action.stars && action.stars !== 0 ? `&vote_average.lte=${action.stars}` : '',
            page: action.page && action.page !== 1 ? `&page=${action.page}` : '',
        }
        const response = yield call(axios.get, process.env.REACT_APP_API_URL + '3/discover/movie?api_key=' + api_key + filters.page + filters.stars)
        action.stars ? response.data.stars = action.stars : response.data.stars = 0
        response.data.search = ''
        yield put(receiveMovies(response.data))
    } catch (error) {
        console.log(error.response)
    }
}

function* getSingle(action) {
    try {
        const response = yield call(axios.get, process.env.REACT_APP_API_URL + '3/movie/' + action.id + '?api_key=' + api_key)
        console.log(response.data)
        yield put(receiveMovie(response.data))
    } catch (error) {
        console.log(error.response)
    }
}

function* searchMovies(action) {
    try {
        let filters = {
            search: action.search && action.search !== '' ? `&query=${action.search}` : ''
        }
        const response = yield call(axios.get, process.env.REACT_APP_API_URL + '3/search/movie/?api_key=' + api_key + filters.search)
        response.data.stars = 0
        action.search ? response.data.search = action.search : response.data.search = ''
        yield put(receiveMovies(response.data))
    } catch (error) {
        console.log(error.response)
    }
}

export function* watchMovies() {
    yield takeEvery(GET_MOVIES, getAll)
    yield takeEvery(GET_SINGLE_MOVIE, getSingle)
    yield takeEvery(SEARCH_MOVIES, searchMovies)
}