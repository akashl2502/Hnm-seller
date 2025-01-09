import React, { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { UilUserMd } from "@iconscout/react-unicons";
import { UilEye, UilEyeSlash } from "@iconscout/react-unicons"; // Add eye icon for visibility toggle
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { signInWithCustomToken } from "firebase/auth";
import { Authentication } from "../../Firebase/Firebase-Config";
import { LS } from "../../constants/Reusedfunctopn";

function Glassmorphismbox() {
  const [userdata, Setuserdata] = useState({ cusid: null, password: null });
  const [Loading, Setloading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging in...");

    try {
      Setloading(true);

      const response = await axios.post(
        `https://hopandmoveserver-production.up.railway.app/api/signin`,
        {
          cusid: userdata.cusid,
          password: userdata.password,
        }
      );

      const { customToken, uid, type, cusid } = response.data;
      console.log(uid);

      signInWithCustomToken(Authentication, customToken)
        .then((userCredential) => {
          const user = userCredential.user;
          LS.save("customToken", customToken);
          LS.save("uid", uid);
          LS.save("LB", true);
          LS.save("US", type);
          LS.save("cusid", cusid);

          Setloading(false);

          toast.success("Login successful", { id: toastId });

          navigate({
            pathname: "../newuser",
            search: createSearchParams({
              uid: uid,
              type: type,
              cusid: cusid,
            }).toString(),
          });
        })
        .catch((error) => {
          Setloading(false);
          toast.error("Firebase authentication failed: " + error.message, {
            id: toastId,
          });
        });
    } catch (error) {
      console.log(error?.response?.data?.response);
      Setloading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message, { id: toastId });
      } else {
        toast.error("Something has happen. Please try again later", {
          id: toastId,
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle the visibility of the password
  };

  if (Loading) {
    return (
      <div className="loader flex justify-center items-center h-screen">
        <div data-glitch="Loading..." className="glitch">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="row full-height justify-content-center">
        <div className="col-12 text-center align-self-center py-5">
          <div className="section pb-5 pt-sm-2 text-center">
            <h6 className="mb-0 pb-3 text-white max-sm:mt-[2rem] ">
              <span className="text-xl font-bold tracking-widest ">Seller</span>
            </h6>

            <label htmlFor="reg-log"></label>
            <div className="card-3d-wrap mx-auto">
              <div className="card-3d-wrapper">
                <div className="card-front">
                  <div className="center-wrap">
                    <div className="section text-center">
                      <form>
                        <h4 className="mb-10 pb-3 text-white">
                          Customer Login
                        </h4>
                        <div className="form-group">
                          <input
                            name="customer_id"
                            className="form-style mb-2"
                            placeholder="Id"
                            onChange={(e) => {
                              Setuserdata({
                                ...userdata,
                                cusid: e.target.value,
                              });
                            }}
                          />
                          <UilUserMd
                            size="25"
                            className="input-icon"
                            color="#ffeba7"
                          />
                        </div>
                        <div className="form-group relative flex items-center">
                          <input
                            type={passwordVisible ? "text" : "password"} // Toggle input type
                            className="form-style mb-2 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Password"
                            onChange={(e) => {
                              Setuserdata({
                                ...userdata,
                                password: e.target.value,
                              });
                            }}
                          />
                          <UilUserMd
                            size="25"
                            className="absolute left-3 top-2/4 -translate-y-2/4 text-yellow-400"
                          />
                          <div
                            className="absolute right-3 top-2/4 -translate-y-2/4 cursor-pointer text-gray-500 hover:text-gray-700"
                            onClick={togglePasswordVisibility} // Toggle password visibility
                          >
                            {passwordVisible ? (
                              <UilEyeSlash size="20" />
                            ) : (
                              <UilEye size="20" />
                            )}
                          </div>
                        </div>

                        <div>
                          <a
                            href="#"
                            className="btn mt-7"
                            onClick={(e) => {
                              handleLogin(e);
                            }}
                          >
                            Login
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="card-back"></div>
                </div>
              </div>
            </div>
            <Toaster position="bottom-center" reverseOrder={false} />
          </div>
          <div id="recaptcha-container"></div>
        </div>
      </div>
    </div>
  );
}

export default Glassmorphismbox;
