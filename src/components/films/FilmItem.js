import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import poster from './poster.svg';
import './FilmItem.css';

export const FilmItem = ({film: {id, poster_path, title}}) => {
    return (
        <div className="card text-center film-card">
            <img
                src={
                    poster_path
                        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                        : poster
                }
                alt={title}
                className="mx film-card__poster"
            />
            <div className="film-card__info">
                <h3>{title}</h3>
                <div>
                    <Link
                        to={`/film/${id}`}
                        className="btn btn-dark btn-sm my-1"
                    >
                        More
                    </Link>
                </div>
            </div>
        </div>
    );
};

FilmItem.propTypes = {
    film: PropTypes.object.isRequired
};
