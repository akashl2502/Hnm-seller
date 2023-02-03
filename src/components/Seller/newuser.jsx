import React from "react";
import bg from "../../assets/bbblurry.svg";
import "./seller.css";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { useState } from "react";
import { Masteruserdetails } from "../../Serverquery/Firebaseref";
import { addDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { Globaltoast, LS } from "../../constants/Reusedfunctopn";
import toast, { Toaster } from "react-hot-toast";

const Newuser = () => {
  const [SP] = useSearchParams();
  const uid = SP.get("uid");
  const [Newdata, Setnewdata] = useState({
    name: "",
    company: "",
    email: "",
    mob: "",
    gst: "",
    uid: uid,
  });
  const navigate = useNavigate();
  const Toastid = Globaltoast;
  const Setdata = async (e) => {
    if (
      Newdata.name.length != 0 &&
      Newdata.company.length != 0 &&
      Newdata.email.length != 0 &&
      Newdata.gst.length != 0 &&
      Newdata.mob.length ==10
    ) {
      e.preventDefault();
     
      await addDoc(Masteruserdetails, Newdata).then(() => {
        LS.save("name", Newdata.name);
        navigate("../sellerhome");
      });
    } else {
      if (Newdata.name.length == 0) {
        Toastid.error("Please Enter Name", { id: Toastid });
      } else if (Newdata.company.length == 0) {
        Toastid.error("Please Enter Company", { id: Toastid });
      } else if (Newdata.email.length == 0) {
        Toastid.error("Please Enter Email Id", { id: Toastid });
      } else if (Newdata.gst.length == 0) {
        Toastid.error("Please Enter GST", { id: Toastid });
      } else if (Newdata.mob.length != 10) {
        Toastid.error("Please Enter Valid Mobile Number", { id: Toastid });
      }
    }
  };
  return (
    <div className="user">
      <div className="container">
        <div class="design">
          <div className="pill-1 rotate-45"></div>
          <div className="pill-2 rotate-45"></div>
          <div className="pill-3 rotate-45"></div>
          <div className="pill-4 rotate-45"></div>
        </div>
        <div className="login">
          <h3 className="title">Update Your Account</h3>
          <div className="media">
            <div className="w-full flex gap-10 mt-10">
              <div className="w-full">
                <label>Name</label>
                <div className="text-input">
                  <i className="ri-user-fill"></i>
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => {
                      Setnewdata({ ...Newdata, name: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="w-full">
                <label>Company Name</label>
                <div className="text-input">
                  <i className="ri-user-fill"></i>
                  <input
                    type="text"
                    placeholder="Company Name"
                    onChange={(e) => {
                      Setnewdata({ ...Newdata, company: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex gap-10 mt-5">
              <div className="w-full">
                <label>Email Id</label>
                <div className="text-input">
                  <i className="ri-user-fill"></i>
                  <input
                    type="text"
                    placeholder="Email Id"
                    onChange={(e) => {
                      Setnewdata({ ...Newdata, email: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="w-full">
                <label>Mobile No</label>
                <div className="text-input">
                  <i className="ri-user-fill"></i>
                  <input
                    type="text"
                    placeholder="Mobile No"
                    onChange={(e) => {
                      Setnewdata({ ...Newdata, mob: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-half mt-5 px-10 mr-10 ml-[-2rem]">
            <label>GST No</label>
            <div clasNames="text-input">
              <i className="ri-user-fill"></i>
              <input
                type="text"
                placeholder="GST"
                onChange={(e) => {
                  Setnewdata({ ...Newdata, gst: e.target.value });
                }}
              />
            </div>
          </div>

          <button
            className="login-btn"
            onClick={(e) => {
              Setdata(e);
            }}
          >
            Update
          </button>
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default Newuser;
