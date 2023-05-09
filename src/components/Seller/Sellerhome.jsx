import React, { useEffect, useState } from "react";
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
import toast, { Toaster } from "react-hot-toast";
import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import "./seller.css";
import { Globaltoast, LS } from "../../constants/Reusedfunctopn";
import { Orderdetails } from "../../Serverquery/Firebaseref";
import moment from "moment/moment";
import axios from "axios";
import uuid from "react-uuid";
function Sellerhome() {
  var uid = LS.get("uid");
  const today = moment().format("YYYY-MM-DD");
  const [Docid, Setdocid] = useState();
  const [OD, SetOD] = useState({
    dor: today,
    product: "",
    quantity: "",
    dod: "",
    pincode: "",
    city: "",
    region: "",
    status: 0,
    uid: LS.get("uid"),
    read: 0,
    buyeruid: "",
    file1: "",
    file2: "",
  });
  const toastid = Globaltoast;
  const [City, Setcity] = useState();
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [Updata, Setupdata] = useState([]);

  useEffect(() => {
    toastid.dismiss();
    var newdata = sessionStorage.getItem("newdata");
    console.log(newdata);
    if (newdata) {
      sessionStorage.removeItem("newdata");
      toastid.success("New Request Has Been Requested", { id: toastid });
    }

    // Getdata();
  }, []);
  // const Getdata = async () => {
  //   var uid = LS.get("uid");
  //   var a = query(
  //     Orderdetails,
  //     where("uid", "==", uid),
  //     where("status", "==", 0)
  //   );
  //   var product = [];
  //   await getDocs(a).then((snapshot) => {
  //     var vc = snapshot.docs.map((docSnapshot) => {
  //       product.push({ ...docSnapshot.data(), id: docSnapshot.id });
  //     });
  //   });
  //   Setupdata(product);
  // };

  const Getcity = async ({ pin }) => {
    if (pin.length == 6) {
      toastid.loading("Acquired Pincode Information", { id: toastid });
      await axios
        .get(`https://api.postalpincode.in/pincode/${pin}`)
        .then((res) => {
          console.log(res.data);
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
              pincode: pin,
            });
            Setcity(CY);
          } else {
            toastid.error("Invalid PinCode ", { id: toastid });
            SetOD({ ...OD, city: "", region: "" });
            Setcity("");
          }
        });
    } else {
      SetOD({ ...OD, city: "", region: "" });
      Setcity("");
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
      toastid.loading("Updating Request Please Wait .......", { id: toastid });
      await addDoc(Orderdetails, OD)
        .then((res) => {
          setShowModal(false);
          toastid.success("New Request Has Been Requested", { id: toastid });
          sessionStorage.setItem("newdata", true);
          window.location.reload();
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
    <div className="h-screen w-full home ">
      <div className="h-full flex justify-center items-center ">
        <div className="bg-[#fafafa]  shadow border home h-[430px] pb-12 w-[1000px] rounded-lg mt-5">
          <div className="h-full flex justify-center items-center px-4 ">
            <div className=" section group  ">
              <div className=" col span_1_of_3">
                <label className="block text-black text-sm font-bold mb-1">
                  Product
                </label>
                <input
                  className="shadow  appearance-none border outline-none rounded w-full py-1 px-1 text-black"
                  onChange={(e) => {
                    SetOD({ ...OD, product: e.target.value.toUpperCase() });
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 col span_1_of_3">
                <label className="block text-black text-sm font-bold mb-1">
                  Quantity (IN KGS)
                </label>
                <input
                  type="number"
                  className="shadow appearance-none outline-none  border rounded w-full py-1 px-1 text-black"
                  onChange={(e) => {
                    SetOD({ ...OD, quantity: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 col span_1_of_3">
                <label className="block text-black text-sm font-bold mb-1">
                  Date Of Dispatch
                </label>
                <input
                  type="date"
                  className="shadow appearance-none border  outline-none rounded w-full py-1 px-1 text-black"
                  onChange={(e) => {
                    SetOD({ ...OD, dod: e.target.value });
                  }}
                />
              </div>
              <div className="section group">
                <div className="flex flex-col gap-2  col span_1_of_3">
                  <label className="block text-black text-sm font-bold mb-1">
                    Pin Code
                  </label>
                  <input
                    maxLength={6}
                    type="number"
                    className="shadow appearance-none outline-none  border rounded w-full py-1 px-1 text-black"
                    onChange={(e) => {
                      Getcity({ pin: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2 col span_1_of_3">
                  <label className="block text-black text-sm font-bold mb-1 ">
                    Region, City
                  </label>
                  <input
                    className="shadow appearance-none outline-none  border rounded w-full py-1 px-1 text-black"
                    defaultValue={City}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center ">
            <div className="text-center  w-[10%] items-center  text-white px-2 py-2  text-sm rounded-lg bg-[#1717ab] gap-2 max-xs:w-[40%] max-sm:w-[50%]">
              <button
                onClick={(e) => {
                  Newrequest(e);
                }}>
                Submit
              </button>
            </div>
          </div>
        </div>

        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </div>
  );
}

export default Sellerhome;
