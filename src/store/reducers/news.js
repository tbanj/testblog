/* eslint-disable prettier/prettier */
// reducers is just a function

import { ADD_NEWSS, DELETE_NEWSS, NEWS_S_ADDED, SET_NEW, SET_NEWS, START_ADD_NEWSS } from '../actions/actionTypes';
const initialState = {
    news: [],
    selectedNewss: null,
    newssAdded: false,
};
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_NEWS:
            return {
                ...state,
                news: action.news,
            };
        case ADD_NEWSS:

            return {
                ...state,
                news: [...state.news],
            };

        case DELETE_NEWSS:
            return {
                ...state,
                news: state.news.filter((plac, ind) => plac.key !== action.key),
            };
        case START_ADD_NEWSS:
            return {
                ...state,
                newssAdded: false,
            };
        case NEWS_S_ADDED:
            return {
                ...state,
                newssAdded: true,
            };
        case SET_NEW:
            return {
                ...state,
                selectedNewss: state.news.find(place => { return place.key === action.placeName; }),
            };
        default:
            return state;
    }

};

export default reducer;
