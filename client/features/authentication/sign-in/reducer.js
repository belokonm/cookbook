import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_EMAIL_CHANGED,
  SIGN_IN_PASSWORD_CHANGED
} from "./actions";

const initialState = {
  error: null,
  success: null,
  email: "usertest1@gmail.com",
  password: "abc123"
};

export const signIn = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return { ...initialState };
    case SIGN_IN_FAILURE:
      return { ...state, error: action.payload.error };
    case SIGN_IN_EMAIL_CHANGED:
      return { ...state, email: action.payload.email };
    case SIGN_IN_PASSWORD_CHANGED:
      return { ...state, password: action.payload.password };
    default:
      return state;
  }
};
