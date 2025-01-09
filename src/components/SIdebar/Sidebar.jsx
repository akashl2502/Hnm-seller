import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { IoIosLogOut, IoIosPaper, IoMdPeople } from "react-icons/io";
import { signOut } from "firebase/auth";
import { Authentication } from "../../Firebase/Firebase-Config";
import "./sidebar.css";
import { LS } from "../../constants/Reusedfunctopn";
import { useNavigate } from "react-router-dom";
import IconWithDisplayName from "../../utils/Firstletter";
import logo from "../../assets/logo.png";

function Sidebar() {
  const userRole = LS.get("US");
  const SidebarData = [
    userRole == 1
      ? { title: "Home", path: "/sellerhome", icon: <AiFillHome /> }
      : null,
    userRole == 1 || userRole == 2
      ? { title: "Request Records", path: "/Request", icon: <FaCartPlus /> }
      : null,
    userRole == 1
      ? { title: "Upcoming Records", path: "/upcoming", icon: <IoIosPaper /> }
      : null,
    userRole == 1 || userRole == 2
      ? { title: "Inprogress Records", path: "/delivery", icon: <FaCartPlus /> }
      : null,
    userRole == 3
      ? { title: "Transport", path: "/Transport", icon: <IoMdPeople /> }
      : null,
    userRole == 1 || userRole == 2
      ? { title: "Completed Records", path: "/completed", icon: <IoMdPeople /> }
      : null,
  ];

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setShow(!show);
  };
  const [logoutModal, setLogoutModal] = useState(false);
  const handleLogout = async () => {
    try {
      await signOut(Authentication).then((Res) => {
        LS.clear();
        navigate("/login");
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div>
      <div className="fixed w-full top-0 flex items-center justify-between h-14 text-white z-0">
        <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-80 h-14  bg-[#171717] dark:bg-gray-800 border-none">
          <div className="flex items-center justify-center gap-5">
            <div className="header" onClick={handleClick}>
              <i className="fas fa-bars cursor-pointer"></i>
            </div>

            <div className="flex justify-start items-center gap-3 mobile">
              <IconWithDisplayName
                displayName={LS.get("cusid").toUpperCase()}
              />
              <p className="text-lg tracking-wide font-poppins">
                {LS.get("cusid").toUpperCase()}
              </p>
            </div>
          </div>
          {/* <span className="hidden md:block">Akash</span> */}
        </div>
        <div className="flex justify-end items-center w-full h-14 bg-[#171717] dark:bg-gray-800 header-right pr-8 cursor-pointer">
          <div
            className="flex items-center justify-center gap-1 "
            onClick={() => {
              setLogoutModal(true);
            }}
          >
            <div>
              <IoIosLogOut className="w-6 h-6" />
            </div>
            <p className="font-poppins text-sm">Logout</p>
          </div>
        </div>
      </div>
      {logoutModal && (
        <div className="fixed inset-0 bg-[#171717] bg-opacity-90 z-50 flex justify-center items-center">
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-700 text-white rounded-2xl shadow-2xl p-6 sm:p-8 w-11/12 max-w-md transition-transform transform scale-95 animate-scale-up">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-300 hover:text-gray-100 transition duration-300"
              onClick={() => setLogoutModal(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Title */}
            <h2 className="text-2xl font-extrabold text-center text-white drop-shadow-lg">
              Confirm Logout
            </h2>

            {/* Message */}
            <p className="text-gray-300 mt-4 text-center leading-relaxed">
              Are you sure you want to log out? Your session will be terminated,
              and you’ll need to log in again to continue.
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-md transform hover:scale-105"
                onClick={() => setLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-lg transform hover:scale-105"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={show ? "backdrop backdrop-open z-[1] " : "backdrop "}
        onClick={handleClick}
      ></div>
      <div className={show ? "sidebar collapse1 z-30" : "sidebar z-30"}>
        <div className="h-[200px] bg-slate-500  flex justify-center items-center">
          <img src={logo} className="h-[200px] w-[200px]" alt="logo" />
        </div>
        <ul>
          {SidebarData.map((item, index) => {
            if (item) {
              return (
                <li key={index}>
                  <Link to={item.path} className="nav-link">
                    {item.icon}

                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
        <div className="absolute bottom-0 left-[25%] text-white">
          <p>Copyright @ 2022</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
