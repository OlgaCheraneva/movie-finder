import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
    state = {
        text: ''
    };

    static propTypes = {
        searchFilms: PropTypes.func.isRequired,
        clearFilms: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    };

    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.text === '') {
            const timeout = 3000;
            this.props.setAlert('You should enter something', 'light', timeout);
        } else {
            this.props.searchFilms(this.state.text);
            this.setState({text: ''});
        }
    };

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    render() {
        const {showClear, clearFilms} = this.props;

        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input
                        type="text"
                        name="text"
                        placeholder="Search Films by Title..."
                        value={this.state.text}
                        onChange={this.onChange}
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
    }
}

export default Search;
