import React, {Component, Fragment} from 'react';
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

class App extends Component {
    state = {
        alert: null,
        film: null,
        films: [],
        loading: false
    };

    async componentDidMount() {
        // this.setState({loading: true});
        // const url = `${process.env.REACT_APP_TMDb_API_BASE_URL}configuration?api_key=${process.env.REACT_APP_TMDb_API_KEY}`;
        // const res = await axios.get(url);
        // const imagesUrl = [res.data.images.base_url,
        // this.setState({loading: false});
    }

    searchFilms = async (text) => {
        this.setState({loading: true});

        const url = `${
            process.env.REACT_APP_TMDb_API_BASE_URL
        }search/movie?api_key=${
            process.env.REACT_APP_TMDb_API_KEY
        }&query=${encodeURI(text)}`;
        const res = await axios.get(url);

        this.setState({loading: false, films: res.data.results});
    };

    getFilmById = async (id) => {
        this.setState({loading: true});

        const url = `${process.env.REACT_APP_TMDb_API_BASE_URL}movie/${id}?api_key=${process.env.REACT_APP_TMDb_API_KEY}`;
        const res = await axios.get(url);

        this.setState({loading: false, film: res.data});
    };

    clearFilms = () => this.setState({loading: false, films: []});

    setAlert = (message, type, timeout) => {
        this.setState({alert: {message, type}});

        setTimeout(() => this.setState({alert: null}), timeout);
    };

    render() {
        const {alert, film, films, loading} = this.state;

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
                                            searchFilms={this.searchFilms}
                                            clearFilms={this.clearFilms}
                                            setAlert={this.setAlert}
                                            showClear={
                                                this.state.films.length > 0
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <Films
                                            films={films}
                                            loading={loading}
                                        />
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
                                        getFilmById={this.getFilmById}
                                    />
                                )}
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
