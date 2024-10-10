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
import { Db } from "../../Firebase/Firebase-Config";
import { LS, websitelink } from "../../constants/Reusedfunctopn";
import { Orderdetails, Transportref } from "../../Serverquery/Firebaseref";
import { BsTruck, BsPhone } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { MdContentCopy } from "react-icons/md";

import { useEffect } from "react";
import { data } from "autoprefixer";
function Transport() {
  const [Dataid, Setdataid] = useState("");
  const [Innerdataid, Setinnerdataid] = useState([]);
  const toastid = toast;
  const [showModal, setShowModal] = useState(false);
  const [Data, Setdata] = useState([]);
  const [isloading, Setloading] = useState(true);
  const [Transdet, Settransdet] = useState({ VN: "", DN: "" });

  const Getdata = async () => {
    Setloading(true);
    const uid = LS.get("uid");
    const q = query(Transportref, where("transporteruid", "==", uid));
    await getDocs(q).then((res) => {
      const a = res.docs.map((docSnapshot) => {
        const data = { ...docSnapshot.data(), id: docSnapshot.id };
        return data;
      });
      Orderdata({ dataincome: a });
      Setloading(false);
    });
  };

  const Orderdata = ({ dataincome }) => {
    var ok = [];
    var notok = [];
    dataincome.map((data, index) => {
      if (data.metadata.VN && data.metadata.VN) {
        ok.push(data);
      } else {
        notok.push(data);
      }
    });
    ok.map((data) => {
      notok.push(data);
    });

    Setdata(notok);
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
  const Processdata = () => {
    Setloading(true);
    if (Transdet.DN.length == 10 && Transdet.VN.length != 0) {
      const docRef = doc(Db, "Transport", Dataid);
      updateDoc(docRef, { metadata: Transdet })
        .then((docRef) => {

          Innerdataid.map((da) => {
            const docRef = doc(Db, "orderdetails", da);
            const data = {
              VN: Transdet.VN,
              DN: Transdet.DN,
            };
            updateDoc(docRef, data)
              .then((docRef) => {
               
                setShowModal(false);
                Getdata();
                Setloading(false);
              })
              .catch((error) => {
                Setloading(false);
                setShowModal(false);

                console.log(error);
              });
          });
          toast.success("Transport data Successfully updated", { id: toastid });
        })
        .catch((error) => {
          Setloading(false);
          setShowModal(false);

          console.log(error);
        });
    } else {
      toast.error("Fill all the details", { id: toastid });
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
  const copyToClipboard = (text) => {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
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
                  <div className=" flex w-full flex-col gap-2">
                    <div className="text-left flex gap-2 justify-start items-center">
                      <label htmlFor="">Vehicle Number</label>
                      <BsTruck />
                    </div>
                    <div className="w-full">
                      <input
                        className="bg-gray-100 w-full border border-black rounded-sm"
                        type="text"
                        onChange={(e) => {
                          Settransdet({
                            ...Transdet,
                            VN: e.target.value.toUpperCase(),
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <div className="text-left flex justify-start items-center gap-2">
                      <label htmlFor="">Driver Phone Number </label>
                      <BsPhone />
                    </div>
                    <div className="w-full">
                      <input
                        className="bg-gray-100 border w-full border-black rounded-sm"
                        type="text"
                        onChange={(e) => {
                          Settransdet({ ...Transdet, DN: e.target.value });
                        }}
                      />
                    </div>
                  </div>
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
        <p className="ml-10 text-xl font-sans max-xs:ml-5">Transport Details</p>
      </div>
      <div className="table-container  px-10 w-[97%] h-full mt-10 max-xs:px-4 max-ss:px-6 max-sm:px-8">
        {Data.map((td, index) => {
          var a = Object.keys(td);
          var ID = [];
          var metadata = [];
          var did;
          var inid = [];
          a.map((d) => {
            if (
              d != "id" &&
              d != "metadata" &&
              d != "verify" &&
              d != "transporteruid"
            ) {
              ID.push(td[d]);
              inid.push(td[d].id);
            } else if (d == "metadata") {
              metadata.push(td[d].VN);
              metadata.push(td[d].DN);
            } else if (d == "id") {
              did = td[d];
            }
          });
          return (
            <>
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
                        link
                      </th>
                      {/* <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Action
            </th> */}
                    </tr>
                  </thead>

                  <tbody>
                    {ID.map((inside, index) => {
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
                            <MdContentCopy
                              onClick={(e) => {
                                const url = `${websitelink}/driver?id=${td.id}`;
                                copyToClipboard(url);
                                toast.success("Link copied to clipboard", {
                                  id: toastid,
                                });
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {!metadata[0] ? (
                  <button
                    className="px-2 py-1 shadow-md bg-green-500 rounded-md cursor-pointer"
                    onClick={(e) => {
                      setShowModal(true);
                      Setdataid(did);
                      Setinnerdataid(inid);
                    }}
                  >
                    Upload
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </>
          );
        })}
      </div>

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default Transport;
