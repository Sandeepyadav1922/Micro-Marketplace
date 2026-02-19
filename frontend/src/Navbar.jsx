import { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "./App";
import "./Navbar.css";

function Navbar() {
    let {currUser, setCurrUser} = useContext(UserContext);

    let handleLogout = () => {
        localStorage.removeItem("token");
        setCurrUser(false);
        toast.success("User Logged Out");
    }

    return (
<nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top" style={{padding: "1.2rem"}}>
  <div className="container-fluid">
    <Link to={"/products"} className="navbar-brand" style={{color: "green"}}>
            Products
            </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
            <Link to={"/products/new"} className="nav-link">
            Add New Product
            </Link>
        </li>
        {!currUser ? (
            <>
        <li className="nav-item">
            <Link to={"/auth/register"} className="nav-link">
            SignUp
            </Link>
        </li>
        <li className="nav-item">
            <Link to={"/auth/login"} className="nav-link">
            Login
            </Link>
        </li>
        </>
        ) : (
        <li className="nav-item">
            <Link className="nav-link" onClick={handleLogout}>
            LogOut
            </Link>
        </li>
        )}
      </ul>
    </div>
  </div>
</nav>
    )
};

export default Navbar;