import * as PhonesAPIUtil from "../utils/PhonesAPI";

// REMOVE_ITEM
export const REMOVE_ITEM = "REMOVE_ITEM";

export const removeItem = id => {
  return {
    type: REMOVE_ITEM,
    id
  };
};

// FETCH_PHONES
export const FETCH_PHONES = "FETCH_PHONES";

export const getAllPhones = () => {
  return dispatch => {
    PhonesAPIUtil.getAll()
      .then(res => res)
      .then(phones => {
        dispatch({
          type: FETCH_PHONES,
          phones
        });
      });
  };
};

// ADD_ITEM
export const ADD_ONE_ITEM = "ADD_ONE_ITEM";

export const addOneItem = id => {
  return {
    type: ADD_ONE_ITEM,
    id
  };
};

// REMOVE_ITEM
export const REMOVE_ONE_ITEM = "REMOVE_ONE_ITEM";

export const removeOneItem = id => {
  return {
    type: REMOVE_ONE_ITEM,
    id
  };
};
