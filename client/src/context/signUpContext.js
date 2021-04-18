import React, { useState, useContext } from 'react';
import { SignInContext } from './signInContext';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';
import axios from '../myaxios';

import $ from 'jquery';

export const SignUpContext = React.createContext({
  formModal: {},
  displaySignUpModal: false,
  error: null,
  onDisplaySignUpModal: () => {},
  onHideSignUpModal: () => {},
  updateFormModal: () => {},
  onSignUpFormSubmit: () => {},
});

const SignUpContextProvider = (props) => {
  const [formModalState, setFormModalState] = useState({
    username: {
      elementType: 'input',
      labelHTML: 'Username',
      elementConfig: {
        type: 'text',
      },
      value: '',
      valid: false,
    },
    email: {
      elementType: 'input',
      labelHTML: 'Email',
      elementConfig: {
        type: 'email',
      },
      value: '',
      valid: false,
    },
    password: {
      elementType: 'input',
      labelHTML: 'Password',
      elementConfig: {
        type: 'password',
      },
      value: '',
      valid: false,
    },
  });

  const [displaySignUpModalState, setDisplaySignUpModalState] = useState(false);

  const [errorState, setErrorState] = useState(null);

  const { onDisplaySignInModal } = useContext(SignInContext);

  const onDisplaySignUpModal = () => {
    $(window).scrollTop(0);
    const windowWidth = $(window).width();
    if (windowWidth >= 500) {
      disableBodyScroll(document.getElementsByTagName('body')[0]);
    }
    setDisplaySignUpModalState(true);
  };

  const onHideSignUpModal = () => {
    $(window).scrollTop(0);
    enableBodyScroll(document.getElementsByTagName('body')[0]);
    setErrorState(null);
    setDisplaySignUpModalState(false);
  };

  const updateFormModal = (updatedFormModal) => {
    setFormModalState(updatedFormModal);
  };

  const onSignUpFormSubmit = async (user) => {
    await axios
      .post('/users', user)
      .then((response) => {
        const copyFormModal = { ...formModalState };
        for (const key in copyFormModal) {
          copyFormModal[key].value = '';
          copyFormModal[key].valid = false;
        }
        updateFormModal(copyFormModal);
        onHideSignUpModal();
        onDisplaySignInModal();
      })
      .catch((error) => setErrorState(error.response.data));
  };

  return (
    <SignUpContext.Provider
      value={{
        formModal: formModalState,
        displaySignUpModal: displaySignUpModalState,
        error: errorState,
        onDisplaySignUpModal: onDisplaySignUpModal,
        onHideSignUpModal: onHideSignUpModal,
        updateFormModal: updateFormModal,
        onSignUpFormSubmit: onSignUpFormSubmit,
      }}
    >
      {props.children}
    </SignUpContext.Provider>
  );
};

export default SignUpContextProvider;
