import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./slidemenu.css";
import {
  faTachometerAlt,
  faUsers,
  faSignOutAlt,
  faBox,
  faClipboardList,
  faBars, 
  faTimes, 
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/SessionContext";

const SlideMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // Get the user from AuthContext
  const { user, setUser } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from local storage
    setUser(null); // Clear user context
    navigate("/userlogin"); // Redirect to login page
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Welcome {user?.user_type === "Admin" ? "Admin" : "Seller"}</h2>
        </div>
        <ul className="sidebar-menu">
          <li>
            <button
              onClick={() =>
                navigate(
                  user?.user_type === "Admin"
                    ? "/admindashboard"
                    : "/sellerdashboard"
                )
              }
              className="active"
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="menu-icon" />{" "}
              Dashboard
            </button>
          </li>

          {/* Show "Manage Users" only for Admin */}
          {user?.user_type === "Admin" && (
            <li>
              <button onClick={() => navigate("/manageusers")}>
                <FontAwesomeIcon icon={faUsers} className="menu-icon" /> Manage
                Users
              </button>
            </li>
          )}

          <li>
            <button onClick={() => navigate("/manageproducts")}>
              <FontAwesomeIcon icon={faBox} className="menu-icon" /> Manage
              Products
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/manageorders")}>
              <FontAwesomeIcon icon={faClipboardList} className="menu-icon" />{" "}
              Manage Orders
            </button>
          </li>

          {/* Show "Exercise Category" and "Manage Exercise" only for Admin */}
          {user?.user_type === "Admin" && (
            <>
              <li>
                <button onClick={() => navigate("/manageExerciseCategory")}>
                  <FontAwesomeIcon
                    icon={faClipboardList}
                    className="menu-icon"
                  />{" "}
                  Exercise Category
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/manageExercise")}>
                  <FontAwesomeIcon
                    icon={faClipboardList}
                    className="menu-icon"
                  />{" "}
                  Manage Exercise
                </button>
              </li>
            </>
          )}

          <li>
            <button onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />{" "}
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SlideMenu;
