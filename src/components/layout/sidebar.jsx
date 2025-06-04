import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaBars,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { BiLineChart } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiShoppingBag3Line, RiFileChartLine } from "react-icons/ri";

const sidebarMenus = [
  { to: "/dashboard", label: "Dashboard", icon: <MdDashboard /> },
  { to: "/stock-product", label: "Stock Product", icon: <BiLineChart /> },
  { to: "/transaksi-penjualan", label: "Transaksi Penjualan", icon: <AiOutlineShoppingCart /> },
  { to: "/tambah-stok", label: "Tambah Stok", icon: <RiShoppingBag3Line /> },
  { to: "/laporan-transaksi", label: "Laporan Transaksi", icon: <RiFileChartLine /> },
];

const Sidebar = ({ children, titlePage }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
        setIsMobile(true);
      } else {
        setIsOpen(true);
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", checkScreen);
    checkScreen();
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const closeSidebarMobile = () => isMobile && setIsOpen(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={closeSidebarMobile}
        />
      )}

      <aside
        className={`fixed top-4 left-4 bottom-4 z-50 transition-all duration-300 bg-white border border-gray-200 shadow-xl rounded-3xl overflow-hidden flex flex-col ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="text-xl font-extrabold text-blue-600">
            {isOpen ? "Apotek Keluarga" : "AK"}
          </span>
          <button
            className="text-gray-600 hover:text-blue-500 md:block hidden"
            onClick={toggleSidebar}
          >
            {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {sidebarMenus.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              onClick={closeSidebarMobile}
              className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all hover:bg-blue-50 group ${
                location.pathname === to
                  ? "bg-blue-100 text-blue-600 border-l-4 border-blue-500"
                  : "text-gray-700"
              }`}
            >
              <span className="text-xl group-hover:text-blue-500">{icon}</span>
              {isOpen && <span className="ml-3 text-sm">{label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-2 space-y-2">
          {/* Profile link styled like menu */}
          <Link
            to="/edit-profile"
            onClick={closeSidebarMobile}
            className="flex items-center px-4 py-2 rounded-xl font-medium transition-all hover:bg-blue-50 text-gray-700"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Profile"
              className="w-6 h-6 rounded-full"
            />
            {isOpen && <span className="ml-3 text-sm">Admin</span>}
          </Link>

          {/* Logout styled like menu */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 rounded-xl font-medium transition-all hover:bg-blue-50 text-red-500"
          >
            <FiLogOut className="text-lg" />
            {isOpen && <span className="ml-3 text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      <div className={`flex-1 transition-all duration-300 ${isOpen ? "md:ml-72 ml-20" : "ml-20"}`}>
        <header className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
          {isMobile && (
            <button onClick={toggleSidebar} className="text-gray-600 text-xl">
              <FaBars />
            </button>
          )}
          <h1 className="text-xl font-semibold text-gray-800">{titlePage}</h1>
        </header>

        <main className="p-4 md:p-6 bg-gray-50 min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
