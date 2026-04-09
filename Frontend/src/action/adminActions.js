import { toast } from "react-toastify";
import {
  adminStart,
  adminFail,
  setUsers,
  selectUser,
  updateUser,
} from "../redux/slices/adminSlice";

import { getAllUsersApi, getUserDetailsApi, updateUserApi } from "../api/api";

// ================= GET ALL USERS =================
export const fetchAllUsers = () => async (dispatch) => {
  try {
    dispatch(adminStart());

    const res = await getAllUsersApi();
    const data = res?.data || res;

    dispatch(setUsers(data));
  } catch (err) {
    dispatch(adminFail(err?.message));
    toast.error("Failed to fetch users");
  }
};

// ================= GET USER DETAILS =================
export const fetchUserDetails = (id) => async (dispatch) => {
  try {
    dispatch(adminStart());

    const res = await getUserDetailsApi(id);
    const data = res?.data || res;

    dispatch(selectUser(data));
  } catch (err) {
    dispatch(adminFail(err?.message));
    toast.error("Failed to fetch user details");
  }
};

// ================= UPDATE USER =================
export const updateUserByAdmin = (formData) => async (dispatch) => {
  try {
    dispatch(adminStart());

    const res = await updateUserApi(formData);
    const data = res?.data || res;

    dispatch(updateUser(data));
    toast.success("User updated");
  } catch (err) {
    dispatch(adminFail(err?.message));
    toast.error("Update failed");
  }
};