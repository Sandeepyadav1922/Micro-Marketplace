import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { UserContext } from "./App";
import "./Auth.css";

function SignUpPage() {
//   let {setCurrUser} = useContext(UserContext);
  const API = import.meta.env.VITE_API_URL;
  let navigate = useNavigate();

  let [error, setError] = useState({});
  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  let validateSignup = () => {
    let newError = {};
    if(!user.name) {
      newError.name = "Name must be required";
    }
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
      .post(`${API}/auth/register`, user, {withCredentials: true})
      .then((res) => {
        setUser({
          name: "",
          email: "",
          password: ""
        })
        // setCurrUser(res.data.user);
        toast.success(res.data.message)
        navigate("/products");
      })
      .catch((err) => {
        toast.error(err.response.data.message)
    });
  };

  const handleChange = (e) => {
    setUser((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return (
    <div className="auth-container">
      <div className="auth-body">
        <h3 className="text-center text-white mb-4">SignUp</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          {error && <div style={{color: "red"}}>{error.name}</div>}
          <br />
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
          <button type="submit" className="btn btn-dark">SignUp</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;