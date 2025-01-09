import React, { useEffect, useState, useMemo } from "react";
import { query, where } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { LS } from "../../constants/Reusedfunctopn";
import { Orderdetails } from "../../Serverquery/Firebaseref";
import { Toaster } from "react-hot-toast";

const Loading = () => (
  <div className="loader flex justify-center items-center h-screen">
    <div data-glitch="Loading..." className="glitch">
      Loading...
    </div>
  </div>
);

const Error = () => (
  <div className="text-red-500 text-center mt-5">
    An error occurred while fetching data. Please try again later.
  </div>
);

const Delivery = () => {
  const uid = LS.get("uid");

  const queryRef =
    LS.get("data").type === 1
      ? query(Orderdetails, where("uid", "==", uid), where("status", "==", 2))
      : query(
          Orderdetails,
          where("GST", "==", LS.get("data").gst),
          where("status", "==", 2)
        );

  const {
    data: seller,
    isLoading,
    isError,
  } = useFirestoreQuery(["inprogress_seller"], queryRef, { subscribe: true });

  const products = useMemo(() => {
    if (!seller) return [];
    return seller.docs.map((docSnapshot) => ({
      ...docSnapshot.data(),
      id: docSnapshot.id,
    }));
  }, [seller]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="w-full h-screen pt-20 bg-gray-50 overflow-hidden home2">
      <div className="pt-10 flex justify-between px-6">
        <p className="text-2xl font-sans text-gray-800">Delivery Records</p>
      </div>

      <div className="table-container mt-10 overflow-x-auto px-8 bg-transparent ">
        <table className="min-w-full border-collapse shadow-lg rounded-lg bg-transparent">
          <thead className="bg-gray-800 text-white font-poppins">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold uppercase text-left text-gray-300">
                Serial No
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase text-left text-gray-300">
                Date Of Request
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
                City, Pincode
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase text-left text-gray-300">
                Vehicle Number
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase text-left text-gray-300">
                Driver Number
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase text-left text-gray-300">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((data, index) => (
              <tr
                key={data.id}
                className=" hover:bg-gray-200 transition duration-20 font-poppins text-sm "
              >
                <td className="px-6 py-3  text-gray-700">{index + 1}</td>
                <td className="px-6 py-3  text-gray-700">{data.dor}</td>
                <td className="px-6 py-3  text-gray-700">{data.product}</td>
                <td className="px-6 py-3  text-gray-700">{data.quantity}</td>
                <td className="px-6 py-3  text-gray-700">{data.dod}</td>
                <td className="px-6 py-3  text-gray-700">{`${data.city}, ${data.pincode}`}</td>
                <td className="px-6 py-3  text-gray-700">
                  {data.VN || "Not Available"}
                </td>
                <td className="px-6 py-3  text-gray-700">
                  {data.DN || "Not Available"}
                </td>
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
};

export default Delivery;
