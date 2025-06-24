import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import AuthContext from "../../context/AuthContext/AuthContext";

const SocialLogin = () => {
  const {signInWithGoogle} = useContext(AuthContext);
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result =>{
        console.log(result.user)
      })
      .catch(error =>{
        console.log(error.message)
      })
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
