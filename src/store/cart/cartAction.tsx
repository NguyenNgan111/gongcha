import {
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
} from "../actionTypes";

import {
  FetchCartRequest,
  FetchCartSuccess,
  FetchCartSuccessPayload,
  FetchCartFailure,
  FetchCartFailurePayload,
} from "./cartTypes";

export const fetchCartRequest = (): FetchCartRequest => ({
  type: FETCH_CART_REQUEST,
});

export const fetchCartSuccess = (
  payload: FetchCartSuccessPayload
): FetchCartSuccess => ({
  type: FETCH_CART_SUCCESS,
  payload,
});

export const fetchCartFailure = (
  payload: FetchCartFailurePayload
): FetchCartFailure => ({
  type: FETCH_CART_FAILURE,
  payload,
});
