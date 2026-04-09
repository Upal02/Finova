import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const { email, password, role } = form;

    if (!email || !password || !role) {
      alert("Fill all fields");
      return;
    }

    const res = await dispatch(loginUser(form));

    // redirect based on role
    if (role === "user") navigate("/user");
    if (role === "analyst") navigate("/analyst");
    if (role === "admin") navigate("/admin");
  };

  // const navigate = useNavigate();

  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  //   role: "", // 👈 added role
  // });

  // // handle input change
  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // // handle login
  // const handleLogin = () => {
  //   const { email, password, role } = form;

  //   if (!email || !password || !role) {
  //     alert("Please fill all fields and select a role");
  //     return;
  //   }

  //   // 👉 TEMP LOGIC (replace with backend later)
  //   if (role === "user") navigate("/user");
  //   else if (role === "analyst") navigate("/analyst");
  //   else if (role === "admin") navigate("/admin");
  // };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black">
      <div className="w-[90vw] h-[80vh] sm:w-[85vw] sm:h-[75vh] md:w-[80vw] md:h-[70vh] lg:w-full lg:max-w-md lg:h-auto flex flex-col justify-center overflow-y-auto px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl">
        {/* Title */}
        <h1 className="text-white font-bold text-center text-[clamp(1.8rem,3vw,2.8rem)] mb-6 tracking-wide">
          Login
        </h1>

        {/* Role Selection */}
        <div className="mb-6">
          <p className="text-gray-300 mb-3 text-sm">Select Role</p>

          <div className="flex gap-3">
            {["user", "analyst", "admin"].map((r) => (
              <button
                key={r}
                onClick={() => setForm({ ...form, role: r })}
                className={`
                  flex-1 py-2 rounded-lg border
                  ${
                    form.role === r
                      ? "bg-purple-600 border-purple-500 text-white"
                      : "bg-white/10 border-white/20 text-gray-300"
                  }
                  transition
                `}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-5 px-5 py-3.5 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 px-5 py-3.5 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3.5 mb-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all"
        >
          Login
        </button>

        {/* Sign Up */}
        <div className="text-center">
          <span className="text-gray-300 text-sm mr-2">
            Don't have an account?
          </span>
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-400 hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
