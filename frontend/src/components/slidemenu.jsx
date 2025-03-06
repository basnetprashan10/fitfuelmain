import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./slidemenu.css";
import {
  faTachometerAlt,
  faUsers,
  faChartBar,
  faCog,
  faSignOutAlt,
  faBox,
  faClipboardList,
  faChalkboardTeacher,
  faBars, // Menu toggle icon
  faTimes, // Close menu icon
} from "@fortawesome/free-solid-svg-icons";

const SlideMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Welcome Admin</h2>
        </div>
        <ul className="sidebar-menu">
          <li>
            <button
              onClick={() => navigate("/admindashboard")}
              className="active"
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="menu-icon" />{" "}
              Dashboard
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/manageusers")}>
              <FontAwesomeIcon icon={faUsers} className="menu-icon" /> Manage
              Users
            </button>
          </li>
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
          <li>
            <button onClick={() => navigate("/manageExerciseCategory")}>
              <FontAwesomeIcon icon={faClipboardList} className="menu-icon" />{" "}
              Exercise Category
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/manageExercise")}>
              <FontAwesomeIcon icon={faClipboardList} className="menu-icon" />{" "}
              Manage Exercise
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/managetranner&hirerequests")}>
              <FontAwesomeIcon
                icon={faChalkboardTeacher}
                className="menu-icon"
              />{" "}
              Hire Requests
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/reports")}>
              <FontAwesomeIcon icon={faChartBar} className="menu-icon" />{" "}
              Reports
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/settings")}>
              <FontAwesomeIcon icon={faCog} className="menu-icon" /> Settings
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/logout")}>
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
