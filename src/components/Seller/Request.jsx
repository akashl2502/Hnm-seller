import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { deleteDoc, doc, query, where } from "firebase/firestore";

import { LS } from "../../constants/Reusedfunctopn";
import { Orderdetails } from "../../Serverquery/Firebaseref";
import { useEffect } from "react";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { Db, storage } from "../../Firebase/Firebase-Config";
import { AiFillDelete } from "react-icons/ai";

function Request() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const handleDelete = async (item) => {
    console.log(item);
    const docRef = doc(Db, "orderdetails", item.id);
    try {
      await deleteDoc(docRef);
      toast.success("Request successfully removed");
      setDeleteModal(false);
    } catch (error) {
      toast.error("Failed to remove request");
    }
  };

  var uid = LS.get("uid");
  var a = query(
    Orderdetails,
    where("uid", "==", uid),
    where("status", "==", 0)
  );
  useEffect(() => {}, []);
  const {
    data: seller,
    isLoading: isloading,
    isError,
  } = useFirestoreQuery(["Request_user"], a, { subscribe: true }, {});

  if (isloading) {
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
      <div className="text-red-500 w-full mx-auto mt-1o">
        Failed to load data. Try again later.
      </div>
    );
  }

  const product = seller.docs.map((docSnapshot) => ({
    ...docSnapshot.data(),
    id: docSnapshot.id,
  }));
  return (
    <div className="block w-full pt-20 overflow-hidden home2 h-screen">
      <div className="mt-1 flex justify-between">
        <p className="ml-10 text-2xl font-sans max-xs:ml-5 ">
          Requested Records
        </p>
      </div>

      {deleteModal && (
        <div className="fixed inset-0 z-[5000] backdrop-blur-sm backdrop-contrast-50 backdrop-brightness-50">
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-2xl font-semibold text-black">
                    Confirm Deletion
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black"
                    onClick={() => setDeleteModal(false)}
                  >
                    <AiFillCloseCircle className="text-black opacity-7 text-xl block rounded-full" />
                  </button>
                </div>
                <div className="relative p-6 flex-auto text-center">
                  <p className="text-black text-sm">
                    Are you sure you want to delete this record?
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm"
                    onClick={() => setDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow"
                    onClick={() => {
                      handleDelete(deleteItem);
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table Content */}
      <div className="table-container px-10 w-[97%] h-full mt-10">
        <table className="items-center overflow-auto mt-5 bg-transparent border-collapse rounded-x shadow-2xl">
          <thead className="bg-gray-800 text-white font-poppins">
            <tr>
              <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                Serial.No
              </th>
              <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                Date Of Request
              </th>
              <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                Product
              </th>
              <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                Quantity (KG)
              </th>
              <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                Date of Dispatch
              </th>
              <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                City
              </th>
              <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {product.map((data, index) => (
              <tr
                key={index}
                className="font-poppins text-sm hover:bg-gray-100"
              >
                <td className="border-t-0  px-6 py-4 text-left font-poppins">
                  {index + 1}
                </td>
                <td className="border-t-0  px-6 py-4 text-left ">{data.dor}</td>
                <td className="border-t-0  px-6 py-4 text-left">
                  {data.product}
                </td>
                <td className="border-t-0  px-6 py-4 text-left">
                  {data.quantity}
                </td>
                <td className="border-t-0  px-6 py-4 text-left">{data.dod}</td>
                <td className="border-t-0  px-6 py-4 text-left">{data.city}</td>
                <td className="border-t-0  px-6 py-4 text-left">
                  <div className="flex justify-center items-center gap-2 cursor-pointer">
                    <AiFillDelete
                      color="red"
                      title="Delete"
                      onClick={() => {
                        setDeleteItem(data);
                        setDeleteModal(true);
                      }}
                    />
                  </div>
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

export default Request;
