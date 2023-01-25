import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { FaHome } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { BiHelpCircle } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";

const Delivery = () => {
  const menus = [
    { name: "Home", link: "/", icon: FaHome },
    { name: "Completed Records", link: "/completed", icon: FaCheckCircle },
    { name: "Delivery Records", link: "/delivery", icon: FiFolder },
    {
      name: "Upcoming Records",
      link: "/",
      icon: TbReportAnalytics,
      margin: true,
    },
    { name: "Messages", link: "/", icon: FiMessageSquare },
    { name: "About", link: "/", icon: FcAbout },
    { name: "Help", link: "/", icon: BiHelpCircle, margin: true },
    { name: "Logout", link: "/", icon: AiOutlineUser },
  ];
  const [open, setOpen] = useState(true);
  return (
    <div className="flex justify-center items-center">asdasd</div>

  );
};

export default Delivery;
