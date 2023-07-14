import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
} from "../../actionTypes";

import { SignInRequest, SignInSuccess, SignInFailure, SignOut } from "./loginTypes";

export const signInRequest = (): SignInRequest => ({
  type: SIGN_IN_REQUEST,
});

export const signInSuccess = (): SignInSuccess => ({
  type: SIGN_IN_SUCCESS,
});

export const signInFailure = (): SignInFailure => ({
  type: SIGN_IN_FAILURE,
});

export const signOut = (): SignOut => ({
  type: SIGN_OUT,
});
