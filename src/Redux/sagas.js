import { all } from "redux-saga/effects";
import { watchMovies } from "./movies/saga";

export default function* rootSaga() {
    yield all([
        watchMovies()
    ])
}