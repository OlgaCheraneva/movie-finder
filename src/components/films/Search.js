import React, {useState} from 'react';
import PropTypes from 'prop-types';

export const Search = ({setAlert, searchFilms, showClear, clearFilms}) => {
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (text === '') {
            const timeout = 3000;
            setAlert('You should enter something', 'light', timeout);
        } else {
            searchFilms(text);
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
                {showClear && (
                    <button
                        className="btn btn-block btn-light"
                        onClick={clearFilms}
                    >
                        Clear
                    </button>
                )}
            </form>
        </div>
    );
};

Search.propTypes = {
    searchFilms: PropTypes.func.isRequired,
    clearFilms: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
};
