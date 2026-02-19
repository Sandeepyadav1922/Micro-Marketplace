import { Link } from "react-router-dom";
import "./Error.css";

function ErrorPage() {
    return (
        <>
        <div className="error">
            <div className="error-content">Page Not Found</div>
            </div>
        <Link to={"/products"}>
        <button className="btn btn-outline-danger error-btn">Go To Home Page</button>
        </Link>
        </>
    );
}

export default ErrorPage;