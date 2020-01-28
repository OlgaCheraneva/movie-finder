import {SEARCH_FILMS, GET_FILM_BY_ID, CLEAR_FILMS, SET_LOADING} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SEARCH_FILMS:
            return {
                ...state,
                films: action.payload,
                loading: false
            };
        case GET_FILM_BY_ID:
            return {
                ...state,
                film: action.payload,
                loading: false
            };
        case CLEAR_FILMS:
            return {
                ...state,
                films: [],
                loading: false
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};
