import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
} from "../../actionTypes";

export interface LoginState {
  pending: boolean;
  successful: boolean;
  message: string | null;
  error: string | null;
}

export interface SignInRequest {
  type: typeof SIGN_IN_REQUEST;
}

export type SignInSuccess = {
  type: typeof SIGN_IN_SUCCESS;
};

export type SignInFailure = {
  type: typeof SIGN_IN_FAILURE;
};

export type SignOut = {
  type: typeof SIGN_OUT;
};

export type LoginActions =
  | SignInRequest
  | SignInSuccess
  | SignInFailure
  | SignOut;
