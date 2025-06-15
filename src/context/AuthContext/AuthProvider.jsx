import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from '../../firebase/firebase.init'
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Lottie/loading.json"
import { GoogleAuthProvider } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // observer
    useEffect(() => {
        const observer = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('State Captured', currentUser);
            setLoading(false);
        });
        return () => observer();
    }, []);

    // create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // sign in user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // signin with google
    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    // signOut
    const signOutUser = () =>{
        setLoading(true);
        return signOut(auth);
    }

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        signInWithGoogle
    }

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center bg-white">
                <div className="w-48 h-80">
                    <Lottie animationData={loadingAnimation} loop={true} />
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
