import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/slices/auth";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find((u) => u.email === formData.email && u.password === formData.password);

    if (user) {
      dispatch(login(user));
      console.log("loggin success");
      navigate("/menu");
    } else {
      alert("Email atau password salah");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 flex items-center justify-center p-4 sm:p-6 lg:p-8 selection:bg-zinc-900 selection:text-white">
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-md p-6 sm:p-8 mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="h-10 w-10 bg-zinc-900 rounded-xl flex items-center justify-center mx-auto mb-4 text-white shadow-sm">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 mb-2">Welcome back</h1>
          <p className="text-sm text-zinc-500">Enter your credentials to access your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full px-3 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900/10 outline-none transition-all placeholder:text-zinc-400"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
                Password
              </label>
              <a href="/forgot-password" className="text-xs text-zinc-500 hover:text-zinc-900 font-medium transition-colors">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900/10 outline-none transition-all placeholder:text-zinc-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-zinc-900 text-white py-2.5 text-sm font-medium rounded-xl hover:bg-zinc-800 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] mt-2"
          >
            Sign In
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-zinc-500 mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="text-zinc-900 font-medium hover:underline underline-offset-4">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
