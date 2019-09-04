import { SIGN_IN } from "../consts/auth";

export const signIn = userData => ({
  type: SIGN_IN,
  payload: userData
});