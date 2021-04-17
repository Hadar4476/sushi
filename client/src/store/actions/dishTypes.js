import * as actionTypes from './actionTypes';

export const initSushiTypes = () => {
  return {
    type: actionTypes.INIT_SUSHI_TYPES,
  };
};
export const initSushiTypesSuccess = (fetchedSushiTypes) => {
  return {
    type: actionTypes.INIT_SUSHI_TYPES_SUCCESS,
    fetchedSushiTypes: fetchedSushiTypes,
  };
};
export const initSushiTypesFail = (error) => {
  return {
    type: actionTypes.INIT_SUSHI_TYPES_FAIL,
    error: error,
  };
};

export const initVeganTypes = () => {
  return {
    type: actionTypes.INIT_VEGAN_TYPES,
  };
};
export const initVeganTypesSuccess = (fetchedVeganTypes) => {
  return {
    type: actionTypes.INIT_VEGAN_TYPES_SUCCESS,
    fetchedVeganTypes: fetchedVeganTypes,
  };
};
export const initVeganTypesFail = (error) => {
  return {
    type: actionTypes.INIT_VEGAN_TYPES_FAIL,
    error: error,
  };
};

export const initWokTypes = () => {
  return {
    type: actionTypes.INIT_WOK_TYPES,
  };
};
export const initWokTypesSuccess = (fetchedWokTypes) => {
  return {
    type: actionTypes.INIT_WOK_TYPES_SUCCESS,
    fetchedWokTypes: fetchedWokTypes,
  };
};
export const initWokTypesFail = (error) => {
  return {
    type: actionTypes.INIT_WOK_TYPES_FAIL,
    error: error,
  };
};

export const searchForDishType = (searchInput) => {
  return {
    type: actionTypes.SEARCH_FOR_DISH_TYPE,
    searchInput: searchInput,
  };
};

export const updateDishTypes = (updatedDishTypes) => {
  return {
    type: actionTypes.UPDATE_DISH_TYPES,
    updatedDishTypes: updatedDishTypes,
  };
};
