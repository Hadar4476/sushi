import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import * as actions from '../../store/actions';

import classes from './MyOrders.module.css';

import MyOrdersItem from './MyOrdersItem/MyOrdersItem';

const MyOrders = (props) => {
  const { user, myOrders, onInitMyOrders, error, loading } = props;

  const [myOrdersState, setMyOrdersState] = useState([]);

  const history = useHistory();

  useEffect(() => {
    onInitMyOrders();
  }, [onInitMyOrders]);

  useEffect(() => {
    if (myOrders.length) {
      setMyOrdersState(myOrders.reverse());
    }
  }, [myOrders]);

  const navigateToHome = () => {
    history.push('/');
  };

  let errorMessage = null;
  if (error || (!myOrders.length && !loading)) {
    errorMessage = (
      <div className={classes.Empty}>
        <h2>Looks like your orders history is empty</h2>
        <p>Make an order</p>
        <div className={classes.GoBackIcon} onClick={navigateToHome}>
          <i className='fas fa-plus'></i>
        </div>
      </div>
    );
  }

  let myOrdersElements = null;
  if (myOrdersState.length) {
    myOrdersElements = myOrdersState.map((item) => (
      <MyOrdersItem
        key={item._id}
        address={item.address}
        cart={item.cart}
        createdAt={item.createdAt}
        name={item.name}
        phone={item.phone}
        totalPrice={item.totalPrice}
      />
    ));
  }

  let headerContent = null;
  if (user && user.username) {
    headerContent = <h1>{user.username}'s Orders</h1>;
  }

  return (
    <div className={classes.MyOrders}>
      <div className={classes.Header}>{headerContent}</div>
      {errorMessage}
      <div className={classes.Body}>{myOrdersElements}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myOrders: state.myOrders.myOrders,
    error: state.myOrders.error,
    loading: state.myOrders.loading,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitMyOrders: () => dispatch(actions.initMyOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
