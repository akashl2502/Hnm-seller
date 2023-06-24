import React, { useState } from "react";
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
import {
  useFirestoreQuery,
  useFirestoreQueryData,
} from "@react-query-firebase/firestore";
import { Db } from "../../Firebase/Firebase-Config";
import { Globaltoast, LS } from "../../constants/Reusedfunctopn";
import { Orderdetails } from "../../Serverquery/Firebaseref";
import { FiEdit } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import Loading from "../SIdebar/Loading";

const AdDelivery = () => {
  var a = query(
    Orderdetails,

    where("status", "==", 1)
  );
  const {
    data: seller,
    isLoading: isloading,
    isError: error,
  } = useFirestoreQuery(["inprogress_admin"], a, { subscribe: true }, {});

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
  const toastid = Globaltoast;
  return (
    <div class="block w-[100%] overflow-x-auto mt-20">
      <div className="mt-1 flex justify-between">
        <p className="ml-10 text-xl font-sans">Delivery Records</p>
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
          {product.map((data, index) => {
            return (
              <tr key={index}>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                  {index + 1}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                  {data.dor}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                  {data.product}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                  {data.quantity}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                  {data.dod}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                  {`${data.pincode} , ${data.city} ,${data.region}`}
                </td>
                <td>
                  <div className="flex justify-center items-center mr-10">
                    <FiEdit
                      onClick={async (e) => {
                        const docRef = doc(Db, "orderdetails", data.id);
                        await updateDoc(docRef, { status: 2 })
                          .then((res) => {
                            toastid.success(
                              "Inprogress Status Successfully Updated",
                              { id: toastid }
                            );
                          })
                          .catch((res) => {
                            toastid.success(
                              "Inprogress Status Failed To Update",
                              {
                                id: toastid,
                              }
                            );
                          });
                      }}
                      color="blue"
                      title="Edit"
                    />
                    <AiFillDelete
                      onClick={async (e) => {
                        const docRef = doc(Db, "orderdetails", data.id);
                        await deleteDoc(docRef)
                          .then((res) => {
                            toastid.success(
                              "In-progress Record Successfully Removed",
                              {
                                id: toastid,
                              }
                            );
                          })
                          .catch((res) => {
                            toastid.error(
                              "In-progress Record Cannot Be Removed",
                              {
                                id: toastid,
                              }
                            );
                          });
                      }}
                      color="red"
                      title="Delete"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default AdDelivery;
