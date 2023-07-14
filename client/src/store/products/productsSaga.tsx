import axios from "axios";
import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { FetchProductsFailure, FetchProductsSuccess } from "./productTypes";
import { FETCH_PRODUCTS_REQUEST } from "../actionTypes";
import { IProduct } from "./productTypes";
import { fetchProductsFailure, fetchProductsSuccess } from "./productsAction";

const header = `Authorization: Bearer ${localStorage.getItem("token")}`;
const getProducts = () =>
  axios.get<IProduct[]>("http://10.89.84.42:8080/products", {
    headers: { header },
  });

function* fetchProductsSaga(): any {
  try {
    const res = yield call(getProducts);
    yield put(
      fetchProductsSuccess({
        products: res.data,
      })
    );
  } catch (e: any) {
    yield put(
      fetchProductsFailure({
        error: e.message,
      })
    );
  }
}

function* productsSaga() {
  yield all([takeLatest(FETCH_PRODUCTS_REQUEST, fetchProductsSaga)]);
}

export default productsSaga;
