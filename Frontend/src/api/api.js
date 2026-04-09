import axiosInstance from "./axiosInstance";

// ================= AUTH ================= //

export const loginApi = async (data) => {
  try {
    const res = await axiosInstance.post("/login", data);
    return res;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const signupApi = async (data) => {
  try {
    const res = await axiosInstance.post("/signup", data);
    return res;
  } catch (err) {
    throw err.response?.data || err;
  }
};


// ================= USER ================= //

export const getUserDashboardApi = async () => {
  try {
    const res = await axiosInstance.get("/user/dashboard");
    return res;
  } catch (err) {
    throw err.response?.data || err;
  }
};


// ================= ADMIN ================= //

// GET all users
export const getAllUsersApi = async () => {
  try {
    const res = await axiosInstance.get("/admin/users");
    return res;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// GET user details
export const getUserDetailsApi = async (id) => {
  try {
    const res = await axiosInstance.get(`/admin/user/${id}`);
    return res;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// POST update user
export const updateUserApi = async (data) => {
  try {
    const res = await axiosInstance.post("/admin/update-user", data);
    return res;
  } catch (err) {
    throw err.response?.data || err;
  }
};