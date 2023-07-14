import axios from "axios";
import {
  all,
  call,
  take,
  cancelled,
  cancel,
  put,
  fork,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import { SignInFailure, SignInSuccess } from "./loginTypes";
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
} from "../../actionTypes";
import { setUser, unsetUser } from "../userActions";
import { USER_UNSET } from "../../actionTypes";
import { signInFailure, signInSuccess } from "./loginAction";
import { useRouter } from "next/navigation";
const route = useRouter();

function login(phone: string, pwd: string) {
  return fetch("http://10.89.84.42:8080/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, pwd }),
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
}

function* logout() {
  yield put(unsetUser());
  localStorage.removeItem("token");
  route.push("/login");
}

// const signIn = () => axios.post<IUser>("http://10.89.84.42:8080/user/login");
// const signIn = ({ phone, pwd }: IUser) => {
//   const route = useRouter();
//   const token = localStorage.getItem("token");
//   axios({
//     method: "post",
//     headers: { Authorization: `Bearer ${token}` },
//     url: "http://10.89.84.42:8080/user/login",
//     data: {
//       phone,
//       pwd,
//     },
//   })
//     .then((res) => {
//       localStorage.setItem("token", res.data.accessToken);
//       route.push("/user");
//     })
//     .catch((error) => console.log(error));
// };

function* loginFlow(phone: string, pwd: string): any {
  let token;
  try {
    token = yield call(login, phone, pwd);
    yield put(setUser(token));
    yield put({ type: SIGN_IN_SUCCESS });
    localStorage.setItem("token", JSON.stringify(token));
    route.push("/");
  } catch (error) {
    yield put({ type: SIGN_IN_FAILURE, error });
  } finally {
    if (yield cancelled()) {
      route.push("/");
    }
  }
  return token;
}

function* loginWatcher(): any {
  while (true) {
    const { phone, pwd } = yield take(SIGN_IN_REQUEST);
    const task = yield fork(loginFlow, phone, pwd);
    const action = yield take([USER_UNSET, SIGN_IN_FAILURE]);
    if (action.type === USER_UNSET) yield cancel(task);
    yield call(logout);
  }
}

export default loginWatcher;
