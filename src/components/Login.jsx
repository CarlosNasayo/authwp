import { React, useState } from "react";
import { useAuth } from "../context/authcontext";
import { useNavigate, Link } from "react-router-dom";
import Alert from "./alert";
import Phone from "./phone";
function Login() {
  const [error, setError] = useState();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle,resetPassword } = useAuth();
  const navigate = useNavigate();
  const hanfdechange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleGooglelogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleReset=async()=>{
    if(!user.email) return setError('ingresa un email')
    try{ 
      await resetPassword(user.email)
      setError('se envio un email')
    }catch(error){
      setError(error.message)
    }
  }
  
  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}
      <form
        onSubmit={handlesubmit}
        action=""
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-folf mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={hanfdechange}
            type="email"
            name="email"
            placeholder="youremail"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-folf mb-2"
          >
            password
          </label>
          <input
            className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={hanfdechange}
            type="password"
            name="password"
            id="password"
            placeholder="******"
          />
        </div>
    <div className="flex items-center justify-between">
    <button className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded focues:outline-none focus:shadow-outline">
          Login
        </button>
        <a onClick={handleReset} href="#" className="inline-block aling-baseline font-bold text-sm text-blue-500 hover:text-blue">forgot password?</a>
    </div>
        
      </form>
      <p className="my-4 text-sm flex justify-between">
        Dont hava an account? <Link to="/register">Register</Link>
      </p>
      <button
        className="bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full"
        onClick={handleGooglelogin}
      >
        Login with google
      </button>
      <Link to="/phone">
        <button
          className="bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full"
        >
          Login with phone
        </button>
      </Link>
    </div>
  );
}
export default Login;
