import React, { useState } from "react";
import { query, where } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { LS } from "../../constants/Reusedfunctopn";
import { Orderdetails } from "../../Serverquery/Firebaseref";
import { Toaster } from "react-hot-toast";

function Completed() {
  const uid = LS.get("data").uid;
  const queryRef =
    LS.get("data").type === 1
      ? query(Orderdetails, where("uid", "==", uid), where("status", "==", 3))
      : query(
          Orderdetails,
          where("GST", "==", LS.get("data").gst),
          where("status", "==", 3)
        );

  const {
    data: seller,
    isLoading,
    isError,
  } = useFirestoreQuery(["Completed_seller"], queryRef, { subscribe: true });

  if (isLoading) {
    return (
      <div className="loader flex justify-center items-center h-screen">
        <div data-glitch="Loading..." className="glitch">
          Loading...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-5">
        An error occurred while fetching data. Please try again later.
      </div>
    );
  }

  const products = seller.docs.map((docSnapshot) => ({
    ...docSnapshot.data(),
    id: docSnapshot.id,
  }));

  return (
    <div className="w-full h-screen pt-20  home2">
      <div className="flex justify-between items-center px-10 pt-10">
        <p className="text-2xl font-poppins text-gray-800">Completed Records</p>
      </div>

      <div className="px-6 mt-10 w-full h-full overflow-x-auto">
        <table className="min-w-full bg-transparent border-collapse shadow-lg rounded-lg">
          <thead className=" text-white">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold uppercase text-left text-gray-300">
                Serial No
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase text-left text-gray-300">
                Date of Request
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase text-left text-gray-300">
                Product
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase text-left text-gray-300">
                Quantity
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase text-left text-gray-300">
                Date of Dispatch
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase text-left text-gray-300">
                City
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase text-left text-gray-300">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((data, index) => (
              <tr
                key={index}
                className=" hover:bg-gray-200 transition duration-300 font-poppins text-sm"
              >
                <td className="px-6 py-3  text-gray-700">{index + 1}</td>
                <td className="px-6 py-3  text-gray-700">{data.dor}</td>
                <td className="px-6 py-3  text-gray-700">{data.product}</td>
                <td className="px-6 py-3  text-gray-700">{data.quantity}</td>
                <td className="px-6 py-3  text-gray-700">{data.dod}</td>
                <td className="px-6 py-3  text-gray-700">{` ${data.city}`}</td>
                <td className="px-6 py-3  text-gray-700">
                  {data.Vstatus ? "Delivered" : "Not Delivered"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default Completed;
