import React, {Fragment, useState} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {Alert} from './components/layout/Alert';
import {Navbar} from './components/layout/Navbar';
import {Film} from './components/films/Film';
import {Films} from './components/films/Films';
import {Search} from './components/films/Search';
import {About} from './components/pages/About';
import {NotFound} from './components/pages/NotFound';

import './App.css';

const App = () => {
    const [alert, setAlert] = useState(null);
    const [film, setFilm] = useState(null);
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchFilms = async (text) => {
        setLoading(true);

        const url = `${
            process.env.REACT_APP_TMDb_API_BASE_URL
        }search/movie?api_key=${
            process.env.REACT_APP_TMDb_API_KEY
        }&query=${encodeURI(text)}`;
        const res = await axios.get(url);

        setLoading(false);
        setFilms(res.data.results);
    };

    const getFilmById = async (id) => {
        setLoading(true);

        const url = `${process.env.REACT_APP_TMDb_API_BASE_URL}movie/${id}?api_key=${process.env.REACT_APP_TMDb_API_KEY}`;
        const res = await axios.get(url);

        setLoading(false);
        setFilm(res.data);
    };

    const clearFilms = () => {
        setLoading(false);
        setFilms([]);
    };

    const showAlert = (message, type, timeout) => {
        setAlert({message, type});

        setTimeout(() => setAlert(null), timeout);
    };

    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Fragment>
                                    <Alert alert={alert} />
                                    <Search
                                        searchFilms={searchFilms}
                                        clearFilms={clearFilms}
                                        setAlert={showAlert}
                                        showClear={
                                            films.length > 0 ? true : false
                                        }
                                    />
                                    <Films films={films} loading={loading} />
                                </Fragment>
                            )}
                        />
                        <Route exact path="/about" component={About} />
                        <Route
                            exact
                            path="/film/:id"
                            render={(props) => (
                                <Film
                                    {...props}
                                    film={film}
                                    loading={loading}
                                    getFilmById={getFilmById}
                                />
                            )}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
