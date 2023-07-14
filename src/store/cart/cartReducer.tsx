import {
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
} from "../actionTypes";

import { CartActions, CartState } from "./cartTypes";

const initCartState: CartState = {
  pending: false,
  cart: { cartList: [] },
  error: null,
};

export default (state = initCartState, action: CartActions) => {
  switch (action.type) {
    case FETCH_CART_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_CART_SUCCESS:
      return {
        ...state,
        pending: false,
        cart: action.payload.cart,
        error: null,
      };
    case FETCH_CART_FAILURE:
      return {
        ...state,
        pending: false,
        cart: { cartList: [] },
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
