// src/action/action.js

import { signupApi, loginApi } from "../api/api";

// ================= SIGNUP ================= //

export const signupUser = (formData) => async (dispatch) => {
  try {
    const data = await signupApi(formData);

    dispatch({
      type: "SIGNUP_SUCCESS",
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: "SIGNUP_FAIL",
      payload: error,
    });

    throw error;
  }
};

// ================= LOGIN ================= //

export const loginUser = (formData) => async (dispatch) => {
  try {
    const data = await loginApi(formData);

    localStorage.setItem("token", data.token);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: error,
    });

    throw error;
  }
};