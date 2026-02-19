import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./App";

function ProtectedRoute({children}) {
    let location = useLocation();
    let { currUser } = useContext(UserContext);

    if(!currUser) {
        return (
        <Navigate
        to={"/auth/login"}
        state={{from: location.pathname}}
        replace
        />
        )
    }
    return children;
}

export default ProtectedRoute;