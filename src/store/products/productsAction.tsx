import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "../actionTypes";

import {
  FetchProductsRequest,
  FetchProductsSuccess,
  FetchProductsSuccessPayload,
  FetchProductsFailure,
  FetchProductsFailurePayload,
} from "./productTypes";

export const fetchProductsRequest = (): FetchProductsRequest => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (
  payload: FetchProductsSuccessPayload
): FetchProductsSuccess => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload,
});

export const fetchProductsFailure = (
  payload: FetchProductsFailurePayload
): FetchProductsFailure => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload,
});
