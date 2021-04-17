import React, { useState } from 'react';
import { connect } from 'react-redux';
import { url } from '../../../../../myaxios';

import classes from './CartItem.module.css';

import * as actions from '../../../../../store/actions';

const CartItem = (props) => {
  const {
    name,
    amount,
    imagePath,
    price,
    onRemoveCartItem,
    onIncreaseAmount,
    onDecreaseAmount,
  } = props;

  const dynamicPrice = price * amount;

  const onRemoveCartItemHandler = () => {
    onRemoveCartItem(name);
  };

  const onIncreaseAmountHandler = () => {
    onIncreaseAmount(name);
  };

  const onDecreaseAmountHandler = () => {
    if (amount === 1) return;
    onDecreaseAmount(name);
  };

  return (
    <div className={classes.CartItem}>
      <div className={classes.Image}>
        <img src={`${url}/images/dishTypes/${imagePath}`} alt={name} />
      </div>
      <div className={classes.Info}>
        <div className={classes.Name}>
          <span>{name}</span>
        </div>
        <div className={classes.Price}>
          <span>
            <span className={classes.Dollar}>$</span>
            {dynamicPrice}
          </span>
        </div>
      </div>
      <div className={classes.Manager}>
        <div className={classes.Trash} onClick={onRemoveCartItemHandler}>
          <i className='bx bxs-trash'></i>
        </div>
        <div className={classes.AmountManager}>
          <button
            className={classes.Icon}
            disabled={amount === 1}
            onClick={onDecreaseAmountHandler}
          >
            <i className='bx bxs-minus-square'></i>{' '}
          </button>
          <div className={classes.Amount}>
            <span>{amount}</span>
          </div>
          <button className={classes.Icon} onClick={onIncreaseAmountHandler}>
            <i className='bx bxs-plus-square'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveCartItem: (cartItem) => dispatch(actions.removeCartItem(cartItem)),
    onIncreaseAmount: (cartItem) =>
      dispatch(actions.increaseAmountAtCart(cartItem)),
    onDecreaseAmount: (cartItem) =>
      dispatch(actions.decreaseAmountAtCart(cartItem)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
