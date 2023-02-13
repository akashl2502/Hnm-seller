import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
const Adduser = () => {
  const [showModal, setShowModal] = useState(false);
  const [Radio, Setradio] = useState({
    Read: false,
    Write: false,
  });
  return (
    <div class="block w-[100%] overflow-x-auto mt-20">
      <div className="flex justify-between w-[95%]   p-5  ">
        <h3 className="text-3xl  font=semibold text-black">Exisiting Users</h3>
        <button
          className="px-2 py-2 bg-[#171717] text-white text-xs rounded-md "
          onClick={() => setShowModal(true)}
        >
          Add Users
        </button>
        {showModal ? (
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[5000] outline-none  backdrop-blur-sm backdrop-contrast-50 backdrop-brightness-50 transition duration-100 focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-xl font=semibold text-black">
                    Add New Users
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block rounded-full">
                      <AiFillCloseCircle onClick={() => setShowModal(false)} />
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto overflow-auto ">
                  <form className="bg-gray-200 shadow-md  rounded px-8 pt-2 pb-2 w-full flex flex-col gap-[4px]">
                    <label className="block text-black text-sm font-bold mb-1">
                      Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-1 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Email Id
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
                      type="number"
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-1 px-1 text-black" />
                    <div className="flex justify-between mt-5">
                      <label className="block text-black text-sm font-bold mb-1">
                        Edit Permissions
                      </label>
                      <div className="flex gap-3">
                        <input
                          type={"radio"}
                          checked={Radio.Read}
                          onChange={(e) => {
                            console.log(e.target.value);
                            Setradio({ Write: false, Read: true });
                          }}
                        />
                        <label>Read</label>
                        <input
                          type={"radio"}
                          checked={Radio.Write}
                          onChange={(e) => {
                            console.log(e.target.value);
                            Setradio({ Write: true, Read: false });
                          }}
                        />
                        <label>Write</label>
                      </div>
                    </div>

                    <div className="flex justify-center text-lg font-medium mt-6">
                      Permissions
                    </div>
                    <div className="flex w-full justify-between mt-6 smalldevice">
                      <div>
                        <p>Date Of Requests</p>
                        <input type="checkbox" />
                      </div>
                      <div>
                        <p>Product</p>
                        <input type="checkbox" />
                      </div>
                      <div>
                        <p>Quantity</p>
                        <input type="checkbox" />
                      </div>
                      <div>
                        <p>Date Of Dispatch</p>
                        <input type="checkbox" />
                      </div>
                      <div>
                        <p>Pincode , City</p>
                        <input type="checkbox" />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
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
          </div>
        ) : null}
      </div>
      <table class="items-center mt-1 bg-transparent w-full border-collapse ">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Serial.No
            </th>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Date Of Request
            </th>

            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Product
            </th>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Quantity
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
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
              asdad
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
              Lorem
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
              Lorem
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
              Lorem ipsum{" "}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
              Lorem ipsum
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
              Lorem ipsum dolor sit amet.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Adduser;
