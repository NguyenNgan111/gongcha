import {
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
} from "../actionTypes";

import { IProduct } from "../products/productTypes";

export interface ICart {
  cartList: { idProduct: IProduct; quantity: number }[];
}

export interface CartState {
  pending: boolean;
  cart: ICart;
  error: string | null;
}

export interface FetchCartSuccessPayload {
  cart: ICart;
}

export interface FetchCartFailurePayload {
  error: string;
}

export interface FetchCartRequest {
  type: typeof FETCH_CART_REQUEST;
}

export type FetchCartSuccess = {
  type: typeof FETCH_CART_SUCCESS;
  payload: FetchCartSuccessPayload;
};

export type FetchCartFailure = {
  type: typeof FETCH_CART_FAILURE;
  payload: FetchCartFailurePayload;
};

export type CartActions =
  | FetchCartRequest
  | FetchCartSuccess
  | FetchCartFailure;
