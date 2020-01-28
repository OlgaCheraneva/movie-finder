import React, {useContext, useState} from 'react';

import FilmContext from '../../context/film/filmContext';
import AlertContext from '../../context/alert/alertContext';

export const Search = () => {
    const filmContext = useContext(FilmContext);
    const alertContext = useContext(AlertContext);

    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (text === '') {
            const timeout = 3000;
            alertContext.setAlert(
                'You should enter something',
                'light',
                timeout
            );
        } else {
            filmContext.searchFilms(text);
            setText('');
        }
    };

    const onChange = (e) => setText(e.target.value);

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input
                    type="text"
                    name="text"
                    placeholder="Search Films by Title..."
                    value={text}
                    onChange={onChange}
                ></input>
                <input
                    type="submit"
                    value="Search"
                    className="btn btn-block btn-dark"
                />
                {filmContext.films.length > 0 && (
                    <button
                        className="btn btn-block btn-light"
                        onClick={filmContext.clearFilms}
                    >
                        Clear
                    </button>
                )}
            </form>
        </div>
    );
};
