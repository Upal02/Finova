import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../action/action";

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const { name, email, password, confirmPassword, role } = form;

    // ✅ Validation
    if (!name || !email || !password || !confirmPassword || !role) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // ✅ Dispatch Redux action
      await dispatch(signupUser(form));

      // ✅ Navigate based on role
      if (role === "user") navigate("/user");
      else if (role === "analyst") navigate("/analyst");
      else if (role === "admin") navigate("/admin");

    } catch (error) {
      console.error("Signup failed:", error);
      alert(error?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black">
      <div className="w-[90vw] h-[80vh] sm:w-[85vw] sm:h-[75vh] md:w-[80vw] md:h-[70vh] lg:w-full lg:max-w-sm lg:h-auto flex flex-col justify-start pt-14 px-6 sm:px-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl">

        {/* Title */}
        <h1 className="text-white font-semibold text-center text-xl sm:text-2xl mb-6">
          Sign Up
        </h1>

        {/* Role Selection */}
        <div className="mb-4">
          <p className="text-gray-300 mb-2 text-xs">Select Role</p>

          <div className="flex gap-2">
            {["user", "analyst", "admin"].map((r) => (
              <button
                key={r}
                onClick={() => setForm({ ...form, role: r })}
                className={`flex-1 py-2 rounded-md border text-xs transition ${
                  form.role === r
                    ? "bg-purple-600 border-purple-500 text-white"
                    : "bg-white/10 border-white/20 text-gray-300"
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 h-11 px-4 rounded-md bg-white/20 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 h-11 px-4 rounded-md bg-white/20 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 h-11 px-4 rounded-md bg-white/20 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full mb-4 h-11 px-4 rounded-md bg-white/20 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full h-11 mb-5 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        {/* Divider */}
        <div className="flex items-center mb-5">
          <div className="flex-1 h-px bg-white/20" />
          <span className="mx-3 text-gray-400 text-xs">OR</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Login Redirect */}
        <div className="text-center mt-auto pb-6">
          <span className="text-gray-300 text-xs mr-1">
            Already have an account?
          </span>
          <button
            onClick={() => navigate("/")}
            className="text-blue-400 text-xs hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;