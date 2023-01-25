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
const Upcoming = () => {
  return (
    <div class="block w-[100%] overflow-x-auto mt-[5%]">
    <table class="items-center bg-transparent w-full border-collapse ">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Serial.No
          </th>
          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Date Of Request
          </th>

          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Product Quantity
          </th>
          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Date of Dispatch
          </th>
          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Pincode,City
          </th>
          
        </tr>
      </thead>

      <tbody>
        <tr>
        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">1211 </td>
        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">Lorem, ipsum dolor sit </td>
        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">Lorem, ipsum dolor sit </td>
        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">Lorem, ipsum dolor sit </td>
        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">Lorem, ipsum dolor sit </td>
              
        </tr>
       
      </tbody>
    </table>
  </div>

  )
}

export default Upcoming