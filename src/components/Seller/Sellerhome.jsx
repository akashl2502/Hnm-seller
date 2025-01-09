import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { addDoc } from "firebase/firestore";
import "./seller.css";
import { Globaltoast, LS } from "../../constants/Reusedfunctopn";
import { Orderdetails } from "../../Serverquery/Firebaseref";
import moment from "moment";

function Sellerhome() {
  const today = moment().format("YYYY-MM-DD");
  const toastid = Globaltoast;

  const initialState = {
    cusid: LS.get("data")?.cusid,
    dor: today,
    product: "",
    quantity: "",
    dod: "",
    pincode: "",
    city: "Abu Road",
    region: "",
    status: 0,
    uid: LS.get("uid"),
    read: 0,
    buyeruid: "",
    GST: "",
    Bnumber: "",
    Snumber: LS.get("data").mob,
  };
  const [OD, setOD] = useState(initialState);
  console.log(OD);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { city, dod, dor, product, quantity, region, Bnumber, GST } = OD;

    if (city && dod && dor && product && quantity) {
      toastid.loading("Updating Request Please Wait...", { id: toastid });
      try {
        await addDoc(Orderdetails, OD);
        toastid.success("New Request Has Been Requested", { id: toastid });
        setOD(initialState);
      } catch (error) {
        console.error("Error submitting the request:", error);
        toastid.error("Error occurred while submitting the request.", {
          id: toastid,
        });
      }
    } else {
      const errors = [];
      if (!city) errors.push("City");
      if (!dod) errors.push("Date of Dispatch");
      if (!product) errors.push("Product");
      if (!quantity) errors.push("Quantity");

      toastid.error(`Please check: ${errors.join(", ")}`);
    }
  };

  const cityList = [
    "Jodhpur",
    "Sumerpur",
    "Barmer",
    "Balothra",
    "Deesa",
    "Abu Road",
    "Hyderabad",
    "Belgavi",
    "Vijayapura",
    "Amritsar",
    "Bellary",
    "Shri Ganganagar",
    "Hanumangarh",
    "Phagwara",
    "Jammu",
    "Mumbai",
    "Jaipur",
  ].sort();

  return (
    <div className="h-screen w-full home">
      <div className="h-full flex justify-center items-center ">
        <div className="bg-[#fafafa] shadow border home h-[480px] pb-12 w-[1000px] rounded-lg mt-5 md:mx-4 ">
          <div className="h-full flex justify-center items-center px-4">
            <form className="section group" onSubmit={handleSubmit}>
              <div className="col span_1_of_3">
                <label className="block text-black text-sm font-bold mb-1">
                  Product
                </label>
                <input
                  className="shadow appearance-none border outline-none rounded w-full py-1 px-1 text-black"
                  value={OD.product}
                  onChange={(e) =>
                    setOD({ ...OD, product: e.target.value.toUpperCase() })
                  }
                />
              </div>
              <div className="flex flex-col gap-2 col span_1_of_3">
                <label className="block text-black text-sm font-bold mb-1">
                  Quantity (IN KGS)
                </label>
                <input
                  type="number"
                  className="shadow appearance-none outline-none border rounded w-full py-1 px-1 text-black"
                  value={OD.quantity}
                  onChange={(e) => setOD({ ...OD, quantity: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2 col span_1_of_3">
                <label className="block text-black text-sm font-bold mb-1">
                  Date Of Dispatch
                </label>
                <input
                  type="date"
                  className="shadow appearance-none border outline-none rounded w-full py-1 px-1 text-black"
                  value={OD.dod}
                  onChange={(e) => setOD({ ...OD, dod: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2 col span_1_of_3">
                <label className="block text-black text-sm font-bold mb-1">
                  City
                </label>
                <select
                  className="shadow appearance-none outline-none border rounded w-full py-1 px-1 text-black"
                  value={OD.city}
                  onChange={(e) => setOD({ ...OD, city: e.target.value })}
                >
                  {cityList.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full flex justify-center items-center mt-4">
                <button
                  type="submit"
                  className="text-center w-[10%] text-white px-2 py-2 text-sm rounded-lg bg-[#1717ab]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </div>
  );
}

export default Sellerhome;
