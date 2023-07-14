"use client";
import { all, fork } from "redux-saga/effects";
import productsSaga from "./products/productsSaga";
import cartSaga from "./cart/cartSaga";
function* rootSaga() {
  yield all([fork(productsSaga), fork(cartSaga)]);
}
// , fork(loginSaga)
export default rootSaga;
