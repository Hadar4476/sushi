import { updateObject } from '../../shared/utility';

import * as actionTypes from '../actions/actionTypes';

const initalState = {
  dishTypes: [],
  error: null,
};

const initSushiTypes = (state, action) => {
  return updateObject(state, action);
};
const initSushiTypesSuccess = (state, action) => {
  return updateObject(state, { dishTypes: action.fetchedSushiTypes });
};
const initSushiTypesFail = (state, action) => {
  return updateObject(state, { error: action.error });
};

const initVeganTypes = (state, action) => {
  return updateObject(state, action);
};
const initVeganTypesSuccess = (state, action) => {
  return updateObject(state, { dishTypes: action.fetchedVeganTypes });
};
const initVeganTypesFail = (state, action) => {
  return updateObject(state, { error: action.error });
};

const initWokTypes = (state, action) => {
  return updateObject(state, action);
};
const initWokTypesSuccess = (state, action) => {
  return updateObject(state, { dishTypes: action.fetchedWokTypes });
};
const initWokTypesFail = (state, action) => {
  return updateObject(state, { error: action.error });
};

const searchForDishType = (state, action) => {
  return updateObject(state, action);
};
const updateDishTypes = (state, action) => {
  return updateObject(state, { dishTypes: action.updatedDishTypes });
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.INIT_SUSHI_TYPES:
      return initSushiTypes(state, action);
    case actionTypes.INIT_SUSHI_TYPES_SUCCESS:
      return initSushiTypesSuccess(state, action);
    case actionTypes.INIT_SUSHI_TYPES_FAIL:
      return initSushiTypesFail(state, action);
    case actionTypes.INIT_VEGAN_TYPES:
      return initVeganTypes(state, action);
    case actionTypes.INIT_VEGAN_TYPES_SUCCESS:
      return initVeganTypesSuccess(state, action);
    case actionTypes.INIT_VEGAN_TYPES_FAIL:
      return initVeganTypesFail(state, action);
    case actionTypes.INIT_WOK_TYPES:
      return initWokTypes(state, action);
    case actionTypes.INIT_WOK_TYPES_SUCCESS:
      return initWokTypesSuccess(state, action);
    case actionTypes.INIT_WOK_TYPES_FAIL:
      return initWokTypesFail(state, action);
    case actionTypes.SEARCH_FOR_DISH_TYPE:
      return searchForDishType(state, action);
    case actionTypes.UPDATE_DISH_TYPES:
      return updateDishTypes(state, action);
    default:
      return state;
  }
};

export default reducer;
