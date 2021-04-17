import React, { useState } from 'react';
import { connect } from 'react-redux';
import { url } from '../../../myaxios';
import { disableBodyScroll } from 'body-scroll-lock';

import * as actions from '../../../store/actions';

import classes from './MenuItem.module.css';

const animateCSSClasses = {
  fadeIn: 'animate__animated animate__fadeIn',
};

const MenuItem = (props) => {
  const { dishTypes, name, description, image, onSelectDish } = props;

  const menuItemClasses = [classes.MenuItem, animateCSSClasses.fadeIn];
  const iconClasses = ['bx bxs-chevron-left', 'bx bxs-chevron-down'];

  const [expandMenuItemState, setExpandMenuItemState] = useState(false);

  const toggleMoreInfo = () => {
    setExpandMenuItemState(
      (currentExpandMenuItemState) => !currentExpandMenuItemState
    );
  };

  const onSelectDishHandler = () => {
    disableBodyScroll(document.getElementsByTagName('body')[0]);
    const findDish = dishTypes.filter((item) => item.name === name)[0];
    onSelectDish(findDish);
  };

  return (
    <div className={classes.MenuItemWrapper}>
      <div
        className={
          expandMenuItemState
            ? [...menuItemClasses, classes.Expand].join(' ')
            : menuItemClasses.join(' ')
        }
        onClick={onSelectDishHandler}
      >
        <div className={classes.Image}>
          <img src={`${url}/images/dishTypes/${image}`} alt={name} />
        </div>
        <div className={classes.Info}>
          <h5>{name}</h5>
          <p>{description}</p>
        </div>
      </div>
      <div className={classes.Icon} onClick={toggleMoreInfo}>
        <i
          className={expandMenuItemState ? iconClasses[1] : iconClasses[0]}
        ></i>
      </div>
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
    onSelectDish: (selectedDish) => dispatch(actions.selectDish(selectedDish)),
    onHideModal: () => dispatch(actions.hideModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
