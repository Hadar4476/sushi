import React from 'react';
import { connect } from 'react-redux';

import classes from './Spinner.module.css';

const Spinner = (props) => {
  const { loading } = props;

  let content = null;
  if (loading) {
    content = (
      <div className={classes.Box}>
        <div className={classes.Spinner}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return content;
};

const mapStateToProps = (state) => {
  return {
    loading: state.orderManager.loading,
  };
};

export default connect(mapStateToProps)(Spinner);
