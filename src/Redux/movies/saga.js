import { takeEvery, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { receiveMovies, GET_MOVIES, GET_SINGLE_MOVIE, receiveMovie, SEARCH_MOVIES } from './actions';

// This will be in the .env file but ill be using it here
let api_key = 'b493ab7233d7a87134203c1b8bd2ecfa'

function* getAll({stars, page}) {
    try {
        let filters = {
            stars: stars && stars !== 0 ? `&vote_average.lte=${stars}` : '',
            page: page && page !== 1 ? `&page=${page}` : '',
        }
        const response = yield call(axios.get, process.env.REACT_APP_API_URL + '3/discover/movie?api_key=' + api_key + filters.page + filters.stars, )
        stars ? response.data.stars = stars : response.data.stars = 0
        response.data.search = ''
        yield put(receiveMovies(response.data))
    } catch (error) {
        console.log(error.response)
    }
}

function* getSingle({id}) {
    try {
        const response = yield call(axios.get, process.env.REACT_APP_API_URL + '3/movie/' + id + '?api_key=' + api_key)
        console.log(response.data)
        yield put(receiveMovie(response.data))
    } catch (error) {
        console.log(error.response)
    }
}

function* searchMovies({search}) {
    try {
        let filters = {
            search: search && search !== '' ? `&query=${search}` : ''
        }
        const response = yield call(axios.get, process.env.REACT_APP_API_URL + '3/search/movie/?api_key=' + api_key + filters.search)
        response.data.stars = 0
        search ? response.data.search = search : response.data.search = ''
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