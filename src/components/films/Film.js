import React, {Fragment, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {Spinner} from '../layout/Spinner';
import './Film.css';

import FilmContext from '../../context/film/filmContext';

export const Film = ({match}) => {
    const {film, loading, getFilmById} = useContext(FilmContext);

    // Repeats the behavior of the componentDidMount
    // The second argument defines special trigger conditions
    useEffect(() => {
        getFilmById(match.params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading || film === null) {
        return <Spinner />;
    }

    const {
        vote_average,
        vote_count,
        overview,
        original_language,
        poster_path,
        production_companies,
        release_date,
        revenue,
        status,
        title
    } = film;

    return (
        <Fragment>
            <Link to="/" className="btn btn-light">
                Back To Search
            </Link>
            Released:{' '}
            {status === 'Released' ? (
                <i className="fas fa-check text-success" />
            ) : (
                <i className="fas fa-times-circle text-danger" />
            )}
            <div className="card grid-2">
                <div className="all-center">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                        alt={title}
                        className="poster"
                    />
                    <h1>{title}</h1>
                    <p>Release Date: {release_date}</p>
                </div>
                <div>
                    {overview && (
                        <Fragment>
                            <h3>Overview</h3>
                            <p>{overview}</p>
                        </Fragment>
                    )}
                    <br />
                    {production_companies && production_companies.length > 0 && (
                        <Fragment>
                            <h3>Production Companies</h3>
                            <ul>
                                {production_companies.map((company) => (
                                    <li key={company.id}>
                                        {`${company.name} (${company.origin_country})`}
                                    </li>
                                ))}
                            </ul>
                        </Fragment>
                    )}
                </div>
            </div>
            <div className="card text-center">
                {vote_average && (
                    <div className="badge badge-primary">
                        Rating: {vote_average}
                    </div>
                )}
                {vote_count && (
                    <div className="badge badge-success">
                        Vote Count: {vote_count}
                    </div>
                )}
                {revenue && (
                    <div className="badge badge-dark">Revenue: ${revenue}</div>
                )}
                {original_language && (
                    <div className="badge badge-light">
                        Original Language: {original_language}
                    </div>
                )}
            </div>
        </Fragment>
    );
};
