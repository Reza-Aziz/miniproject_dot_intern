import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../store/slices/auth";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find((u) => u.email === formData.email && u.password === formData.password);

    if (user) {
      dispatch(login(user));
      console.log("loggin success");
    } else {
      alert("Email atau password salah");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md lg:max-w-lg xl:max-w-xl p-6 sm:p-8 lg:p-10 mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Login</h1>
          <p className="text-sm sm:text-base text-gray-600">Enter your credentials to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="/forgot-password" className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg mt-2">
            Sign In
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-xs sm:text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-700">
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
