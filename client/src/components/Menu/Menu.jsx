import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

import classes from './Menu.module.css';

import MenuItem from './MenuItem/MenuItem';
import MenuNavbar from './MenuNavbar/MenuNavbar';
import Searchbar from '../Searchbar/Searchbar';
import DishManager from './DishManager/DishManager';

const Menu = (props) => {
  const { dishTypes, onInitSushiTypes } = props;

  const [dishTypesState, setDishTypesState] = useState([]);

  useEffect(() => {
    onInitSushiTypes();
  }, [onInitSushiTypes]);

  useEffect(() => {
    if (dishTypes.length) {
      setDishTypesState(dishTypes);
    }
  }, [dishTypes]);

  let dishTypesElements = [];
  if (dishTypesState.length) {
    const sortDishTypesByABC = dishTypesState.sort((current, next) =>
      current.name.localeCompare(next.name)
    );
    dishTypesElements = sortDishTypesByABC.map((item) => (
      <MenuItem
        key={item.name}
        name={item.name}
        description={item.description}
        image={item.imagePath}
      />
    ));
  }
  return (
    <React.Fragment>
      <MenuNavbar />
      <Searchbar />
      <DishManager />
      <div className={classes.Menu}>
        <div className={classes.Body}>
          <div className={classes.MenuItemWrapper}>{dishTypesElements}</div>
        </div>
      </div>
    </React.Fragment>
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
    onInitVeganTypes: () => dispatch(actions.initVeganTypes()),
    onInitWokTypes: () => dispatch(actions.initWokTypes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
