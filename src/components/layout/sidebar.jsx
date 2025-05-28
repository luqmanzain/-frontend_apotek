// Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { BsFillBellFill } from "react-icons/bs";
import { BiLineChart } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./sidebar.css";

const sidebarMenus = [
  { to: "/dashboard", label: "Dashboard", icon: <MdDashboard /> },
  { to: "/stock-product", label: "Stock Product", icon: <BiLineChart /> },
  { to: "/transaksi-penjualan", label: "Transaksi Penjualan", icon: <AiOutlineShoppingCart /> },
  { to: "/laporan-transaksi", label: "Laporan Transaksi", icon: <BsFillBellFill /> },
];

const Sidebar = ({ children, titlePage }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="layout">
      <aside className={`sidebar ${isOpen ? "open" : "closed"} ${isMobile ? "mobile" : ""}`}>
        <div className="sidebar-header">
          <span className="logo">{isOpen ? "Apotek Keluarga" : "AK"}</span>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        <nav className="sidebar-menu">
          {sidebarMenus.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`sidebar-link ${location.pathname === to ? "active" : ""}`}
              onClick={() => isMobile && setIsOpen(false)}
            >
              <span className="icon">{icon}</span>
              {isOpen && <span className="label">{label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut className="logout-icon" />
            {isOpen && <span className="logout-text">Logout</span>}
          </button>
        </div>
      </aside>

      <div className="main-content">
        <header className="main-header">
          <h1 className="page-title">{titlePage}</h1>
          <Link to="/edit-profile" className="profile-link">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Profile"
              className="avatar"
            />
            <span className="username">Admin</span>
          </Link>
        </header>

        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;