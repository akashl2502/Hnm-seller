import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { FaHome } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { BiHelpCircle } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  FiMessageSquare,
  FiFolder,
  FiShoppingCart,
  FiEdit,
} from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { addDoc, query, updateDoc, where } from "firebase/firestore";
import moment from "moment/moment";
import { async } from "@firebase/util";
import axios from "axios";
import { Globaltoast, LS } from "../../constants/Reusedfunctopn";
import { Orderdetails } from "../../Serverquery/Firebaseref";
import { useEffect } from "react";
const Upcoming = () => {
  const today = moment().format("YYYY-MM-DD");
  console.log(today);
  const [OD, SetOD] = useState({
    dor: today,
    product: "",
    quantity: "",
    dod: "",
    pincode: "",
    city: "",
    region: "",
    status: 0,
  });
  const toastid = Globaltoast;
  const [City, Setcity] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {}, []);
  const Getdata = async () => {
    var a = await query(Orderdetails, where("uid", "==", LS.get("uid")));
  };
  const Getcity = async ({ pin }) => {
    if (pin.length == 6) {
      toastid.loading("Acquired Pincode Information", { id: toastid });
      await axios
        .get(`https://api.postalpincode.in/pincode/${pin}`)
        .then((res) => {
          console.log(res.data[0]);
          if (res.data[0].Status == "Success") {
            toastid.success("Pincode Data Acquired", { id: toastid });
            const CI = res.data[0].PostOffice[0];
            var Name = res.data[0].PostOffice[0].Name;
            var Reg = res.data[0].PostOffice[0].Region;
            var CY = `${Name} ${Reg}`;
            SetOD({
              ...OD,
              city: Name.toUpperCase(),
              region: Reg.toUpperCase(),
            });
            Setcity(CY);
          } else {
            toastid.error("Invalid PinCode ", { id: toastid });
            SetOD({ ...OD, city: "", region: "" });
            Setcity("");
          }
        });
    }
  };

  const Newrequest = async (e) => {
    e.preventDefault();
    if (
      OD.city.length != 0 &&
      OD.dod.length != 0 &&
      OD.dor.length != 0 &&
      OD.pincode.length != 0 &&
      OD.product.length != 0 &&
      OD.quantity.length != 0 &&
      OD.region.length != 0
    ) {
      console.log(OD);
      await addDoc(Orderdetails, OD)
        .then((res) => {
          setShowModal(false);
          toastid.success("New Request Has Been Requested");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      if (OD.city.length == 0) {
        toastid.error("Please Check Pincode", { id: toastid });
      } else if (OD.dod.length == 0) {
        toastid.error("Please Enter Date Of Dispatch", { id: toastid });
      } else if (OD.pincode.length == 0) {
        toastid.error("Please Enter Pincode", { id: toastid });
      } else if (OD.product.length == 0) {
        toastid.error("Please Enter Product Details", { id: toastid });
      } else if (OD.quantity.length == 0) {
        toastid.error("Please Enter the Quantity Of Product", { id: toastid });
      } else if (OD.region.length == 0) {
        toastid.error("Please Check pincode", { id: toastid });
      }
    }
  };
  return (
    <div class="block w-[100%] overflow-x-auto mt-20">
      <div className="mt-1 flex justify-between">
        <p className="ml-10 text-xl font-sans">Upcoming Records</p>
        <div>
          <button
            className="px-2 py-2 bg-[#171717] text-white text-xs rounded-md mr-10"
            onClick={() => setShowModal(true)}
          >
            New Dispatch
          </button>
        </div>
        {showModal ? (
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[5000] outline-none  backdrop-blur-sm backdrop-contrast-50 backdrop-brightness-50 transition duration-100 focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold text-black">
                    Add New Dispatch
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
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-2 pb-2 w-full flex flex-col gap-[4px]">
                    <label className="block text-black text-sm font-bold mb-1">
                      Product
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
                      onChange={(e) => {
                        SetOD({ ...OD, product: e.target.value.toUpperCase() });
                      }}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Quantity (In KG)
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
                      onChange={(e) => {
                        SetOD({ ...OD, quantity: e.target.value });
                      }}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Date Of Dispatch
                    </label>
                    <input
                      type="date"
                      className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
                      onChange={(e) => {
                        SetOD({ ...OD, dod: e.target.value });
                      }}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Pincode
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
                      onChange={(e) => {
                        SetOD({ ...OD, pincode: e.target.value });
                        Getcity({ pin: e.target.value });
                      }}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Region , City
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
                      defaultValue={City}
                      disabled
                    />
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
                    onClick={(e) => {
                      Newrequest(e);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
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
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
              1211{" "}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
              Lorem, ipsum dolor sit{" "}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
              Lorem, ipsum dolor sit{" "}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
              Lorem, ipsum dolor sit{" "}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
              Lorem, ipsum dolor sit{" "}
            </td>
          </tr>
        </tbody>
      </table>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default Upcoming;
