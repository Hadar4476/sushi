export const updateObject = (state, props) => {
  return {
    ...state,
    ...props,
  };
};

export const checkValidity = (value, controlName) => {
  let isValid = false;
  let trimValue = value.trim().toLowerCase();
  switch (controlName) {
    case 'email':
    case 'password':
      isValid = trimValue.length > 5;
      break;
    case 'username':
    case 'name':
      isValid = /[a-z]+/gi.test(trimValue) && trimValue.length > 2;
      break;
    case 'phone':
      isValid = /^0[2-9]\d{7,8}$/.test(trimValue);
      break;
    default:
      isValid = true;
      break;
  }
  return isValid;
};
