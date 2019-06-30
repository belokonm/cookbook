import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_EMAIL_CHANGED,
  SIGN_UP_PASSWORD_CHANGED,
  SIGN_UP_PASSWORD_CONFIRM_CHANGED
} from "./actions";

const initialState = {
  error: null,
  success: null,
  email: "usertest1@gmail.com",
  password: "abc123",
  confirmPassword: "abc123"
};

export const signUp = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return { ...initialState };
    case SIGN_UP_FAILURE:
      return { ...state, error: action.payload.error };
    case SIGN_UP_EMAIL_CHANGED:
      return { ...state, email: action.payload.email };
    case SIGN_UP_PASSWORD_CHANGED:
      return { ...state, password: action.payload.password };
    case SIGN_UP_PASSWORD_CONFIRM_CHANGED:
      return {
        ...state,
        confirmPassword: action.payload.confirmPassword
      };
    default:
      return state;
  }
};
