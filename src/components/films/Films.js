import React from 'react';
import PropTypes from 'prop-types';

import {FilmItem} from './FilmItem';
import {Spinner} from '../layout/Spinner';

export const Films = ({loading, films}) => {
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

Films.propTypes = {
    loading: PropTypes.bool.isRequired,
    films: PropTypes.array.isRequired
};
