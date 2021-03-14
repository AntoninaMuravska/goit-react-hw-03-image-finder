import React, {Component} from 'react';

import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  }

  handleChange = event => {
    this.setState({query: event.currentTarget.value})
  }

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.query);
    this.setState({query: ''})
  }

  render() {
    return (
      <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={this.handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
    );
  }
}

export default Searchbar;



