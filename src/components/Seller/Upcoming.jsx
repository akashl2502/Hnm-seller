import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
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
import moment from "moment/moment";
import { async } from "@firebase/util";
import axios from "axios";
import { Globaltoast, LS } from "../../constants/Reusedfunctopn";
import { Orderdetails } from "../../Serverquery/Firebaseref";
import { useEffect } from "react";
import {
  useFirestoreQuery,
  useFirestoreQueryData,
} from "@react-query-firebase/firestore";
import { Db, storage } from "../../Firebase/Firebase-Config";
import { AiFillDelete } from "react-icons/ai";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import uuid from "react-uuid";

function Upcoming() {
  const [expanded, setExpanded] = useState({ state: false, in: null });

  const today = moment().format("YYYY-MM-DD");
  const [gstNumber, setGstNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [Edit, Seteddit] = useState({
    dor: "",
    product: "",
    quantity: "",
    dod: "",
    pincode: "",
    city: "",
    region: " ",
    status: 0,
  });
  var uid = LS.get("uid");
  var a = query(
    Orderdetails,
    where("uid", "==", uid),
    where("status", "==", 1)
  );
  useEffect(() => {
  }, []);
  const {
    data: seller,
    isLoading: isloading,
    isError: error,
    refetch,
  } = useFirestoreQuery(["Upcoming_user"], a, { subscribe: true }, {});
  const [Docid, Setdocid] = useState();
  const [OD, SetOD] = useState({
    dor: today,
    product: "",
    quantity: "",
    dod: "",
    pincode: "",
    city: "",
    region: " ",
    status: 0,
    uid: LS.get("uid"),
    read: 0,
    buyeruid: "",
    file1: false,
    file2: false,
  });
  const toastid = Globaltoast;
  const [City, Setcity] = useState();
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [Updata, Setupdata] = useState([]);
  const [Fileimg, Setfileimg] = useState(null);
  toast.dismiss();

  useEffect(() => {
    toastid.dismiss();
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
  const uploadfile = (e) => {
    toast.loading("Uploading File Please Wait ....", { id: toastid });
    try {
      var refimgid;
      const file = e.file;
      if (file != null) {
        const storageRef = ref(storage, `files/${uuid()}.pdf`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                refimgid = downloadURL;
              })
              .then(async (res) => {
                var name = e.namef;
                const docRef = doc(Db, "orderdetails", e.docid);
                if (e.namef == "file1") {
                  await updateDoc(docRef, { file1: refimgid })
                    .then((res) => {
                      toastid.success("File Succcessfully Uploaded", {
                        id: toastid,
                      });
                      setEditModal(false);
                      Setdocid("");
                      SetOD({
                        dor: today,
                        product: "",
                        quantity: "",
                        dod: "",
                        pincode: "",
                        city: "",
                        region: " ",
                        status: 0,
                        uid: LS.get("uid"),
                      });
                    })
                    .catch((err) => {
                      toastid.success("Error While Uploading file", {
                        id: toastid,
                      });
                      setEditModal(false);
                      console.log(err);
                    });
                } else {
                  await updateDoc(docRef, { file2: refimgid })
                    .then((res) => {
                      toastid.success("File Succcessfully Uploaded", {
                        id: toastid,
                      });
                      setEditModal(false);
                      Setdocid("");
                      SetOD({
                        dor: today,
                        product: "",
                        quantity: "",
                        dod: "",
                        pincode: "",
                        city: "",
                        region: " ",
                        status: 0,
                        uid: LS.get("uid"),
                      });
                    })
                    .catch((err) => {
                      toastid.success("Error While Uploading file", {
                        id: toastid,
                      });
                      setEditModal(false);
                      console.log(err);
                    });
                }
              });
          }
        );
      } else {
        toastid.error("Error File cannot be uploaded", { id: toastid });
      }
    } catch (e) {
      console.log(e);
      toastid.error("Error Please Try Again later", { id: toastid });
    }
  };
  const Getcity = async ({ pin }) => {
    if (pin.length == 6) {
      toastid.loading("Acquired Pincode Information", { id: toastid });
      await axios
        .get(`https://api.postalpincode.in/pincode/${pin}`)
        .then((res) => {
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
          SetOD({
            dor: today,
            product: "",
            quantity: "",
            dod: "",
            pincode: "",
            city: "",
            region: " ",
            status: 0,
            uid: LS.get("uid"),
          });
          toastid.success("New Request Has Been Requested", { id: toastid });
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
  const Editrequest = async (e) => {
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
      toastid.loading("Editing Request Please Wait .......", { id: toastid });
      const docRef = doc(Db, "orderdetails", Docid);
      await updateDoc(docRef, OD)
        .then((res) => {
          toastid.success("Data Successfully Edited", { id: toastid });
          setEditModal(false);
          Setdocid("");
          SetOD({
            dor: today,
            product: "",
            quantity: "",
            dod: "",
            pincode: "",
            city: "",
            region: " ",
            status: 0,
            uid: LS.get("uid"),
          });
        })
        .catch((err) => {
          toastid.success("Error While Editing Data", { id: toastid });
          setEditModal(false);
          console.log(err);
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
  if (isloading) {
    return (
      <div class="loader flex justify-center items-center h-screen">
        <div data-glitch="Loading..." class="glitch">
          Loading...
        </div>
      </div>
    );
  }
  var product = [];
  var a = seller.docs.map((docSnapshot) => {
    product.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });
  var Req = Array.from({ length: product.length }, () => false);
  return (
    <div class="block w-[100%] pt-20 overflow-hidden home h-screen">
      <div className="mt-1 flex justify-between">
        <p className="ml-10 text-xl font-sans max-xs:ml-5">Upcoming Records</p>
        {/* <div>
          <button
            className="px-2 py-2 bg-[#171717] text-white text-xs rounded-md mr-10"
            onClick={() => setShowModal(true)}
          >
            New Dispatch
          </button>
        </div> */}
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
                      type="number"
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
                      maxLength={6}
                      onChange={(e) => {
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
        {editModal ? (
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[5000] outline-none  backdrop-blur-sm backdrop-contrast-50 backdrop-brightness-50 transition duration-100 focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold text-black">
                    Edit AdUpcoming Records
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setEditModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block rounded-full">
                      <AiFillCloseCircle onClick={() => setEditModal(false)} />
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
                      defaultValue={OD.product}
                      onChange={(e) => {
                        SetOD({ ...OD, product: e.target.value.toUpperCase() });
                      }}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Quantity
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
                      type="number"
                      defaultValue={OD.quantity}
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
                      defaultValue={OD.dod}
                      onChange={(e) => {
                        SetOD({ ...OD, dod: e.target.value });
                      }}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Pincode
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-1 text-black"
                      maxLength={6}
                      defaultValue={OD.pincode}
                      onChange={(e) => {
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
                    onClick={() => setEditModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-[#175eab] active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={(e) => {
                      Editrequest(e);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="table-container px-10 w-[97%] h-full mt-20 max-xs:px-4 max-ss:px-6 max-sm:px-8">
        <table class="items-center overflow-auto mt-5 bg-transparent border-collapse rounded-xl ">
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
                Quantity (KG)
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Date of Dispatch
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Pincode,City
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Doc 1
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Doc 2
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Vehicle number
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Driver Number
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {product.map((data, index) => {
              return (
                <>
                  <tr key={index}>
                    <td class="border-t-0 bg-gray-300 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {index + 1}
                    </td>
                    <td class="border-t-0 bg-gray-300 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {data.dor}
                    </td>
                    <td class="border-t-0 bg-gray-300 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {data.product}
                    </td>
                    <td class="border-t-0 bg-gray-300 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {data.quantity}
                    </td>
                    <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {data.dod}
                    </td>
                    <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {`${data.pincode},${data.city} `}
                    </td>
                    <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {data.file1 == false ? (
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => {
                            if (e.target.files) {
                              // Setfileimg(e.target.files[0]);

                              uploadfile({
                                file: e.target.files[0],
                                namef: "file1",
                                docid: data.id,
                              });
                            }
                          }}
                        />
                      ) : (
                        <p>File Uploaded</p>
                      )}
                    </td>
                    <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {data.file2 == false ? (
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => {
                            if (e.target.files) {
                              // Setfileimg(e.target.files[0]);

                              uploadfile({
                                file: e.target.files[0],
                                namef: "file2",
                                docid: data.id,
                              });
                            }
                          }}
                        />
                      ) : (
                        <p>File Uploaded</p>
                      )}
                    </td>
                    <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {data.VN ? data.VN : "Not Available"}
                    </td>
                    <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {data.DN ? data.DN : "Not Available"}
                    </td>
                    <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      <div className="flex justify-center items-center gap-2">
                        {/* <FiEdit
                          onClick={(e) => {
                            setEditModal(true);
                            Setdocid(data.id);
                          }}
                          color="blue"
                          title="Edit"
                        /> */}
                        <AiFillDelete
                          onClick={async (e) => {
                            const docRef = doc(Db, "orderdetails", data.id);
                            await deleteDoc(docRef)
                              .then((res) => {
                                toastid.success(
                                  "New Request Successfully Removed",
                                  {
                                    id: toastid,
                                  }
                                );
                              })
                              .catch((res) => {
                                toastid.error("Request Cannot Be Removed", {
                                  id: toastid,
                                });
                              });
                          }}
                          color="red"
                          title="Delete"
                        />
                        {expanded.in == index && expanded.state ? (
                          <IoIosArrowUp
                            onClick={async (e) => {
                              setExpanded({ state: false, in: index });
                            }}
                            color="red"
                            title="Delete"
                          />
                        ) : (
                          <IoIosArrowDown
                            onClick={async (e) => {
                              setExpanded({ state: true, in: index });
                            }}
                            color="red"
                            title="Delete"
                          />
                        )}
                      </div>
                    </td>
                  </tr>{" "}
                  {/* {expanded.in == index && expanded.state ? (
                    <tr>
                      <td colspan="9">
                        <div className="flex gap-4 mt-2">
                          {data.GST ? (
                            <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                              {data.GST}
                            </td>
                          ) : (
                            <input
                              type="text"
                              placeholder="GST Number"
                              value={gstNumber}
                              onChange={(e) => setGstNumber(e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-md"
                            />
                          )}
                          {data.Bnumber ? (
                            <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                              {data.Bnumber}
                            </td>
                          ) : (
                            <input
                              type="text"
                              placeholder="Mobile Number"
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-md"
                            />
                          )}
                          {mobileNumber.length == 10 &&
                          gstNumber.length == 15 ? (
                            <button
                              className="px-6 py-1 bg-green-500 rounded-md "
                              onClick={async () => {
                                const docRef = doc(Db, "orderdetails", data.id);
                                await updateDoc(docRef, {
                                  Bnumber: mobileNumber,
                                  GST: gstNumber,
                                })
                                  .then(() => {
                                    toastid.success(
                                      "Order Details Updated Successfully",
                                      { id: toastid }
                                    );
                                    setGstNumber("");
                                    setMobileNumber("");
                                    setShowModal(false);
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    toastid.error(
                                      "Error Please Try Again Later",
                                      { id: toastid }
                                    );
                                    setShowModal(false);
                                  });
                              }}
                            >
                              Update
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )} */}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default Upcoming;
