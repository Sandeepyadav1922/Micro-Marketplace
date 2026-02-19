import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditPage from "./EditPage";
import ErrorPage from "./Error";
import Footer from "./Footer";
import IndexPage from "./IndexPage";
import Navbar from "./Navbar";
import NewPage from "./NewPage";
import ProtectedRoute from "./ProtectedRoute";
import ShowPage from "./ShowPage";
import SignInPage from "./Signin";
import SignUpPage from "./Signup";

export const UserContext = createContext(null);

function App() {
  let [currUser, setCurrUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8080/authenticate", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setCurrUser(res.data.currUser);
      })
      .catch((e) => {
        setCurrUser(null);
        console.log(e.response);
      });
  }, []);

  return (
    <UserContext.Provider value={{ currUser, setCurrUser }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/products" element={<IndexPage />} />
          <Route
            path="/products/new"
            element={
              <ProtectedRoute>
                <NewPage />
              </ProtectedRoute>
            }
          />
          <Route path="/products/:id" element={<ShowPage />} />
          <Route
            path="/products/:id/edit"
            element={
              <ProtectedRoute>
                <EditPage />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/register" element={<SignUpPage />} />
          <Route path="/auth/login" element={<SignInPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={4000} />
        <Footer/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
