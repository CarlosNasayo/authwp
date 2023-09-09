import React, { useState } from "react";
import Alert from "./alert";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

export default function Phone() {
  const { setCapcha } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [otp, setOtp] = useState("");
  

  const getOtp = async(e) => {
    setError("");
    e.preventDefault();
    console.log(number);
    if (number === "" || number === undefined)
      return setError("invalid number");
    try {
        const response = await setCapcha(number);
        console.log(response)
        setConfirmation(response)
        setFlag(true)
    } catch (error) {
        console.log(error)
      setError(error.message);
    }
    // Aquí puedes realizar cualquier lógica adicional, como enviar el OTP.
  };
const verifyOtp=async(e)=>{
    e.preventDefault();
    console.log(otp)
    if(otp==="" || otp===null) return;
    try{
        setError("")
       await confirmation.confirm(otp)
      navigate("/");

    }catch(error){
        setError(error.message)
    }
}
  return (
    <div>
      {error && <Alert message={error} />}
      <form onSubmit={getOtp} action="" style={{display:!flag? "block":"none"}}>
        <PhoneInput
          defaultCountry="CO"
          value={number}
          onChange={setNumber}
          placeholder="Enter phone"
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="submit">Send OTP</button>
          <Link to="/login">
            <button>Cancel</button>
          </Link>
        </div>
      <div id="recaptcha-container"/>

      </form>
      <form  onSubmit={verifyOtp} style={{display:flag? "block":"none"}} action="">
        <input onChange={(e)=>setOtp(e.target.value)} type="otp" name="" id="" placeholder="enter otp" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="submit">verify otp</button>
          <Link to="/login">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
