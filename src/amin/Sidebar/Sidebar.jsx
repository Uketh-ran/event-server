import React from "react";
import { Link } from "react-router-dom";
import { FaBrush, FaGlassCheers  , FaHome,FaMusic ,FaCameraRetro} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="bg-dark text-white p-3" style={{ width: "250px", minHeight: "100vh" }}>
      <h3 className="text-center mb-4 fw-bold">Admin Panel</h3>

      <ul className="list-unstyled">
        <li className="mb-3">
          <Link to="/admin" className="text-white text-decoration-none">
            <FaHome /> Dashboard
          </Link>
        </li>

        <li className="mb-3">
          <Link to="/admin/wed-theme" className="text-white text-decoration-none">
            <FaBrush /> Wedding Theme Decoration
          </Link>
        </li>

        <li className="mb-3">
          <Link to="/admin/wed-recparty" className="text-white text-decoration-none">
           <FaGlassCheers />  Wedding Reception & Party
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/admin/wed-livemusic" className="text-white text-decoration-none">
           <FaMusic />  Wedding Live Music
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/admin/wed-photo" className="text-white text-decoration-none">
           <FaCameraRetro />  Wedding Photos & Video
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
