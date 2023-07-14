import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
} from "../../actionTypes";

import { LoginActions, LoginState } from "./loginTypes";

const initUserState: LoginState = {
  pending: false,
  successful: localStorage.getItem("token") ? true : false,
  message: null,
  error: null,
};

export default (state = initUserState, action: LoginActions) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        pending: true,
        successful: false,
        message: "Logging in...",
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        pending: false,
        successful: true,
        error: null,
        message: "Success",
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        pending: false,
        successful: false,
        error: "Error",
        message: null,
      };
    case SIGN_OUT:
      localStorage.removeItem("token");
      return {
        ...initUserState,
        successful: false,
      };
    default:
      return {
        ...state,
      };
  }
};
