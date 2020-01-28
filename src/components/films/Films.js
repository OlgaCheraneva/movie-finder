import React, {useContext} from 'react';

import {FilmItem} from './FilmItem';
import {Spinner} from '../layout/Spinner';

import FilmContext from '../../context/film/filmContext';

export const Films = () => {
    const filmContext = useContext(FilmContext);
    const {loading, films} = filmContext;

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="grid-3">
            {films.map((film) => (
                <FilmItem key={film.id} film={film} />
            ))}
        </div>
    );
};
