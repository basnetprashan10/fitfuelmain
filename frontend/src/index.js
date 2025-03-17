import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import App from "./Routes";
import { BrowserRouter, useLocation } from "react-router-dom";
import Header from "./components/header";
import Navbar from "./components/navbar";
import { AuthProvider } from "./context/SessionContext";

const Layout = () => {
  const location = useLocation();

  // Define routes where Header and Navbar should not be shown
  const hideHeaderAndNavbar = ["/", "/userlogin", "/usersignup"];
  const hideNavbarOnly = [
    "/admindashboard",
    "/manageusers",
    "/addusers",
    "/manageproducts",
    "/AddUsers",
    "/editproduct/",
    "/addproducts",
    "/manageexercisecategory",
    "/manageexercise",
    "/manageorders",
    "/sellerdashboard",
  ];

  // Convert the pathname to lowercase for case-insensitive comparison
  const currentPath = location.pathname.toLowerCase();

  return (
    <>
      {!hideHeaderAndNavbar.includes(currentPath) && <Header />}
      {!hideNavbarOnly.includes(currentPath) &&
        !hideHeaderAndNavbar.includes(currentPath) && <Navbar />}
      <App />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
