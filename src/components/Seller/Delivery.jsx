import React, { useEffect, useState } from "react";
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
import { LS } from "../../constants/Reusedfunctopn";
import { Orderdetails } from "../../Serverquery/Firebaseref";
import { FiEdit } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
const Delivery = () => {
  var uid = LS.get("uid");
  
  var a =
    LS.get("data").type == 1
      ? query(Orderdetails, where("uid", "==", uid), where("status", "==", 2))
      : query(
          Orderdetails,
          where("GST", "==", LS.get("data").gst),
          where("status", "==", 2)
        );
  const {
    data: seller,
    isLoading: isloading,
    isError: error,
  } = useFirestoreQuery(["inprogress_seller"], a, { subscribe: true }, {});
  const [showModal, setShowModal] = useState(false);
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

  return (
    <div class="block w-[100%] overflow-hidden h-screen home pt-20">
      <div className="pt-10 flex justify-between">
        <p className="ml-10 text-xl font-sans max-xs:ml-5">Delivery Records</p>
      </div>
      <div className="table-container px-10 w-[97%] h-full mt-10 max-xs:px-4 max-ss:px-6 max-sm:px-8">
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
                City,Pincode
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Vehicle Number
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Driver Number
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Status
              </th>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Track
              </th>

              {/* <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Action
            </th> */}
            </tr>
          </thead>

          <tbody>
            {product.map((data, index) => {
              return (
                <tr key={index}>
                  <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {index + 1}
                  </td>
                  <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {data.dor}
                  </td>
                  <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {data.product}
                  </td>
                  <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {data.quantity}
                  </td>
                  <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {data.dod}
                  </td>
                  <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {`${data.city},${data.pincode}`}
                  </td>
                  <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {data.VN ? data.VN : "Not Available"}
                  </td>
                  <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {data.DN ? data.DN : "Not Available"}
                  </td>
                  <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {data.Vstatus ? "Delivered" : "Not Delivered"}
                  </td>
                  <td class="border-t-0 px-6 bg-gray-300 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {data.track ? (
                      <a
                        className="px-4 py-1 bg-blue-600 text-white rounded"
                        target="_blank"
                        href={
                          data.track.startsWith("http://") ||
                          data.track.startsWith("https://")
                            ? data.track
                            : `http://${data.track}`
                        }
                      >
                        Track
                      </a>
                    ) : (
                      <a className="px-4 py-1 bg-red-600 text-white rounded">
                        Tracking Not Available
                      </a>
                    )}
                  </td>
                  {/* <td>
                  <div className="flex justify-center items-center mr-10">
                    <FiEdit
                      onClick={async (e) => {
                        const docRef = doc(Db, "orderdetails", data.id);
                        await updateDoc(docRef, { status: 2 });
                      }}
                      color="blue"
                      title="Edit"
                    />
                  </div>
                </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default Delivery;
