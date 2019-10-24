import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import logger from 'redux-logger'

import moviesReducer, {
    initialState as moviesInitialState
} from './movies/reducer'


const initState = {
    movies: moviesInitialState
}

const reducers = combineReducers({
    movies: moviesReducer
})

const asyncDispatchMiddleware = store => next => action => {
    let syncActivityFinished = false;
    let actionQueue = [];

    function flushQueue() {
        actionQueue.forEach(a => store.dispatch(a)); // flush queue
        actionQueue = [];
    }

    function asyncDispatch(asyncAction) {
        actionQueue = actionQueue.concat([asyncAction]);

        if (syncActivityFinished) {
            flushQueue();
        }
    }

    const actionWithAsyncDispatch =
        Object.assign({}, action, { asyncDispatch });

    next(actionWithAsyncDispatch);
    syncActivityFinished = true;
    flushQueue();
};

const composeEnhancers = compose
const sagaMiddleware = createSagaMiddleware();
const middleware = [logger, sagaMiddleware, asyncDispatchMiddleware];
const enhancer = composeEnhancers(
    applyMiddleware(...middleware)
);

export const store = createStore(reducers, initState, enhancer);

sagaMiddleware.run(rootSaga);