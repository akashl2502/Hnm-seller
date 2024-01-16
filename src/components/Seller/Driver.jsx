import React, { useState } from "react";
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
import { useSearchParams } from "react-router-dom";
import { Db } from "../../Firebase/Firebase-Config";
import { LS } from "../../constants/Reusedfunctopn";
import { Orderdetails, Transportref } from "../../Serverquery/Firebaseref";
import { BsTruck, BsPhone } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { AiOutlineUserSwitch } from "react-icons/ai";

import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Errorpage from "../Routing/Error";
function Driver() {
  const [Cindex, SetCindex] = useState(0);
  const [Action, Setaction] = useState([0, 0, 0, 0]);
  const [metadata, Setmetadata] = useState([0, 0]);
  let [searchParams, setSearchParams] = useSearchParams();
  const [Dataid, Setdataid] = useState("");
  const [Innerdataid, Setinnerdataid] = useState([]);
  const toastid = toast;
  const [showModal, setShowModal] = useState(false);
  const [Data, Setdata] = useState([]);
  const [isloading, Setloading] = useState(true);
  const [Transdet, Settransdet] = useState({ VN: "", DN: "" });
  const [Error, Seterror] = useState(false);
  const Getdata = async () => {
    Setloading(true);
    const docRef = doc(Db, "Transport", searchParams.get("id"));

    await getDoc(docRef)
      .then((res) => {
        if (res) {
          var indata = res.data();
          var a = Object.keys(indata);

          var ID = [];
          var verified;
          var meta = [];
          var did;
          var inid = [];
          a.map((d) => {
            if (
              d != "id" &&
              d != "metadata" &&
              d != "verify" &&
              d != "transporteruid"
            ) {
              ID.push(indata[d]);
              inid.push(indata[d].id);
            } else if (d == "metadata") {
              meta.push(indata[d].VN);
              meta.push(indata[d].DN);
            } else if (d == "id") {
              did = indata[d];
            } else if (d == "verify") {
              verified = indata[d];
            }
          });
          Setaction(verified);
          console.log(Action);
          Setdata(ID);
          Setmetadata(meta);
          Setloading(false);
          Setinnerdataid(inid);
        } else {
          Seterror(true);
        }
      })
      .catch((e) => {
        Setloading(false);
        Seterror(true);
      });
  };
  const Processdata = () => {
    var te = Action;
    te[Cindex] = 1;
    Setloading(true);
    const docRef = doc(Db, "Transport", searchParams.get("id"));
    updateDoc(docRef, { verify: te })
      .then((docRef) => {
        console.log("A New Document Field document");
        const docRef1 = doc(Db, "orderdetails", Innerdataid[Cindex]);
        const data = {
          Vstatus: true,
        };
        updateDoc(docRef1, data)
          .then((docRef) => {
            console.log(
              "A New Document Field has been added to an existing document"
            );
            setShowModal(false);
            Getdata();
            Setloading(false);
          })
          .catch((error) => {
            Setloading(false);
            setShowModal(false);

            console.log(error);
          });
        toast.success("Transport data Successfully updated", { id: toastid });
      })
      .catch((error) => {
        Setloading(false);
        setShowModal(false);

        console.log(error);
      });
  };
  useEffect(() => {
    Getdata();
  }, []);
  if (isloading) {
    return (
      <div class="loader flex justify-center items-center h-screen">
        <div data-glitch="Loading..." class="glitch">
          Loading...
        </div>
      </div>
    );
  }
  if (Error) {
    return <Errorpage />;
  }

  if (isloading) {
    return (
      <div class="loader flex justify-center items-center h-screen">
        <div data-glitch="Loading..." class="glitch">
          Loading...
        </div>
      </div>
    );
  }
  return (
    <div class="block w-[100%] overflow-hidden h-screen home pt-20">
      {showModal ? (
        <>
          <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[400px] my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Transport Details
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="flex w-full  flex-col gap-10 p-8 justify-center items-start">
                  <h3 className="">Are you sure to change status to be verified</h3>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="text-emerald-500  active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded  hover: outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      Processdata();
                    }}
                  >
                    {"Add"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="pt-10 flex justify-between">
        <p className="ml-10 text-xl font-sans max-xs:ml-5">Driver Details</p>
      </div>
      <div className="table-container  px-10 w-[97%] h-full mt-10 max-xs:px-4 max-ss:px-6 max-sm:px-8">
        <div className="flex flex-col justify-end items-end gap-5">
          <table class="items-center mt-5 bg-transparent w-full border-collapse  ">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Serial.No
                </th>
                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Address
                </th>

                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Number
                </th>
                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Vehicle number
                </th>
                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Driver Number
                </th>
                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Verified
                </th>
                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Action
                </th>
                {/* <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Action
            </th> */}
              </tr>
            </thead>

            <tbody>
              {Data.map((inside, index) => {
                return (
                  <tr key={index}>
                    <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {index + 1}
                    </td>
                    <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {`${inside.city}, ${inside.region}, ${inside.pincode}`}
                    </td>
                    <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {inside.Number}
                    </td>
                    <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {metadata[0]
                        ? metadata[0]
                        : "Vehicle number needed to be added"}
                    </td>
                    <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {metadata[1]
                        ? metadata[1]
                        : "Driver number needed to be added"}
                    </td>
                    <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {Action[index] == 1 ? "Verified" : "Not Verified"}
                    </td>{" "}
                    <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      <button>
                        {Action[index] == 1 ? (
                          <TiTick size={20} color="green" onClick={(e) => {}} />
                        ) : (
                          <AiOutlineUserSwitch
                            size={20}
                            color="green"
                            onClick={(e) => {
                              setShowModal(true);
                              SetCindex(index);
                            }}
                          />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default Driver;
