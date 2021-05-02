import React from 'react';
import { connect } from 'react-redux';
import { checkValidity } from '../../../../../shared/utility';

import * as actions from '../../../../../store/actions';

import classes from './ContactForm.module.css';

import Input from '../../../../UI/Input/Input';
import Spinner from '../../../../UI/Spinner/Spinner';

const ContactForm = (props) => {
  const {
    displayModal,
    contactForm,
    onUpdateContactForm,
    cart,
    onStartLoading,
    onSubmitOrder,
  } = props;

  const inputChangedHandler = ({ target }, controlName) => {
    const updatedFormControls = { ...contactForm };
    const { value } = target;
    updatedFormControls[controlName].value = value;
    updatedFormControls[controlName].valid = checkValidity(value, controlName);
    onUpdateContactForm(updatedFormControls);
  };

  const onResetInput = (controlName) => {
    const updatedFormControls = { ...contactForm };
    updatedFormControls[controlName].value = '';
    updatedFormControls[controlName].valid = false;
    onUpdateContactForm(updatedFormControls);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    let order = {};
    order['cart'] = cart;
    order['totalPrice'] = cart
      .map((item) => item.amount * item.price)
      .reduce((accumulator, item) => accumulator + item, 0);
    for (let key in contactForm) {
      order[key] = contactForm[key].value;
    }
    onStartLoading();
    setTimeout(() => {
      onSubmitOrder(order);
    }, 2000);
  };

  const formElementsArray = [];
  for (const key in contactForm) {
    formElementsArray.push({
      id: key,
      config: contactForm[key],
    });
  }

  const mapFormInputsValidations = formElementsArray.map(
    (item) => item.config.valid
  );
  let isFormValid = false;
  if (mapFormInputsValidations.every((item) => item)) {
    isFormValid = true;
  }

  let content = null;
  if (displayModal) {
    const form = formElementsArray.map((item) => (
      <Input
        key={item.id}
        fieldName={item.id}
        elementType={item.config.elementType}
        labelHTML={item.config.labelHTML}
        elementConfig={item.config.elementConfig}
        value={item.config.value}
        invalid={!item.config.valid}
        changed={(event) => inputChangedHandler(event, item.id)}
        resetInput={() => onResetInput(item.id)}
      />
    ));
    content = (
      <form onSubmit={onFormSubmit} className={classes.ContactForm}>
        <div className={classes.FormGroupWrapper}>{form}</div>
        <Spinner />
        <div className={classes.Confirm}>
          <button disabled={!isFormValid}>Confirm</button>
        </div>
      </form>
    );
  }
  return content;
};

const mapStateToProps = (state) => {
  return {
    displayModal: state.orderManager.displayContactForm,
    contactForm: state.orderManager.contactForm,
    cart: state.orderManager.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateContactForm: (updatedForm) =>
      dispatch(actions.updateContactForm(updatedForm)),
    onStartLoading: () => dispatch(actions.startLoading()),
    onSubmitOrder: (order) => dispatch(actions.submitOrder(order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
