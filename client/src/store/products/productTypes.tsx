import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "../actionTypes";

export interface IProduct {
  name: string;
  description: string[];
  discount: string;
  type: { size: string; price: string }[];
  url: string;
  category: string;
  year: string;
}

export interface ProductsState {
  pending: boolean;
  products: IProduct[];
  error: string | null;
}

export interface FetchProductsSuccessPayload {
  products: IProduct[];
}

export interface FetchProductsFailurePayload {
  error: string;
}

export interface FetchProductsRequest {
  type: typeof FETCH_PRODUCTS_REQUEST;
}

export type FetchProductsSuccess = {
  type: typeof FETCH_PRODUCTS_SUCCESS;
  payload: FetchProductsSuccessPayload;
};

export type FetchProductsFailure = {
  type: typeof FETCH_PRODUCTS_FAILURE;
  payload: FetchProductsFailurePayload;
};

export type ProductsActions =
  | FetchProductsRequest
  | FetchProductsSuccess
  | FetchProductsFailure;
