import React, { useState, useEffect } from "react";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import {
  addDoc,
  deleteDoc,
  doc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import moment from "moment";
import { Globaltoast, LS } from "../../constants/Reusedfunctopn";
import { Orderdetails } from "../../Serverquery/Firebaseref";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { Db, storage } from "../../Firebase/Firebase-Config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import uuid from "react-uuid";

function Upcoming() {
  const today = moment().format("YYYY-MM-DD");
  const [expanded, setExpanded] = useState({ state: false, in: null });
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
  });
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const toastid = Globaltoast;

  const uid = LS.get("uid");
  const queryRef = query(
    Orderdetails,
    where("uid", "==", uid),
    where("status", "==", 1)
  );
  const {
    data: seller,
    isLoading,
    isError,
    refetch,
  } = useFirestoreQuery(["Upcoming_user"], queryRef, { subscribe: true });

  useEffect(() => {
    toastid.dismiss();
  }, []);

  const uploadFile = (e) => {
    toast.loading("Uploading File Please Wait ....", { id: toastid });
    const file = e.file;
    if (file) {
      const storageRef = ref(storage, `files/${uuid()}.pdf`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          toastid.error("Error uploading file", { id: toastid });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const docRef = doc(Db, "orderdetails", e.docid);
            updateDoc(docRef, { [e.namef]: downloadURL })
              .then(() => {
                toastid.success("File successfully uploaded", { id: toastid });
                setShowModal(false);
              })
              .catch(() => {
                toastid.error("Error while uploading file", { id: toastid });
              });
          });
        }
      );
    } else {
      toastid.error("File cannot be uploaded", { id: toastid });
    }
  };

  const handleDeleteRequest = async () => {
    try {
      if (deleteItem) {
        await deleteDoc(doc(Db, "orderdetails", deleteItem));
        toastid.success("Request successfully removed", { id: toastid });
        setDeleteModal(false); 
      }
    } catch (error) {
      toastid.error("Request cannot be removed", { id: toastid });
      setDeleteModal(false); 
    }
  };

 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold">Loading...</div>
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
    <div className="block w-full pt-20 overflow-hidden bg-gray-50 min-h-screen home2">
      <div className="mt-1 flex justify-between">
        <p className="ml-10 text-2xl font-sans max-xs:ml-5 ">Upcoming Records</p>
      </div>

      {deleteModal && (
        <div className="fixed inset-0 z-[5000] backdrop-blur-sm backdrop-contrast-50 backdrop-brightness-50">
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-2xl font-semibold text-black font-sans">
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
                  <p className="text-black text-sm font-poppins">
                    Are you sure you want to delete this record?
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm font-poppins"
                    onClick={() => setDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow font-poppins"
                    onClick={handleDeleteRequest}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto p-4 mt-10">
        <table className="min-w-full table-auto shadow-lg rounded-lg bg-transparent border-collapse">
          <thead className="bg-gray-800 text-white font-poppins">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Serial No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Date Of Request
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Quantity (KG)
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Date of Dispatch
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Doc 1
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Doc 2
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Vehicle Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Driver Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {product.map((data, index) => (
              <tr
                key={data.id}
                className=" hover:bg-gray-100 transition duration-200 font-poppins"
              >
                <td className="px-6 py-3 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{data.dor}</td>
                <td className="px-6 py-3 text-sm text-gray-700">
                  {data.product}
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">
                  {data.quantity}
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">{data.dod}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{data.city}</td>
                <td className="px-6 py-3 text-sm text-gray-700">
                  {data.file1 ? (
                    "File Uploaded"
                  ) : (
                    <div className="relative">
                      <input
                        type="file"
                        className="block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) =>
                          uploadFile({
                            file: e.target.files[0],
                            namef: "file1",
                            docid: data.id,
                          })
                        }
                      />
                      {/* <span className="absolute top-2 right-2 text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 13l4 4m0 0l4-4m-4 4l-4-4m4 4h-8m0 0l-4-4m4 4l4-4"
                          />
                        </svg>
                      </span> */}
                    </div>
                  )}
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">
                  {data.file2 ? (
                    "File Uploaded"
                  ) : (
                    <div className="relative">
                      <input
                        type="file"
                        className="block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) =>
                          uploadFile({
                            file: e.target.files[0],
                            namef: "file2",
                            docid: data.id,
                          })
                        }
                      />
                      {/* <span className="absolute top-2 right-2 text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 13l4 4m0 0l4-4m-4 4l-4-4m4 4h-8m0 0l-4-4m4 4l4-4"
                          />
                        </svg>
                      </span> */}
                    </div>
                  )}
                </td>
                <td className="px-6 py-3 text-sm text-center text-gray-700">
                  {data.vehicle ?? "-"}
                </td>
                <td className="px-6 py-3 text-sm text-center text-gray-700">
                  {data.drivernumber ?? "-"}
                </td>
                <td
                  className="px-6 py-3 text-sm text-red-600 cursor-pointer hover:text-red-700"
                  onClick={() => {
                    setDeleteItem(data.id);
                    setDeleteModal(true);
                  }}
                >
                  <AiFillDelete className="w-5 h-5" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Toaster />
    </div>
  );
}

export default Upcoming;
