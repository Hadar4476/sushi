import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { url } from '../../../myaxios';

import classes from './DishManager.module.css';

import * as actions from '../../../store/actions';

import $ from 'jquery';

const animateCSSClasses = {
  fadeIn: 'animate__animated animate__fadeIn',
  fadeInDown: 'animate__animated animate__fadeInDown',
};

const DishManager = (props) => {
  const {
    selectedDish,
    displayModal,
    onHideModal,
    onIncreaseAmount,
    onDecreaseAmount,
    onConfirmSelectedDish,
    cart,
  } = props;

  const [selectedDishState, setSelectedDishState] = useState({});

  const isSelectedDishInCart = cart.some(
    (item) => item.name === selectedDishState.name
  );

  const darkBoxClasses = [classes.DarkBox, animateCSSClasses.fadeIn];
  const dishManagerClasses = [
    classes.DishManager,
    animateCSSClasses.fadeInDown,
  ];
  const ingredientsClasses = [classes.Ingredients, 'row row-cols-3'];

  useEffect(() => {
    if (selectedDish.name) {
      setSelectedDishState(selectedDish);
    }
  }, [selectedDish]);

  const onHideModalHandler = () => {
    onHideModal();
  };

  const onIncreaseAmountHandler = () => {
    onIncreaseAmount();
  };

  const onDecreaseAmountHandler = () => {
    if (selectedDishState.amount === 1) return;
    onDecreaseAmount();
  };

  const onConfirmSelectedDishHandler = () => {
    if (isSelectedDishInCart) return;
    const filterSelectedDish = {
      name: selectedDishState.name,
      amount: selectedDishState.amount,
      imagePath: selectedDishState.imagePath,
      price: selectedDishState.price,
    };
    onConfirmSelectedDish(filterSelectedDish);
    onHideModal();
    $(window).scrollTop(0);
  };

  let content = null;
  if (displayModal && selectedDishState.name) {
    const { name, imagePath, ingredients, price, amount } = selectedDishState;

    const dynamicPrice = price * amount;

    const ingredientsElements = ingredients.map((item) => {
      const capitalizeItemName = item
        .split('-')
        .map((subItem) => subItem[0].toUpperCase() + subItem.slice(1))
        .join(' ');
      return (
        <div key={item} className={classes.Ingredient}>
          <img src={`${url}/images/ingredients/${item}.png`} alt={item} />
          <span>{capitalizeItemName}</span>
        </div>
      );
    });

    content = (
      <React.Fragment>
        <div
          className={darkBoxClasses.join(' ')}
          onClick={onHideModalHandler}
        ></div>
        <div className={dishManagerClasses.join(' ')}>
          <div className={classes.Header}>
            <i className='fas fa-times' onClick={onHideModalHandler}></i>
            <h1>{name}</h1>
          </div>
          <div className={classes.Body}>
            <div className={classes.Image}>
              <img src={`${url}/images/dishTypes/${imagePath}`} alt={name} />
            </div>
            <div className={classes.IngredientsWrapper}>
              <span>What's inside?</span>
              <div className={ingredientsClasses.join(' ')}>
                {ingredientsElements}
              </div>
            </div>
            <div className={isSelectedDishInCart ? 'd-none' : classes.Price}>
              <span>
                <span className={classes.Dollar}>$</span>
                {dynamicPrice}
              </span>
            </div>
            <div
              className={
                isSelectedDishInCart ? 'd-none' : classes.AmountManagerWrapper
              }
            >
              <span>Choose amount:</span>
              <div className={classes.AmountManager}>
                <button
                  className={classes.Icon}
                  disabled={amount === 1}
                  onClick={onDecreaseAmountHandler}
                >
                  <i className='bx bx-minus-circle'></i>
                </button>
                <div className={classes.Amount}>
                  <span>{amount}</span>
                  <div className={classes.Line}></div>
                </div>
                <button
                  className={classes.Icon}
                  onClick={onIncreaseAmountHandler}
                >
                  <i className='bx bx-plus-circle'></i>
                </button>
              </div>
            </div>
          </div>
          <div
            className={classes.Confirm}
            onClick={onConfirmSelectedDishHandler}
          >
            <button disabled={isSelectedDishInCart}>
              {isSelectedDishInCart ? 'In Cart' : 'Confirm'}
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return content;
};

const mapStateToProps = (state) => {
  return {
    displayModal: state.orderManager.displayManager,
    selectedDish: state.orderManager.selectedDish,
    cart: state.orderManager.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHideModal: () => dispatch(actions.hideModal()),
    onIncreaseAmount: () => dispatch(actions.increaseAmount()),
    onDecreaseAmount: () => dispatch(actions.decreaseAmount()),
    onConfirmSelectedDish: (selectedDish) =>
      dispatch(actions.confirmSelectedDish(selectedDish)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DishManager);
