import React, { useState, useEffect, useCallback } from "react";
import { loadFull } from "tsparticles";
import { useNavigate, createSearchParams } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import { UilEnvelopeOpen } from "@iconscout/react-unicons";
import { UilKeySkeleton } from "@iconscout/react-unicons";
import { UilUserMd } from "@iconscout/react-unicons";
import { UilBuilding } from "@iconscout/react-unicons";
import { UilMobileAndroid} from "@iconscout/react-unicons";
import "./Glassmorphism.css";
import Particles from "react-tsparticles";
import particlesconfig from "../../config.jsx";
import { Db } from "../../Firebase/Firebase-Config";
import { Authentication } from "../../Firebase/Firebase-Config";
import toast, { Toaster } from "react-hot-toast";
import { FirebaseError } from "@firebase/util";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  updatePhoneNumber,
} from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import "../SIdebar/Loading.css";
import {
  adminref,
  Masteruserdetails,
  sellerref,
} from "../../Serverquery/Firebaseref";
import { Globaltoast, LS } from "../../constants/Reusedfunctopn";
import * as BootstrapIcons from "react-icons/bs";
const Glassmorphismbox = () => {
  const [change, setChange] = useState(false);
  const [forget, setForget] = useState(false);
  const [OTP, setOTP] = useState("");
  const [Loading, Setloading] = useState(false);
  const [Email, Setemail] = useState("");
  const [Pass, Setpass] = useState("");
  const [Otpbool2, Setotpbool2] = useState(false);
  const navigate = useNavigate();
  const countryCode = "+91";
  const [expandForm, setExpandForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [Admindata, Setadmindata] = useState([]);
  const [Userdata, Setuserdata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const toastId = Globaltoast;
  const {
    data: seller,
    isLoading: uload,
    isError: uerror,
  } = useFirestoreQuery(
    ["seller"],
    sellerref,
    { subscribe: true },
    {
      onSuccess: (snapshot) => {
        var a = snapshot.docs.map((docSnapshot) => {
          const data = { ...docSnapshot.data(), id: docSnapshot.id };
          return data;
        });
        Setuserdata(a);
      },
    }
  );
  useEffect(() => {
    toastId.dismiss();
  }, []);
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
        "expired-callback": () => {},
      },

      Authentication
    );
  };

  const verifyOTP = (e) => {
    if (e.length == 6) {
      toastId.loading("Verifying Otp Please Wait .....", {
        id: toastId,
      });
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(e)
        .then((result) => {
          //setload(false);
          const user = result.user.uid;
          toast.success("Successfully Login", { id: toastId });
          LS.save("uid", user);
          LS.save("LB", true);
          LS.save("US", "seller");
          navigate({
            pathname: "../newuser",
            search: createSearchParams({
              uid: user,
            }).toString(),
          });
        })
        .catch((error) => {
          console.log(error);
          if (error instanceof FirebaseError) {
            toastId.error(error.code, { id: toastId });
          }
        });
    } else {
    }
  };
  const requestOTP = async (e) => {
    e.preventDefault();
    var check = Userdata.find((data) => `+91${data.number}` == phoneNumber);
    if (phoneNumber.length >= 12) {
      if (check) {
        try {
          setChange(true);
          setExpandForm(true);
          generateRecaptcha();
          toastId.success(`Otp Has Been Sent to ${phoneNumber}`, {
            id: toastId,
          });
          let appVerifier = window.recaptchaVerifier;

          signInWithPhoneNumber(Authentication, phoneNumber, appVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
            })
            .catch((error) => {
              if (error instanceof FirebaseError) {
                toastId.error(error.code, { id: toastId });
              }
              console.log(error);
            });
        } catch (e) {
          console.log(e);
        }
      } else {
        toastId.error("Access Denied", { id: toastId });
      }
    } else {
      toastId.error("Enter Valid Mobile Number", { id: toastId });
    }
  };

  const Onclick = (e) => {
    e.preventDefault();
    requestOTP(e);
  };

  if (uload || Loading) {
    return (
      <div class="loader flex justify-center items-center h-screen">
        <div data-glitch="Loading..." class="glitch">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div class="flex justify-center items-center">
      <div class="row full-height justify-content-center">
        <div class="col-12 text-center align-self-center py-5">
          <div class="section pb-5  pt-sm-2 text-center">
            <h6 class="mb-0 pb-3 text-white max-sm:mt-[2rem] ">
              <span className="text-xl font-bold tracking-widest ">Seller</span>
            </h6>

            <label for="reg-log"></label>
            <div class="card-3d-wrap mx-auto">
              <div class="card-3d-wrapper">
                <div class="card-front">
                  <div class="center-wrap">
                    <div class="section text-center">
                      <form onSubmit={requestOTP}>
                        <h4 class="mb-10 pb-3 text-white">
                          Enter Your Phone Number
                        </h4>
                        <div class="form-group">
                          <input
                            name="logname"
                            class="form-style mb-2"
                            placeholder="Id"
                            value={phoneNumber}
                            onChange={(e) => {
                              setPhoneNumber(e.target.value);
                            }}
                          />
                          <UilUserMd
                            size="25"
                            class="input-icon"
                            color="#ffeba7"
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="password"
                            class="form-style mb-2"
                            placeholder="password"
                            value={phoneNumber}
                            onChange={(e) => {
                              setPhoneNumber(e.target.value);
                            }}
                          />
                          <UilUserMd
                            size="25"
                            class="input-icon"
                            color="#ffeba7"
                          />
                        </div>
                        {change ? (
                          <div>
                            <div class="form-group">
                              <input
                                type="text"
                                name="logname"
                                class="form-style mt-2"
                                placeholder="Enter OTP"
                                id="logname"
                                autocomplete="off"
                                value={OTP}
                                onChange={(e) => {
                                  setOTP(e.target.value);
                                }}
                              />
                              <UilMobileAndroid
                                size="25"
                                class="input-icon mt-2"
                                color="#ffeba7"
                              />
                            </div>

                            <a
                              href="#"
                              class="btn mt-7"
                              onClick={(e) => {
                                e.preventDefault();
                                verifyOTP(OTP);
                              }}
                            >
                              Verify Otp
                            </a>
                          </div>
                        ) : (
                          <></>
                        )}

                        <a
                          href="#"
                          type="submit"
                          class={`${change ? "hidden" : "btn mt-7 "}`}
                          onClick={(e) => Onclick(e)}
                        >
                          Request Otp
                        </a>
                      </form>
                    </div>
                  </div>

                  <div class="card-back"></div>
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
};

export default Glassmorphismbox;
