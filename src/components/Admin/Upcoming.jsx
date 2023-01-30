import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { FaHome } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { BiHelpCircle } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser,AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FiMessageSquare, FiFolder, FiShoppingCart,FiEdit } from "react-icons/fi";
import { MdDeleteForever} from "react-icons/md";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
// const Sellersidebar = () => {
//   return (
//     <div class="sidebar top-0 bottom-0 float-left fixed lg:left-0 left-[-300px] duration-1000
//     p-2 w-[300px] overflow-y-auto text-center bg-gray-900 shadow h-screen">
//     <div class="text-gray-100 text-xl">
//       <div class="p-2.5 mt-1 flex items-center rounded-md ">
//         <i class="bi bi-app-indicator px-2 py-1 bg-blue-600 rounded-md"></i>
//         <h1 class="text-[15px]  ml-3 text-xl text-gray-200 font-bold">Groups</h1>
//         <i class="bi bi-x ml-20 cursor-pointer lg:hidden" onclick="Openbar()"></i>
//       </div>
//       <hr class="my-2 text-gray-600"/>

//       <div>
//         <div class="p-2.5 mt-3 flex items-center rounded-md
//         px-4 duration-300 cursor-pointer  bg-gray-700">
//           <i class="bi bi-search text-sm"></i>
//           {/* <input class="text-[15px] ml-4 w-full bg-transparent focus:outline-none" placeholder="Serach" /> */}
//         </div>

//         <div class="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
//           <FaHome/>
//           <span class="text-[15px] ml-4 text-gray-200">Home</span>
//         </div>
//         <div class="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
//           <SiBookstack/>
//            <div class="flex justify-between w-full items-center" onclick="dropDown()">

//             <span class="text-[15px] ml-4 text-gray-200">Records </span>

//             <span class="text-sm rotate-180" id="arrow">

//             <AiOutlineCaretUp/>
//             </span>
//           </div>
//         </div>
//          <div class=" leading-7 text-left text-sm font-thin mt-2 w-4/5 mx-auto" id="submenu">
//           <h1 class="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">Delivery Record</h1>
//           <h1 class="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">AdUpcoming Record</h1>
//           <h1 class="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">AdUpcoming Record</h1>
//         </div>
//         {/* <div class="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
//           <SiBookstack/>
//           <span class="text-[15px] ml-4 text-gray-200">Records</span>
//         </div> */}
//         <hr class="my-4 text-gray-600"/>
//         <div class="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
//           <MdMessage/>
//           <span class="text-[15px] ml-4 text-gray-200">Messages</span>
//         </div>

//         <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
//           <RiLogoutCircleLine/>
//           <span class="text-[15px] ml-4 text-gray-200">Logout</span>
//         </div>

//       </div>
//     </div>
//     </div>
//   )
// }

// export default Sellersidebar



const AdUpcoming = () => {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  return (
    <div class="block w-[100%] overflow-x-auto mt-20">
      <div className="mt-1 flex justify-between">
        <p className="ml-10 text-xl font-sans" >Upcoming Records</p>
        <div>
        <button className="px-2 py-2 bg-[#171717] text-white text-xs rounded-md mr-10" onClick={() => setShowModal(true)} >New Dispatch</button></div>
        {showModal ?(<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[5000] outline-none  backdrop-blur-sm backdrop-contrast-50 backdrop-brightness-50 transition duration-100 focus:outline-none">
      <div className="relative w-full my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font=semibold text-black">
              Create a New Dispatch            </h3>
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={() =>setShowModal(false)}
            >
              <span className="text-black opacity-7 h-6 w-6 text-xl block rounded-full">
                <AiFillCloseCircle onClick={() =>setShowModal(false)} />
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            <form className="bg-gray-200 shadow-md rounded px-8 pt-2 pb-2 w-full flex flex-col gap-[3px]">
              <label className="block text-black text-sm font-bold mb-1">
                Serial Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
                
              />
              <label className="block text-black text-sm font-bold mb-1">
                Date Of Request
              </label>
              <input
              type="date"
                className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
                
              />
              <label className="block text-black text-sm font-bold mb-1">
                Product
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
              
               
              />
              <label className="block text-black text-sm font-bold mb-1">
               Quantity
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
              
               
              />
               <label className="block text-black text-sm font-bold mb-1">
                Date Of Dispatch
              </label>
              <input
              type="date"
                className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
                
              />
              <label className="block text-black text-sm font-bold mb-1">
              Pincode, City
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
              
               
              />
            </form>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={() =>setShowModal(false)}
            >
              Close
            </button>
            <button
              className="text-white bg-[#175eab] active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
            
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>):null}
      </div>
    <table class="items-center mt-5 bg-transparent w-full border-collapse ">
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
          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
           Action
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
        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
          <div className="flex gap-4"><FiEdit onClick={()=>setEditModal(true)} color="blue" title="Edit"/><MdDeleteForever  color="red" size={17} title="Delete"/> </div> </td>
        {editModal ?(<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[5000] outline-none  backdrop-blur-sm backdrop-contrast-50 backdrop-brightness-50 transition duration-100 focus:outline-none">
      <div className="relative w-full my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font=semibold text-black">
              Edit AdUpcoming Records
            </h3>
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={() =>setEditModal(false)}
            >
              <span className="text-black opacity-7 h-6 w-6 text-xl block rounded-full">
                <AiFillCloseCircle onClick={() =>setEditModal(false)} />
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            <form className="bg-gray-200 shadow-md rounded px-8 pt-2 pb-2 w-full flex flex-col gap-[4px]">
              <label className="block text-black text-sm font-bold mb-1">
                Serial Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
                
              />
              <label className="block text-black text-sm font-bold mb-1">
                Date Of Request
              </label>
              <input
              type="date"
                className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
                
              />
              <label className="block text-black text-sm font-bold mb-1">
                Product
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
              
               
              />
              <label className="block text-black text-sm font-bold mb-1">
               Quantity
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
              
               
              />
               <label className="block text-black text-sm font-bold mb-1">
                Date Of Dispatch
              </label>
              <input
              type="date"
                className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
                
              />
              <label className="block text-black text-sm font-bold mb-1">
              Pincode, City
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
              
               
              />
            </form>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={() =>setEditModal(false)}
            >
              Close
            </button>
            <button
              className="text-white bg-[#175eab] active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
            
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>):null}
        </tr>
       
      </tbody>
    </table>
  </div>

  );
};

export default AdUpcoming;
