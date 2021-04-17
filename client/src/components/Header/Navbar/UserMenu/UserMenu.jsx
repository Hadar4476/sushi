import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import $ from 'jquery';

import classes from './UserMenu.module.css';

const UserMenu = (props) => {
  const { user, hideUserMenu, shouldDisplay } = props;

  const history = useHistory();

  useEffect(() => {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 60) {
        hideUserMenu();
      }
    });
  }, [hideUserMenu]);

  const navigateToMyGallery = () => {
    history.push('/my-orders');
    hideUserMenu();
  };

  const navigateToLogout = () => {
    history.push('/logout');
    hideUserMenu();
  };

  let capitalizedFirstLetter = null;
  let capitalizeUsername = null;
  if (user.username) {
    capitalizeUsername =
      user.username[0].toUpperCase() + user.username.toLowerCase().slice(1);
    capitalizedFirstLetter = user.username[0].toUpperCase();
  }

  let content = null;
  if (shouldDisplay) {
    content = (
      <div className={classes.UserMenuWrapper}>
        <div className={classes.UserMenu}>
          <div className={classes.Header}>
            <div className={classes.Top}>
              <div className={classes.UserIcon}>
                <span>{capitalizedFirstLetter}</span>
              </div>
              <h5 title={capitalizeUsername}>{capitalizeUsername}</h5>
            </div>
            <div className={classes.Bottom}>
              <p title={user.email}>{user.email}</p>
            </div>
          </div>

          <div className={classes.Body}>
            <div onClick={navigateToMyGallery}>
              <i className='bx bxs-image'></i>
              <button>My Orders</button>
            </div>
          </div>

          <div className={classes.Footer}>
            <div onClick={navigateToLogout}>
              <i className='bx bx-exit'></i>
              <button>Logout</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return content;
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(UserMenu);
