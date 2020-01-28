import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {Alert} from './components/layout/Alert';
import {Navbar} from './components/layout/Navbar';
import {Film} from './components/films/Film';
import {About} from './components/pages/About';
import {Home} from './components/pages/Home';
import {NotFound} from './components/pages/NotFound';

import AlertState from './context/alert/AlertState';
import FilmState from './context/film/FilmState';

import './App.css';

const App = () => {
    return (
        <AlertState>
            <FilmState>
                <Router>
                    <div className="App">
                        <Navbar />
                        <div className="container">
                            <Alert />
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/about" component={About} />
                                <Route
                                    exact
                                    path="/film/:id"
                                    component={Film}
                                />
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </FilmState>
        </AlertState>
    );
};

export default App;
