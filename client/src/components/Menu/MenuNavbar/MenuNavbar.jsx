import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

import $ from 'jquery';

import classes from './MenuNavbar.module.css';

import SushiIcon from '../../../assets/images/MenuNavbar/sushi.png';
import LeafIcon from '../../../assets/images/MenuNavbar/leaf.png';
import BowlIcon from '../../../assets/images/MenuNavbar/bowl.png';

const MenuNavbar = (props) => {
  const {
    dishTypes,
    onInitSushiTypes,
    onInitVeganTypes,
    onInitWokTypes,
  } = props;

  const [sushiTypesActiveState, setSushiTypesActiveState] = useState(true);
  const [veganTypesActiveState, setVeganTypesActiveState] = useState(false);
  const [wokTypesActiveState, setWokTypesActiveState] = useState(false);

  useEffect(() => {
    const isSushiTypesActive = dishTypes.some((item) => item.name === 'Anima');
    setSushiTypesActiveState(isSushiTypesActive);
  }, [setSushiTypesActiveState, dishTypes]);

  useEffect(() => {
    const isVeganTypesActive = dishTypes.some((item) => item.name === 'Tokyo');
    setVeganTypesActiveState(isVeganTypesActive);
  }, [setVeganTypesActiveState, dishTypes]);

  useEffect(() => {
    const isWokTypesActive = dishTypes.some((item) => item.name === 'Beijing');
    setWokTypesActiveState(isWokTypesActive);
  }, [setWokTypesActiveState, dishTypes]);

  useEffect(() => {
    $(window).scroll(function () {
      const menuNavbarElement = $('#menu_navbar');
      const isPositionFixed = menuNavbarElement.css('position') === 'fixed';
      if ($(this).scrollTop() > 60 && !isPositionFixed) {
        menuNavbarElement.css({ position: 'fixed', top: '0' });
      }
      if ($(this).scrollTop() < 60 && isPositionFixed) {
        menuNavbarElement.css({ position: 'relative', top: '0' });
      }
    });
  }, []);

  const onInitSushiTypesHandler = () => {
    if (sushiTypesActiveState) return;
    $(window).scrollTop(0);
    onInitSushiTypes();
  };

  const onInitVeganTypesHandler = () => {
    if (veganTypesActiveState) return;
    $(window).scrollTop(0);
    onInitVeganTypes();
  };

  const onInitWokTypesHandler = () => {
    if (wokTypesActiveState) return;
    $(window).scrollTop(0);
    onInitWokTypes();
  };

  return (
    <div id='menu_navbar' className={classes.MenuNavbar}>
      <div className={classes.ItemWrapper}>
        <div className={classes.Item} onClick={onInitSushiTypesHandler}>
          <img src={SushiIcon} alt='sushi icon' />
          <span>Sushi</span>
        </div>
        <div
          className={
            sushiTypesActiveState
              ? [classes.Line, classes.Active].join(' ')
              : classes.Line
          }
        ></div>
      </div>
      <div className={classes.ItemWrapper}>
        <div className={classes.Item} onClick={onInitVeganTypesHandler}>
          <img src={LeafIcon} alt='leaf icon' />
          <span>Vegan</span>
        </div>
        <div
          className={
            veganTypesActiveState
              ? [classes.Line, classes.Active].join(' ')
              : classes.Line
          }
        ></div>
      </div>
      <div className={classes.ItemWrapper}>
        <div className={classes.Item} onClick={onInitWokTypesHandler}>
          <img src={BowlIcon} alt='bowl icon' />
          <span>Wok</span>
        </div>
        <div
          className={
            wokTypesActiveState
              ? [classes.Line, classes.Active].join(' ')
              : classes.Line
          }
        ></div>
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
    onInitSushiTypes: () => dispatch(actions.initSushiTypes()),
    onInitVeganTypes: () => dispatch(actions.initVeganTypes()),
    onInitWokTypes: () => dispatch(actions.initWokTypes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuNavbar);
