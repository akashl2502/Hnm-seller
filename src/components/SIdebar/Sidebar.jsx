import React, { useState, useEffect } from "react";
import { AiOutlineUsergroupAdd, AiOutlineUp } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import * as FaIcons from "react-icons/fa";
import * as BootstrapIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import classNames from "classnames";
import { signOut } from "firebase/auth";
import { Authentication } from "../../Firebase/Firebase-Config";
import "./sidebar.css";
import { LS } from "../../constants/Reusedfunctopn";
import { useNavigate } from "react-router-dom";
import IconWithDisplayName from "../Admin/Firstletter";
const Sidebar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [SidebarData, Setsidebardata] = useState([]);
  const [showModal, setShowModal] = React.useState(false);

  const AdminbarData = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
    {
      title: "Upcoming Records",
      path: "/adupcoming",
      icon: <IoIcons.IoIosPaper />,
      cName: "nav-text",
    },
    {
      title: "Inprogress Records",
      path: "/addelivery",
      icon: <FaIcons.FaCartPlus />,
      cName: "nav-text",
    },
    {
      title: "Completed Records",
      path: "/adcompleted",
      icon: <IoIcons.IoMdPeople />,
      cName: "nav-text",
    },
    {
      title: "Add Seller",
      path: "/adseller",
      icon: <IoIcons.IoMdPeople />,
      cName: "nav-text",
    },
    {
      title: "Add User",
      path: "/aduser",
      icon: <IoIcons.IoMdPeople />,
      cName: "nav-text",
    },
  ];
  const SellerData = [
    {
      title: "Home",
      path: "/sellerhome",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
    {
      title: "Upcoming Records",
      path: "/upcoming",
      icon: <IoIcons.IoIosPaper />,
      cName: "nav-text",
    },
    {
      title: "Inprogress Records",
      path: "/delivery",
      icon: <FaIcons.FaCartPlus />,
      cName: "nav-text",
    },
    {
      title: "Completed Records",
      path: "/completed",
      icon: <IoIcons.IoMdPeople />,
      cName: "nav-text",
    },
  ];

  const handleClick = () => {
    setShow(!show);
  };
  useEffect(() => {
    console.log(LS.get("US"));
    var type = LS.get("US") || "seller";
    if (type == "Admin") {
      Setsidebardata(AdminbarData);
    } else {
      Setsidebardata(SellerData);
    }

    //  Setsidebardata(AdminbarData)
  }, []);
  return (
    <div>
      <div class="fixed w-full top-0 flex items-center justify-between h-14 text-white z-0">
        <div class="flex items-center justify-start md:justify-center pl-3 w-14 md:w-80 h-14  bg-[#171717] dark:bg-gray-800 border-none">
          <div className="header" onClick={handleClick}>
            <i className="fas fa-bars"></i>
          </div>

          <div className="flex justify-start items-center gap-3 mobile">
            <IconWithDisplayName displayName="Akash" />
            <p className="text-lg tracking-wide font-poppins">Akash</p>
          </div>
          {/* <span class="hidden md:block">Akash</span> */}
        </div>
        <div class="flex justify-end items-center w-full h-14 bg-[#171717] dark:bg-gray-800 header-right">
          <ul class="flex items-center">
            {/* <li>
              <div class="section2  mr-6">
                <input
                  class="modal-btn "
                  type="checkbox"
                  id="modal-btn"
                  name="modal-btn"
                />
                <label for="modal-btn">
                  Exisiting Seller{" "}
                  <span class="ml-2 -mr-1 mb-0.5 w-5 h-5">
                    <FaUsers size="20" />
                  </span>
                </label>
                <div class="modal">
                  <div class="modal-wrap">
                    <label
                      for="default-search"
                      class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-200">
                      Search
                    </label>
                    <div class="relative">
                      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                      </div>

                      <input
                        type="search"
                        id="default-search"
                        class="block p-4 pl-10  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search For Exisiting Users..."
                        required
                      />
                      <button
                        type="submit"
                        class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Search
                      </button>
                    </div>

                    <div class="mt-4 mx-4">
                      <div class="w-full overflow-hidden rounded-lg shadow-xs">
                        <div class="w-full overflow-x-auto">
                          <table class="w-full">
                            <thead>
                              <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <th class="px-4 py-3">Client</th>

                                <th class="px-4 py-3">Status</th>
                              </tr>
                            </thead>
                            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                              <tr class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                                <td class="px-4 py-3">
                                  <div class="flex items-center text-sm">
                                    <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                      <img
                                        class="object-cover w-full h-full rounded-full"
                                        src="https://images.unsplash.com/photo-1666358777322-a25eda95848f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                                        alt=""
                                        loading="lazy"
                                      />
                                      <div
                                        class="absolute inset-0 rounded-full shadow-inner"
                                        aria-hidden="true"></div>
                                    </div>
                                    <div>
                                      <p class="font-semibold">Chris</p>
                                      <p class="text-xs text-gray-600 dark:text-gray-400">
                                        Seller
                                      </p>
                                    </div>
                                  </div>
                                </td>

                                <td class="px-4 py-3 text-xs">
                                  <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                    {" "}
                                    Approved{" "}
                                  </span>
                                </td>
                              </tr>
                              <tr class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                                <td class="px-4 py-3">
                                  <div class="flex items-center text-sm">
                                    <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                      <img
                                        class="object-cover w-full h-full rounded-full"
                                        src="https://images.unsplash.com/photo-1666621203971-e2b529731169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8dG93SlpGc2twR2d8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
                                        alt=""
                                        loading="lazy"
                                      />
                                      <div
                                        class="absolute inset-0 rounded-full shadow-inner"
                                        aria-hidden="true"></div>
                                    </div>
                                    <div>
                                      <p class="font-semibold">Hendry</p>
                                      <p class="text-xs text-gray-600 dark:text-gray-400">
                                        Traveller
                                      </p>
                                    </div>
                                  </div>
                                </td>

                                <td class="px-4 py-3 text-xs">
                                  <span class="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">
                                    {" "}
                                    Pending{" "}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                          <span class="col-span-2"></span>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="section1">
                <input
                  class="modal-btn2"
                  type="checkbox"
                  id="modal-btn2"
                  name="modal-btn2"
                />
                <label for="modal-btn2">
                  Add Sellers{" "}
                  <span class="ml-1 -mr-1 mb-0.5 w-5 h-5">
                    <AiOutlineUsergroupAdd size="20" />
                  </span>
                </label>
                <div class="modal">
                  <div class="modal-wrap">
                    <h1 className="text-black ml-[25%] mt-[5%] font-poppins text-lg tracking-widest">
                      CREATE A NEW USER
                    </h1>
                    <div>
                      <label
                        for="email"
                        class="block mt-5 ml-3  text-sm font-medium text-gray-900 dark:text-gray-200">
                        Name
                      </label>
                      <input
                        type="name"
                        name="name"
                        id="email"
                        class="bg-gray-50 border mt-2 w-[80%] border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ml-10  p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                      <span>
                        <BiUserCircle
                          size="20"
                          class="input-icon mt-[90px] mr-[10px]"
                          color="#000000"
                        />
                      </span>
                    </div>
                    <div>
                      <label
                        for="password"
                        class="block mt-5 ml-3 text-sm font-medium text-gray-900 dark:text-gray-200">
                        Phone Number
                      </label>
                      <input
                        name="password"
                        id="password"
                        class="bg-gray-50 border mt-2 w-[80%] border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ml-10 p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                      <span>
                        <AiOutlineUsergroupAdd
                          size="20"
                          class="input-icon mt-[173px] mr-[10px]"
                          color="#000000"
                        />
                      </span>
                    </div>
                    <button
                      type="submit"
                      class="w-[25%] ml-[37%] mt-[10%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div class="section2  mr-6">
                <input
                  class="modal-btn "
                  type="checkbox"
                  id="modal-btn"
                  name="modal-btn"
                />
                <label for="modal-btn">
                  Exisiting User{" "}
                  <span class="ml-2 -mr-1 mb-0.5 w-5 h-5">
                    <FaUsers size="20" />
                  </span>
                </label>
                <div class="modal">
                  <div class="modal-wrap">
                    <label
                      for="default-search"
                      class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-200">
                      Search
                    </label>
                    <div class="relative">
                      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                      </div>

                      <input
                        type="search"
                        id="default-search"
                        class="block p-4 pl-10  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search For Exisiting Users..."
                        required
                      />
                      <button
                        type="submit"
                        class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Search
                      </button>
                    </div>

                    <div class="mt-4 mx-4">
                      <div class="w-full overflow-hidden rounded-lg shadow-xs">
                        <div class="w-full overflow-x-auto">
                          <table class="w-full">
                            <thead>
                              <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <th class="px-4 py-3">Client</th>

                                <th class="px-4 py-3">Status</th>
                              </tr>
                            </thead>
                            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                              <tr class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                                <td class="px-4 py-3">
                                  <div class="flex items-center text-sm">
                                    <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                      <img
                                        class="object-cover w-full h-full rounded-full"
                                        src="https://images.unsplash.com/photo-1666358777322-a25eda95848f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                                        alt=""
                                        loading="lazy"
                                      />
                                      <div
                                        class="absolute inset-0 rounded-full shadow-inner"
                                        aria-hidden="true"></div>
                                    </div>
                                    <div>
                                      <p class="font-semibold">Chris</p>
                                      <p class="text-xs text-gray-600 dark:text-gray-400">
                                        Seller
                                      </p>
                                    </div>
                                  </div>
                                </td>

                                <td class="px-4 py-3 text-xs">
                                  <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                    {" "}
                                    Approved{" "}
                                  </span>
                                </td>
                              </tr>
                              <tr class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                                <td class="px-4 py-3">
                                  <div class="flex items-center text-sm">
                                    <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                      <img
                                        class="object-cover w-full h-full rounded-full"
                                        src="https://images.unsplash.com/photo-1666621203971-e2b529731169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8dG93SlpGc2twR2d8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
                                        alt=""
                                        loading="lazy"
                                      />
                                      <div
                                        class="absolute inset-0 rounded-full shadow-inner"
                                        aria-hidden="true"></div>
                                    </div>
                                    <div>
                                      <p class="font-semibold">Hendry</p>
                                      <p class="text-xs text-gray-600 dark:text-gray-400">
                                        Traveller
                                      </p>
                                    </div>
                                  </div>
                                </td>

                                <td class="px-4 py-3 text-xs">
                                  <span class="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">
                                    {" "}
                                    Pending{" "}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                          <span class="col-span-2"></span>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="section1">
                <input
                  class="modal-btn2"
                  type="checkbox"
                  id="modal-btn2"
                  name="modal-btn2"
                />
                <label for="modal-btn2">
                  Add Users{" "}
                  <span class="ml-1 -mr-1 mb-0.5 w-5 h-5">
                    <AiOutlineUsergroupAdd size="20" />
                  </span>
                </label>
                <div class="modal">
                  <div class="modal-wrap">
                    <h1 className="text-black ml-[25%] mt-[5%] font-poppins text-lg tracking-widest">
                      CREATE A NEW USER
                    </h1>
                    <div>
                      <label
                        for="email"
                        class="block mt-5 ml-3  text-sm font-medium text-gray-900 dark:text-gray-200">
                        Name
                      </label>
                      <input
                        type="name"
                        name="name"
                        id="email"
                        class="bg-gray-50 border mt-2 w-[80%] border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ml-10  p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                      <span>
                        <BiUserCircle
                          size="20"
                          class="input-icon mt-[90px] mr-[10px]"
                          color="#000000"
                        />
                      </span>
                    </div>
                    <div>
                      <label
                        for="password"
                        class="block mt-5 ml-3 text-sm font-medium text-gray-900 dark:text-gray-200">
                        Phone Number
                      </label>
                      <input
                        name="password"
                        id="password"
                        class="bg-gray-50 border mt-2 w-[80%] border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ml-10 p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                      <span>
                        <AiOutlineUsergroupAdd
                          size="20"
                          class="input-icon mt-[173px] mr-[10px]"
                          color="#000000"
                        />
                      </span>
                    </div>
                    <button
                      type="submit"
                      class="w-[25%] ml-[37%] mt-[10%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </li> */}
            <li class="font-sans block mt-4 lg:inline-block lg:mt-1 lg:ml-6 align-middle text-black hover:text-gray-700">
              <a
                href="#"
                onClick={() => setShowModal(true)}
                role="button"
                class="relative flex">
                {/* <svg class="flex-1 w-8 h-8 fill-current" viewbox="0 0 24 24">
                  <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                </svg> */}
                <svg
                  class="flex-1 w-7 h-7"
                  width="24"
                  height="24"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  {" "}
                  <path
                    d="M18.1336 11C18.7155 16.3755 21 18 21 18H3C3 18 6 15.8667 6 8.4C6 6.70261 6.63214 5.07475 7.75736 3.87452C8.88258 2.67428 10.4087 2 12 2C12.3373 2 12.6717 2.0203 13 2.08949"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    d="M13.73 21C13.5542 21.2031 13.2019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.2054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.2031 10.27 21"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                </svg>
                <span class="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                  5
                </span>
                {showModal ? (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed backdrop-blur-3xl inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative z-50  w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 h-[500px]  rounded-lg  shadow-lg relative flex flex-col w-full z-50 bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start bg-black text-white tracking-wide justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-xl w-full text-center font-semibold">
                              Requests
                            </h3>
                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowModal(false)}>
                              <span className="text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                <BootstrapIcons.BsXCircleFill color="white"/>
                              </span>
                            </button>
                          </div>
                          {/*body*/}
                          <div className="relative h-[50%] home2 p-6 flex-auto overflow-y-auto">
                            <div className="flex gap-3 flex-col ">
                            <div className="box h-[100px] w-[380px] rounded-lg ">
                              <div className="flex justify-evenly items-center">
                                <div className="flex flex-col gap-3">
                                  <div className="pt-5 ">
                                    <p className="text-xl font-bold text-black">Henry</p>
                                  </div>
                                  <div className="w-full text-left font-medium text-black">
                                    <p>Sent You A Request</p>
                                  </div>
                                </div>
                                <div><BootstrapIcons.BsFillCheckSquareFill title="Accept" size={20} color="green"/></div>
                                <div><BootstrapIcons.BsXSquareFill size={20} title="Decline" color="red"/></div>
                              </div>
                            </div>
                            <div className="box h-[100px] w-[380px] rounded-lg">
                              <div className="flex justify-evenly items-center">
                                <div className="flex flex-col gap-3">
                                  <div className="pt-5 ">
                                    <p className="text-xl font-bold text-black">Henry</p>
                                  </div>
                                  <div className="w-full text-left font-medium text-black">
                                    <p>Sent You A Request</p>
                                  </div>
                                </div>
                                <div><BootstrapIcons.BsFillCheckSquareFill title="Accept" size={20} color="green"/></div>
                                <div><BootstrapIcons.BsXSquareFill size={20} title="Decline" color="red"/></div>
                              </div>
                            </div>
                            <div className="box h-[100px] w-[380px] rounded-lg">
                              <div className="flex justify-evenly items-center">
                                <div className="flex flex-col gap-3">
                                  <div className="pt-5 ">
                                    <p className="text-xl font-bold text-black">Henry</p>
                                  </div>
                                  <div className="w-full text-left font-medium text-black">
                                    <p>Sent You A Request</p>
                                  </div>
                                </div>
                                <div><BootstrapIcons.BsFillCheckSquareFill title="Accept" size={20} color="green"/></div>
                                <div><BootstrapIcons.BsXSquareFill size={20} title="Decline" color="red"/></div>
                              </div>
                            </div>
                            <div className="box h-[100px] w-[380px] rounded-lg">
                              <div className="flex justify-evenly items-center">
                                <div className="flex flex-col gap-3">
                                  <div className="pt-5 ">
                                    <p className="text-xl font-bold text-black">Henry</p>
                                  </div>
                                  <div className="w-full text-left font-medium text-black">
                                    <p>Sent You A Request</p>
                                  </div>
                                </div>
                                <div><BootstrapIcons.BsFillCheckSquareFill title="Accept" size={20} color="green"/></div>
                                <div><BootstrapIcons.BsXSquareFill size={20} title="Decline" color="red"/></div>
                              </div>
                            </div>
                            <div className="box h-[100px] w-[380px] rounded-lg">
                              <div className="flex justify-evenly items-center">
                                <div className="flex flex-col gap-3">
                                  <div className="pt-5 ">
                                    <p className="text-xl font-bold text-black">Henry</p>
                                  </div>
                                  <div className="w-full text-left font-medium text-black">
                                    <p>Sent You A Request</p>
                                  </div>
                                </div>
                                <div><BootstrapIcons.BsFillCheckSquareFill title="Accept" size={20} color="green"/></div>
                                <div><BootstrapIcons.BsXSquareFill size={20} title="Decline" color="red"/></div>
                              </div>
                            </div>
                            </div>
                           
                          </div>
                         
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
              </a>
            </li>

            <li>
              <div class="block w-px h-6 mx-3 top1 bg-gray-400 dark:bg-gray-700"></div>
            </li>

            <li>
              <a
                href="#"
                class="flex items-center mr-4 hover:text-blue-100"
                onClick={() => {
                  signOut(Authentication).then((res) => {
                    LS.clear();
                    navigate("../signin", { replace: true });
                  });
                }}>
                <span class="inline-flex mr-1">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                </span>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={show ? "backdrop backdrop-open " : "backdrop "}
        onClick={handleClick}></div>
      <div className={show ? "sidebar collapse z-20" : "sidebar z-20"}>
        <div>
          <img src="https://static.vecteezy.com/system/resources/previews/004/825/694/non_2x/g-golden-letter-logo-design-with-circle-swoosh-and-gold-metal-texture-vector.jpg" />
        </div>
        <ul>
          {SidebarData.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.path} className="nav-link">
                  {item.icon}

                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="absolute bottom-0 left-[25%] text-white">
          <p>Copyright @ 2022</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
