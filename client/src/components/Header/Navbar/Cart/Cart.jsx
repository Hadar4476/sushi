import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { enableBodyScroll } from 'body-scroll-lock';

import * as actions from '../../../../store/actions';

import classes from './Cart.module.css';

import CartItem from './CartItem/CartItem';
import ContactForm from './ContactForm/ContactForm';
import Spinner from '../../../UI/Spinner/Spinner';

const animateCSSClasses = {
  fadeIn: 'animate__animated animate__fadeIn',
  fadeInDown: 'animate__animated animate__fadeInDown',
};

const Cart = (props) => {
  const {
    user,
    cart,
    displayModal,
    onHideCart,
    onStartLoading,
    loading,
    onRenderContactForm,
    displayContactForm,
  } = props;

  const darkBoxClasses = [classes.DarkBox, animateCSSClasses.fadeIn];
  const cartClasses = [classes.Cart, animateCSSClasses.fadeInDown];

  const [cartState, setCartState] = useState([]);

  useEffect(() => {
    setCartState(cart);
  }, [cart]);

  useEffect(() => {
    if (!cart.length) {
      enableBodyScroll(document.getElementsByTagName('body')[0]);
      onHideCart();
    }
  }, [cart, onHideCart]);

  const onHideCartHandler = () => {
    if (loading) return;
    enableBodyScroll(document.getElementsByTagName('body')[0]);
    onHideCart();
  };

  const onGoToUserContactForm = () => {
    if (loading) return;
    onStartLoading();
    setTimeout(() => {
      onRenderContactForm();
    }, 2000);
  };

  let cartElements = null;
  if (cartState.length && !displayContactForm) {
    cartElements = cartState.map((item) => (
      <CartItem
        key={item.name}
        name={item.name}
        amount={item.amount}
        imagePath={item.imagePath}
        price={item.price}
      />
    ));
  }

  let content = null;
  if (displayModal) {
    const total = cart
      .map((item) => item.amount * item.price)
      .reduce((accumulator, item) => accumulator + item, 0);

    content = (
      <React.Fragment>
        <div
          className={darkBoxClasses.join(' ')}
          onClick={onHideCartHandler}
        ></div>
        <div className={cartClasses.join(' ')}>
          <div className={classes.Header}>
            <i className='fas fa-times' onClick={onHideCartHandler}></i>
            <h1>{!displayContactForm ? 'Your Cart' : 'Contact Details'}</h1>
          </div>
          <div className={classes.Body}>
            <div className={classes.Total}>
              <h4>Total Price:</h4>
              <span>
                <span className={classes.Dollar}>$</span>
                {total}
              </span>
            </div>
            <Spinner />
            <ContactForm />
            {cartElements}
          </div>
          <div
            className={
              cart.length && !displayContactForm ? classes.Next : 'd-none'
            }
            onClick={onGoToUserContactForm}
          >
            <button disabled={loading}>Next</button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return content;
};

const mapStateToProps = (state) => {
  return {
    cart: state.orderManager.cart,
    displayModal: state.orderManager.displayCart,
    displayContactForm: state.orderManager.displayContactForm,
    loading: state.orderManager.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHideCart: () => dispatch(actions.hideCart()),
    onStartLoading: () => dispatch(actions.startLoading()),
    onRenderContactForm: () => dispatch(actions.renderContactForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
