import React, { useState, useEffect } from "react";
import { AiOutlineUsergroupAdd, AiOutlineUp } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { AdminbarData, SellerData } from "./SidebarData";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Authentication } from "../../Firebase/Firebase-Config";
import "./sidebar.css";
import { LS } from "../../constants/Reusedfunctopn";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [SidebarData, Setsidebardata] = useState([]);
  const handleClick = () => {
    setShow(!show);
  };
  useEffect(() => {
    console.log(LS.get("US"));
    var type = LS.get("US") || "Admin";
    if (type == "Admin") {
      Setsidebardata(AdminbarData);
    } else {
      Setsidebardata(SellerData);
    }

    //  Setsidebardata(SellerData)
  }, []);
  return (
    <div>
      {/* <div className="header" onClick={handleClick}>
      <i className="fas fa-bars"></i>
    </div> */}
      <div class="fixed w-full top-0 flex items-center justify-between h-14 text-white z-0">
        <div class="flex items-center justify-start md:justify-center pl-3 w-14 md:w-80 h-14 bg-[#171717]  dark:bg-gray-800 border-none">
          <div className="header" onClick={handleClick}>
            <i className="fas fa-bars"></i>
          </div>
          <img
            class="w-7 h-7 md:w-80 md:h-10 mr-2 rounded-md overflow-hidden"
            src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
          />
          <span class="hidden md:block">Login(Admin/seller)</span>
        </div>
        <div class="flex justify-between items-center w-full h-14 bg-[#171717] dark:bg-gray-800 header-right">
          <div class="bg-white rounded flex items-center ml-20 w-full max-w-xl mr-4 p-2 shadow-sm border border-gray-200">
            <button class="outline-none focus:outline-none ">
              <svg
                class="w-5 text-gray-600 h-5 cursor-pointer"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>

            <input
              type="search"
              name=""
              id=""
              placeholder="Search"
              class="w-full pl-3 text-sm  text-black outline-none focus:outline-none bg-transparent"
            />
          </div>
          <ul class="flex items-center">
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
                      class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                    >
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
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          ></path>
                        </svg>
                      </div>

                      <input
                        type="search"
                        id="default-search"
                        class="block p-4 pl-10  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search For Exisiting Users..."
                        required
                      />
                      <button
                        type="submit"
                        class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
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
                                        aria-hidden="true"
                                      ></div>
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
                                        aria-hidden="true"
                                      ></div>
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
                          {/* <span class="flex items-center col-span-3">
            {" "}
            Showing 21-30 of 100{" "}
          </span> */}
                          <span class="col-span-2"></span>

                          {/* <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
              <ul class="inline-flex items-center">
                <li>
                  <button
                    class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                    aria-label="Previous"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
                <li>
                  <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    1
                  </button>
                </li>
                <li>
                  <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    2
                  </button>
                </li>
                <li>
                  <button class="px-3 py-1 text-white dark:text-gray-800 transition-colors duration-150 bg-blue-600 dark:bg-gray-100 border border-r-0 border-blue-600 dark:border-gray-100 rounded-md focus:outline-none focus:shadow-outline-purple">
                    3
                  </button>
                </li>
                <li>
                  <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    4
                  </button>
                </li>
                <li>
                  <span class="px-3 py-1">...</span>
                </li>
                <li>
                  <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    8
                  </button>
                </li>
                <li>
                  <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                    9
                  </button>
                </li>
                <li>
                  <button
                    class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                    aria-label="Next"
                  >
                    <svg
                      class="w-4 h-4 fill-current"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </span> */}
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
                        class="block mt-5 ml-3  text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Name
                      </label>
                      <input
                        type="name"
                        name="name"
                        id="email"
                        class="bg-gray-50 border mt-2 w-[80%] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ml-10  p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
                        class="block mt-5 ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Phone Number
                      </label>
                      <input
                        name="password"
                        id="password"
                        class="bg-gray-50 border mt-2 w-[80%] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ml-10 p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
                      class="w-[25%] ml-[37%] mt-[10%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Create
                    </button>
                  </div>
                </div>

               
              </div>
              {/* <button
          
          
          class="group p-2 m-10 pl-5 pr-5 transition-colors duration-200 rounded-md shadow-md bg-[#363636] hover:bg-blue-200 dark:bg-gray-50 dark:hover:bg-gray-200 text-white  text-md font-poppins focus:outline-none"
        >
         <span><AiOutlineUser/></span>
         <p>Add User</p> 

        </button> */}
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
        className={show ? "backdrop backdrop-open" : "backdrop"}
        onClick={handleClick}
      ></div>
      <div className={show ? "sidebar collapse" : "sidebar"}>
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
