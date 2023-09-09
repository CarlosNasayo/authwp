import { createContext, useContext,useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,signOut,GoogleAuthProvider,signInWithPopup,sendPasswordResetEmail,RecaptchaVerifier,signInWithPhoneNumber} from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export function AuthProvider({ children }) {
  const [user,setUser]=useState(null)
  const [loading,setLoading]=useState(true)
  const singup = (email, password) => createUserWithEmailAndPassword(auth,email,password);
  const login= async (email,password)=> signInWithEmailAndPassword(auth,email,password);
  const setCapcha= async (number)=> {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth,number,recaptchaVerifier)
  }
  const resetPassword =(email)=>sendPasswordResetEmail(auth,email)
  
  const logout=()=> signOut(auth)
  const loginWithGoogle =()=>{
   const googleProvider= new GoogleAuthProvider()
   return signInWithPopup(auth,googleProvider)
  }
  useEffect(()=>{
    onAuthStateChanged(auth,currentUser=>{
      setUser(currentUser)
      setLoading(false)
      
  })
  },[])
  
  return (
    <authContext.Provider value={{ singup,login,user,logout,loading,loginWithGoogle,resetPassword,setCapcha }}>{children}</authContext.Provider>
  );
}
