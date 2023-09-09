import { React, useState } from "react";
import { useAuth } from "../context/authcontext";
import { useNavigate,Link } from "react-router-dom";
import Alert from "./alert";
function Register() {
  const [error, setError] = useState();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { singup } = useAuth();
  const navigate = useNavigate();
  const hanfdechange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await singup(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

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
            htmlFor="email"
            className="block text-gray-700 text-sm font-folf mb-2"
          >
            email
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

        <button className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded focues:outline-none focus:shadow-outline">
          register
        </button>
      </form>
      <p className="my-4 text-sm flex justify-between">
        already have an account? <Link to="/login">login</Link>
      </p>

    </div>
  );
}
export default Register;
