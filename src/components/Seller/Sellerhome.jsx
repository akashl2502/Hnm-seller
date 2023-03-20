import React from 'react'
import { FaHome } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { BiHelpCircle } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUsergroupAdd, AiOutlineUser } from "react-icons/ai";
import { UilMobileAndroidAlt } from "@iconscout/react-unicons";
import { UilUser } from "@iconscout/react-unicons";
import { NavLink } from "react-router-dom";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import "./seller.css"
const Sellerhome = () => {
  return (
   <div className='h-screen w-full home '>
    <div className='h-full flex justify-center items-center '>
<div className='box h-[400px] pb-12 w-[800px] rounded-lg mt-5  '>
<div className='h-full flex flex-col flex-wrap'>
  <div className='h-[70%] flex  justify-evenly items-center flex-wrap'>
    <div className='flex flex-col gap-2 '>
      <label className="block text-black text-sm font-bold mb-1">Product</label>
      <input  className="shadow  appearance-none border outline-none rounded w-full py-1 px-1 text-black"/>
    </div>
    <div className='flex flex-col gap-2'>
      <label className="block text-black text-sm font-bold mb-1">Quantity (IN KGS)</label>
      <input type="number"  className="shadow appearance-none outline-none  border rounded w-full py-1 px-1 text-black"/>
    </div>
    <div className='flex flex-col gap-2'>
      <label className="block text-black text-sm font-bold mb-1">Date Of Dispatch</label>
      <input type="date" className="shadow appearance-none border  outline-none rounded w-full py-1 px-1 text-black"/>
    </div>
    
  </div>
  <div className='w-full flex justify-evenly flex-wrap'>
  <div className='flex flex-col gap-2'>
      <label className="block text-black text-sm font-bold mb-1">Pin Code</label>
      <input maxLength={6} type="number" className="shadow appearance-none outline-none  border rounded w-full py-1 px-1 text-black"/>
    </div>
    <div className='flex flex-col gap-2'>
      <label className="block text-black text-sm font-bold mb-1">Region, City</label>
      <input  className="shadow appearance-none outline-none  border rounded w-full py-1 px-1 text-black"/>
    </div>
    <div className='flex h-full justify-center items-center'>
    <div className='flex flex-col justify-center items-center text-white px-8 py-2 text-sm rounded-lg bg-[#1717ab] gap-2'>
     <button>Submit</button>
    </div>
    </div>
    
  </div>
  

</div>
</div>
    </div>
   </div>
   
  )
}

export default Sellerhome