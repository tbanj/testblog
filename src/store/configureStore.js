/* eslint-disable prettier/prettier */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import newsReducer from './reducers/news';
import uiReducer from './reducers/ui';
export const middlewares = [reduxThunk];
const rootReducer = combineReducers({
    news: newsReducer,
    ui: uiReducer,
});
let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => { return createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk))); };

export default configureStore;

