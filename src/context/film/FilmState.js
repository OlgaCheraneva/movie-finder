import React, {useReducer} from 'react';
import axios from 'axios';

import FilmContext from './filmContext';
import FilmReducer from './filmReducer';
import {SEARCH_FILMS, GET_FILM_BY_ID, CLEAR_FILMS, SET_LOADING} from '../types';

let TMDbAPIBaseURL = process.env.REACT_APP_TMDb_API_BASE_URL;
let TMDbAPIKey = process.env.REACT_APP_TMDb_API_KEY;

const FilmState = (props) => {
    const initialState = {
        film: null,
        films: [],
        loading: false
    };

    const [state, dispatch] = useReducer(FilmReducer, initialState);

    const searchFilms = async (text) => {
        setLoading();

        const url = `${TMDbAPIBaseURL}search/movie?api_key=${TMDbAPIKey}&query=${encodeURI(
            text
        )}`;
        const res = await axios.get(url);

        dispatch({
            type: SEARCH_FILMS,
            payload: res.data.results
        });
    };

    const getFilmById = async (id) => {
        setLoading();

        const url = `${TMDbAPIBaseURL}movie/${id}?api_key=${TMDbAPIKey}`;
        const res = await axios.get(url);

        dispatch({type: GET_FILM_BY_ID, payload: res.data});
    };

    const clearFilms = () => dispatch({type: CLEAR_FILMS});

    const setLoading = () => dispatch({type: SET_LOADING});

    return (
        <FilmContext.Provider
            value={{
                film: state.film,
                films: state.films,
                loading: state.loading,
                searchFilms,
                getFilmById,
                clearFilms
            }}
        >
            {props.children}
        </FilmContext.Provider>
    );
};

export default FilmState;
