import React, { useEffect, useState } from 'react';

import $ from 'jquery';

import * as actions from '../../store/actions';

import classes from './Searchbar.module.css';
import { connect } from 'react-redux';

const Searchbar = (props) => {
  const { onInitSushiTypes, onSearchForDishType } = props;

  const [searchInputState, setSearchInputState] = useState('');

  const searchBarClasses = [classes.SearchBar];

  useEffect(() => {
    $(window).scroll(function () {
      const windowWidth = $(window).width();
      const searchBarElement = $('#search_bar');
      const isPositionFixed = searchBarElement.css('position') === 'fixed';
      if ($(this).scrollTop() > 60 && !isPositionFixed && windowWidth < 700) {
        searchBarElement.css({ position: 'fixed', top: '3rem' });
      }
      if ($(this).scrollTop() < 60 && isPositionFixed) {
        searchBarElement.css({ position: 'relative', top: '0' });
      }
    });
  }, []);

  const inputChangedHandler = ({ target }) => {
    const { value } = target;
    if (!value) {
      return onInitSushiTypes();
    }
    setSearchInputState(value);
  };

  const onSearchSubmit = () => {
    const trimSearchInput = searchInputState.trim();
    if (!trimSearchInput) return;
    $(window).scrollTop(0);
    onSearchForDishType(searchInputState);
  };

  const onEnterKeyPress = (event) => {
    const { value } = event.target;
    if (!value.trim()) return;
    if (event.keyCode === 13) {
      event.preventDefault();
      onSearchSubmit();
    }
  };

  return (
    <div id='search_bar' className={searchBarClasses.join(' ')}>
      <label htmlFor='search_bar_input'></label>
      <input
        autoComplete='off'
        type='text'
        id='search_bar_input'
        placeholder='Search'
        onChange={inputChangedHandler}
        onKeyUp={(event) => onEnterKeyPress(event)}
      />
      <i className='fas fa-search' onClick={onSearchSubmit}></i>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dishTypes: state.dishTypes.dishTypes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitSushiTypes: () => dispatch(actions.initSushiTypes()),
    onSearchForDishType: (searchInput) =>
      dispatch(actions.searchForDishType(searchInput)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
