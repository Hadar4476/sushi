import React, { useContext } from 'react';
import { SignUpContext } from '../../context/signUpContext';
import { SignInContext } from '../../context/signInContext';

import classes from './Home.module.css';

import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

const Home = () => {
  const { onDisplaySignUpModal } = useContext(SignUpContext);
  const { onDisplaySignInModal } = useContext(SignInContext);

  const onNavToSignUpHanlder = () => {
    onDisplaySignUpModal();
  };

  const onNavToSignInHanlder = () => {
    onDisplaySignInModal();
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
