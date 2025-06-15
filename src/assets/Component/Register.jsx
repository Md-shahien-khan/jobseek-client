import React, { useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AuthContext from "../../context/AuthContext/AuthContext";
import SocialLogin from "./SocialLogin";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const {createUser} = useContext(AuthContext);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName =  form.firstName.value;
    const lastName =  form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoUrl = form.photoUrl.value;
    const phoneNumber = form.phoneNumber.value;
    const nationality = form.nationality.value;
    console.log(email, password);

    
    createUser(email, password)
      .then(result =>{
        console.log(result.user);
      })
      .catch(error =>{
        console.log(error.message);
      })

    const passwordValid =
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      password.length <= 10;

    if (!passwordValid) {
      setPasswordError(
        "Password must contain 1 uppercase letter, 1 number, and be max 10 characters."
      );
      return;
    }

    setPasswordError(""); // Clear error if validation passes

  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

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

        {/* Password with toggle and validation */}
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
          {passwordError && (
            <p className="text-sm text-red-500 mt-1">{passwordError}</p>
          )}
        </div>

        {/* Photo URL */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="photoUrl">
            Photo URL
          </label>
          <input
            type="url"
            name="photoUrl"
            id="photoUrl"
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="nationality">
            Nationality
          </label>
          <input
            type="text"
            name="nationality"
            id="nationality"
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>
        {/* Google sign up */}
        <div className="">
            <SocialLogin></SocialLogin>
        </div>
        <p>Already have an account? Please<Link to='/signIn' className="text-blue-700 font-bold">Sign In</Link></p>
      </form>
    </div>
  );
};

export default Register;
