import React, { useContext } from 'react';
import { SignUpContext } from '../../context/signUpContext';
import { SignInContext } from '../../context/signInContext';

import classes from './Home.module.css';

import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

const Home = () => {
  const { onDisplaySignUpModal } = useContext(SignUpContext);
  const { onDisplaySignInModal, onSignInFormSubmit } = useContext(
    SignInContext
  );

  const onNavToSignUpHanlder = () => {
    onDisplaySignUpModal();
  };

  const onNavToSignInHanlder = () => {
    onDisplaySignInModal();
  };

  const onSignInAsGuestHandler = () => {
    const guest = {
      email: 'guest@gmail.com',
      password: '123456',
    };
    onSignInFormSubmit(guest);
  };

  return (
    <div className={classes.Home}>
      <div className={classes.Info}>
        <p>
          For <span>sushi</span> lovers
        </p>
        <h2>
          Enjoy our <span>sushi</span> collection
        </h2>
      </div>
      <div className={classes.Navigation}>
        <div
          className={classes.GuestNavigation}
          onClick={onSignInAsGuestHandler}
        >
          <p>Try As Guest</p>
        </div>
        <div
          className={classes.SignUpNavigation}
          onClick={onNavToSignUpHanlder}
        >
          <p>Sign Up</p>
        </div>
        <div
          className={classes.SignInNavigation}
          onClick={onNavToSignInHanlder}
        >
          <p>I already have an account</p>
          <div className={classes.Line}></div>
        </div>
      </div>
      <SignUp />
      <SignIn />
    </div>
  );
};

export default Home;
