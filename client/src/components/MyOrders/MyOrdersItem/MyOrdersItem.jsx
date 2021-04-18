import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import * as actions from '../../../store/actions';

import classes from './MyOrdersItem.module.css';

import Receipt from '../../../assets/images/MyOrdersItem/receipt.png';
import { connect } from 'react-redux';

const MyOrdersItem = (props) => {
  const {
    address,
    cart,
    createdAt,
    name,
    phone,
    totalPrice,
    onOrderAgain,
    onShowCart,
  } = props;

  const [showMoreInfoState, setShowMoreInfoState] = useState(false);

  const moreInfoIconClasses = [
    'bx bxs-chevron-left bx-rotate-270',
    'bx bxs-chevron-left bx-rotate-90',
  ];

  const history = useHistory();

  const toggleMoreInfo = () => {
    setShowMoreInfoState(
      (currentShowMoreInfoState) => !currentShowMoreInfoState
    );
  };

  const onOrderAgainHandler = () => {
    onOrderAgain(cart);
    onShowCart();
    history.push('/');
  };

  let cartItemsElementsArray = [];
  if (cart.length) {
    cartItemsElementsArray = cart.map((item) => (
      <div key={item.name} className={classes.CartItem}>
        <span>{item.name}</span>
        <span>${item.price}</span>
        <span>x{item.amount}</span>
        <span>${item.price * item.amount}</span>
      </div>
    ));
  }

  return (
    <div
      className={
        !showMoreInfoState
          ? classes.MyOrdersItem
          : [classes.MyOrdersItem, classes.Expand].join(' ')
      }
    >
      <div className={classes.Header}>
        <div className={classes.Receipt}>
          <img src={Receipt} alt='receipt icon' />
        </div>
        <div className={classes.Date}>
          <span>{createdAt}</span>
        </div>
      </div>
      <div className={classes.Body}>
        <div className={classes.ContactInfo}>
          <span>Contact Info</span>
          <div className={classes.OrderdBy}>
            <span title={name}>Sent for: {name}</span>
          </div>
          <div className={classes.Address}>
            <span title={address}>Sent to: {address}</span>
          </div>
          <div className={classes.Phone}>
            <span title={phone}>Phone Number: {phone}</span>
          </div>
        </div>
        <div className={classes.CartDetails}>
          <span>Cart Details</span>
          <div className={classes.Details}>
            <span>Name</span>
            <span>Qty</span>
            <span>Amount</span>
            <span>Total</span>
          </div>
          {cartItemsElementsArray}
        </div>
        <div className={classes.TotalPrice}>
          <h5>Total Price:</h5>
          <span>${totalPrice}</span>
        </div>
        <div className={classes.OrderAgain} onClick={onOrderAgainHandler}>
          <button>Order Again</button>
        </div>
        <div className={classes.MoreInfo} onClick={toggleMoreInfo}>
          <i
            className={
              !showMoreInfoState
                ? moreInfoIconClasses[0]
                : moreInfoIconClasses[1]
            }
          ></i>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onShowCart: () => dispatch(actions.showCart()),
    onOrderAgain: (cart) => dispatch(actions.orderAgain(cart)),
  };
};

export default connect(null, mapDispatchToProps)(MyOrdersItem);
