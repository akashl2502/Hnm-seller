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
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import {
  useFirestoreQuery,
  useFirestoreQueryData,
} from "@react-query-firebase/firestore";
import { Orderdetails } from "../../Serverquery/Firebaseref";

function Sidebar() {
  var a = LS.get("data").type;
  const SellerData = [
    a == "seller"
      ? {
          title: "Home",
          path: "/sellerhome",
          icon: <AiIcons.AiFillHome />,
          cName: "nav-text",
        }
      : null,
    a == "seller"
      ? {
          title: "Upcoming Records",
          path: "/upcoming",
          icon: <IoIcons.IoIosPaper />,
          cName: "nav-text",
        }
      : null,
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
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [SidebarData, Setsidebardata] = useState(SellerData);
  const [showModal, setShowModal] = React.useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div>
      <div class="fixed w-full top-0 flex items-center justify-between h-14 text-white z-0">
        <div class="flex items-center justify-start md:justify-center pl-3 w-14 md:w-80 h-14  bg-[#171717] dark:bg-gray-800 border-none">
          <div className="header" onClick={handleClick}>
            <i className="fas fa-bars"></i>
          </div>

          <div className="flex justify-start items-center gap-3 mobile">
            <IconWithDisplayName
              displayName={LS.get("data").name.toUpperCase()}
            />
            <p className="text-lg tracking-wide font-poppins">
              {LS.get("data").name.toUpperCase()}
            </p>
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
                }}
              >
                <span class="inline-flex mr-1">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
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
        onClick={handleClick}
      ></div>
      <div className={show ? "sidebar collapse z-20" : "sidebar z-20"}>
        <div>
          <img src="https://static.vecteezy.com/system/resources/previews/004/825/694/non_2x/g-golden-letter-logo-design-with-circle-swoosh-and-gold-metal-texture-vector.jpg" />
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
