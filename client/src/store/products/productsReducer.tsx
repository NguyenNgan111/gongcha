import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "../actionTypes";

import { ProductsActions, ProductsState } from "./productTypes";

const initProductState: ProductsState = {
  pending: false,
  products: [],
  error: null,
};

export default (state = initProductState, action: ProductsActions) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        pending: false,
        products: action.payload.products,
        error: null,
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        pending: false,
        products: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
