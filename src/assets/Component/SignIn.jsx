import React, { useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AuthContext from "../../context/AuthContext/AuthContext";
import loginLottieJson from '../Lottie/login.json'
import Lottie from "lottie-react";
import SocialLogin from "./SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signInError, setSignInError] = useState("");
  const {signInUser} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  console.log('in sign in page : ',location);
  const from = location.state || '/';

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    setSignInError("");

    signInUser(email, password)
      .then((result) => {
        console.log("Logged in user:", result.user);
        // Redirect or show success if needed
        navigate(from);
      })
      .catch((error) => {
        console.error(error.message);
        setSignInError("Failed to sign in. Please check your credentials.");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
        <div>
            <Lottie animationData={loginLottieJson}></Lottie>
        </div>
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        {/* Password with toggle */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="w-full border px-3 py-2 rounded-lg pr-10"
              required
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
              onClick={togglePassword}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          {signInError && (
            <p className="text-sm text-red-500 mt-1">{signInError}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>
        {/* google sign in */}
        <div className="">
          <SocialLogin></SocialLogin>
        </div>
        <p>Don't have an account? Please <Link to='/register' className="text-blue-700 font-bold">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default SignIn;
