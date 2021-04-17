import React, { useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { SignInContext } from './context/signInContext';
import asyncComponent from './hoc/asyncComponent';

import * as actions from './store/actions';

import $ from 'jquery';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Logout from './components/Logout/Logout';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Page404 from './components/Page404/Page404';

import MyOrders from './components/MyOrders/MyOrders';

const asyncMenu = asyncComponent(() => import('./components/Menu/Menu'));

const tokenKey = 'token';

const App = (props) => {
  const { isTokenValid } = useContext(SignInContext);
  const { user, getAuthenticatedUserHandler } = props;

  const userToken = localStorage.getItem(tokenKey);
  useEffect(() => {
    if (userToken) {
      getAuthenticatedUserHandler();
      document.body.style.background = 'white';
      $('nav').attr('style', 'background:white;border-bottom:1px solid silver');
      $('footer').attr('style', 'color:black');
    } else {
      document.body.style.background = '';
      $('nav').attr('style', 'background:transparent;border-bottom: none');
      $('footer').attr('style', 'color:white');
    }
  }, [userToken, getAuthenticatedUserHandler, isTokenValid]);

  let welcomePage = <Route exact path='/' component={Home} />;
  if (userToken) {
    welcomePage = <Route exact path='/' component={asyncMenu} />;
  }

  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Switch>
          <ProtectedRoute user={user} path='/my-orders' component={MyOrders} />
          <Route path='/logout' component={Logout} />
          {welcomePage}
          <Route path='*' exact component={Page404} />
        </Switch>
      </main>
      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDipatchToProps = (dispatch) => {
  return {
    getAuthenticatedUserHandler: () => dispatch(actions.getAuthenticatedUser()),
  };
};

export default connect(mapStateToProps, mapDipatchToProps)(App);
