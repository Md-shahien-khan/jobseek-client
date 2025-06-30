import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import AuthContext from "../../context/AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const {signInWithGoogle} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  console.log('in sign in page : ',location);
  const from = location.state || '/';
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result =>{
        console.log(result.user);
        navigate(from);
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
