import axios from "axios";
import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { FETCH_CART_REQUEST } from "../actionTypes";
import { ICart } from "./cartTypes";
import { fetchCartFailure, fetchCartSuccess } from "./cartAction";

const header = `Authorization: Bearer ${localStorage.getItem("token")}`;
const getCart = () =>
  axios.get<ICart>("http://10.89.84.42:8080/cart", {
    headers: { header },
  });

function* fetchCartSaga(): any {
  try {
    const res = yield call(getCart);
    yield put(
      fetchCartSuccess({
        cart: res.data,
      })
    );
  } catch (e: any) {
    yield put(
      fetchCartFailure({
        error: e.message,
      })
    );
  }
}

function* cartSaga() {
  yield all([takeLatest(FETCH_CART_REQUEST, fetchCartSaga)]);
}

export default cartSaga;
