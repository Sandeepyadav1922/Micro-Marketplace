import axios from "axios";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "./App";
import "./Auth.css";

function SignInPage() {
  const API = import.meta.env.VITE_API_URL;
  let location = useLocation();
  let {setCurrUser} = useContext(UserContext);

  const from = location.state?.from || "/products";
  let navigate = useNavigate();

  let [error, setError] = useState({});
  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  let validateSignup = () => {
    let newError = {};
    if(!user.email) {
      newError.email = "Email is required";
    }
    if(!user.password) {
      newError.password = "Password is required";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!validateSignup()) return;

    axios
      .post(`${API}/auth/login`, user)
      .then((res) => {
        setUser({
          email: "",
          password: ""
        })
        setCurrUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        setCurrUser(true);
        toast.success(res.data.message)
        navigate(from, {replace: true});
      })
      .catch((err) => {
        // console.log(err.response);
        toast.error(err.response.data.message)
    });
  };

  const handleChange = (e) => {
    setUser((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return (
    <div className="auth-container">
      <div className="auth-body">
        <h3 className="text-center text-white mb-4">SignIn</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          {error && <div style={{color: "red"}}>{error.email}</div>}
          <br />
          <label htmlFor="password">Passwaord</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          {error && <div style={{color: "red"}}>{error.password}</div>}
          <br />
          <button type="submit" className="btn btn-dark">Sign In</button>
        </form>
        <div className="mt-3">
            <Link to={"/auth/register"}  style={{color: "rgb(0, 0, 105)"}}>
            You don't have a account
            </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;