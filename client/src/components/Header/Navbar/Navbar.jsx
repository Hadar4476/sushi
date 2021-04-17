import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { disableBodyScroll } from 'body-scroll-lock';

import * as actions from '../../../store/actions';

import classes from './Navbar.module.css';

import UserMenu from './UserMenu/UserMenu';
import Cart from './Cart/Cart';

const Navbar = (props) => {
  const {
    user,
    onShowCart,
    cart,
    displayNotfication,
    onHideNotfication,
  } = props;

  const [displayUserMenuState, setDisplayUserMenuState] = useState(false);

  const history = useHistory();

  const { pathname } = useLocation();

  const toggleUserMenuDisplay = () => {
    setDisplayUserMenuState(
      (currentDisplayUserMenuState) => !currentDisplayUserMenuState
    );
  };

  const onShowCartHandler = () => {
    disableBodyScroll(document.getElementsByTagName('body')[0]);
    onHideNotfication();
    onShowCart();
    hideUserMenu();
  };

  const hideUserMenu = () => {
    setDisplayUserMenuState(false);
  };

  const navToHomePage = () => {
    history.push('/');
  };

  useEffect(() => {
    const main = document.getElementsByTagName('main')[0];
    const logo = document.getElementById('logo');
    main.addEventListener('click', () => setDisplayUserMenuState(false));
    logo.addEventListener('click', () => setDisplayUserMenuState(false));
  }, [setDisplayUserMenuState]);

  let userIcon = null;
  if (user && user.username) {
    userIcon = (
      <div className={classes.UserIcon} onClick={toggleUserMenuDisplay}>
        <span>{user?.username[0].toUpperCase()}</span>
      </div>
    );
  }

  let cartIcon = null;
  if (user && user.username && pathname === '/' && cart.length) {
    cartIcon = (
      <div className={classes.CartIcon} onClick={onShowCartHandler}>
        <i className='bx bxs-cart-add'></i>
        <div className={displayNotfication ? classes.Notfication : 'd-none'}>
          <span>{cart.length}</span>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <nav className={classes.Navbar}>
        <div id='logo' className={classes.Logo}>
          <h1 onClick={navToHomePage}>Sushi</h1>
        </div>
        <div className={classes.Options}>
          {cartIcon}
          {userIcon}
        </div>
      </nav>
      <Cart />
      <UserMenu
        shouldDisplay={displayUserMenuState}
        hideUserMenu={hideUserMenu}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    cart: state.orderManager.cart,
    displayNotfication: state.orderManager.displayNotfication,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onShowCart: () => dispatch(actions.showCart()),
    onHideNotfication: () => dispatch(actions.hideNotfication()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
