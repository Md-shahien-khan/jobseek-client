import React from "react";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const handleGoogleSignIn = () => {
    // Your Google sign-in logic here
    console.log("Google Sign In clicked");
  };

  return (
    <div className="mt-4 text-center">
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
        <FcGoogle className="text-xl" />
        <span className="text-sm font-medium">Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
