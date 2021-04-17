import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import * as actions from '../../store/actions';

import classes from './MyOrders.module.css';

const MyOrders = (props) => {
  const { myOrders, onInitMyOrders } = props;

  const [myOrdersState, setMyOrdersState] = useState([]);

  const history = useHistory();

  useEffect(() => {
    onInitMyOrders();
  }, [onInitMyOrders]);

  useEffect(() => {
    if (myOrders.length) {
      setMyOrdersState(myOrders);
    }
  }, [myOrders]);

  const navigateToHome = () => {
    history.push('/');
  };

  let content = (
    <div className={classes.Empty}>
      <h2>Looks like your orders history is empty</h2>
      <p>Make an order</p>
      <div className={classes.GoBackIcon} onClick={navigateToHome}>
        <i className='fas fa-plus'></i>
      </div>
    </div>
  );
  if (myOrdersState.length) {
    content = <div className={classes.MyOrders}></div>;
  }

  return content;
};

const mapStateToProps = (state) => {
  return {
    myOrders: state.myOrders.myOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitMyOrders: () => dispatch(actions.initMyOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
