import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {Spinner} from '../layout/Spinner';
import './Film.css';

export class Film extends Component {
    static propTypes = {
        film: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        getFilmById: PropTypes.func.isRequired
    };

    async componentDidMount() {
        this.props.getFilmById(this.props.match.params.id);
    }

    render() {
        const {film, loading} = this.props;

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
                        {production_companies &&
                            production_companies.length > 0 && (
                                <Fragment>
                                    <h3>Production Companies</h3>
                                    <ul>
                                        {production_companies.map((company) => (
                                            <li>
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
                        <div className="badge badge-dark">
                            Revenue: ${revenue}
                        </div>
                    )}
                    {original_language && (
                        <div className="badge badge-light">
                            Original Language: {original_language}
                        </div>
                    )}
                </div>
            </Fragment>
        );
    }
}

export default Film;
