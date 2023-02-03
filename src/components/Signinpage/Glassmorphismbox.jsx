import React, { useState, useEffect, useCallback } from "react";
import { loadFull } from "tsparticles";
import { useNavigate, createSearchParams } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import { UilEnvelopeOpen } from "@iconscout/react-unicons";
import { UilKeySkeleton } from "@iconscout/react-unicons";
import { UilUserMd } from "@iconscout/react-unicons";
import { UilBuilding } from "@iconscout/react-unicons";
import { UilMobileAndroid } from "@iconscout/react-unicons";
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
import {
  adminref,
  Masteruserdetails,
  sellerref,
} from "../../Serverquery/Firebaseref";
import { Globaltoast, LS } from "../../constants/Reusedfunctopn";
const Glassmorphismbox = () => {
  const [change, setChange] = useState(false);
  const [OTP, setOTP] = useState("");

  //   const particlesInit = useCallback(async engine => {
  //     console.log(engine);
  //     // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
  //     // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  //     // starting from v2 you can add only the features you need reducing the bundle size
  //     await loadFull(engine);
  // }, []);

  // const particlesLoaded = useCallback(async container => {
  //   console.log(container);
  // }, []);
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
  const toastId = Globaltoast;
  const {
    data: admin,
    isLoading,
    isError,
  } = useFirestoreQuery(
    ["admin"],
    adminref,
    { subscribe: true },
    {
      onSuccess: (snapshot) => {
        var a = snapshot.docs.map((docSnapshot) => {
          const data = { ...docSnapshot.data(), id: docSnapshot.id };
          return data;
        });
        Setadmindata(a);
      },
    }
  );
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  const verifyOTP = (e) => {
    // let otp = e.target.value;
    // setOTP(otp);
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

          LS.save("uid", user);
          LS.save("LB", true);
          LS.save("US", "seller");
          var userdata = {};
          // var a = Masteruserdetails.docs.map((docSnapshot) => {
          //   const data = { ...docSnapshot.data(), id: docSnapshot.id };
          //   return data;
          // });
          //navigate("/newuser");
          // navigate({
          //   pathname: "/newuser",
          //   search: createSearchParams({ uid: user }).toString,
          // });
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
          //setload(false);
          // Toastdata({ data: "Error While Sending Otp" });
        });
    } else {
    }
  };
  const requestOTP = (e) => {
    var check = Userdata.find((data) => `+91${data.number}` == phoneNumber);
    console.log(check);
    if (phoneNumber.length >= 12) {
      if (check) {
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
            toastId.error("Invalid Otp Pin", {
              id: toastId,
            });
            console.log(error);
          });
      } else {
        toastId.error("Access Denied", { id: toastId });
      }
    } else {
      toastId.error("Enter Valid Mobile Number", { id: toastId });
    }
  };

  const Onclick = (e) => {
    e.preventDefault();
    requestOTP();
  };

  const Masterlogin = () => {
    var check = Admindata.find((data) => data.email == Email);
    if (Email.length != 0 && Pass.length != 0) {
      if (check) {
        if (check.status == true) {
          toastId.loading("Loading...", { id: toastId });
          signInWithEmailAndPassword(Authentication, Email, Pass)
            .then(async (res) => {
              toastId.success("Login Successfull", { id: toastId });

              var user = res.user.uid;
              LS.save("uid", user);
              LS.save("LB", true);
              LS.save("US", "Admin");
              navigate("/admin");
            })
            .catch((error) => {
              // Give your error the firebase.FirebaseError type and
              // you'll have access to all the FirebaseError properties
              if (error instanceof FirebaseError) {
                toastId.error(error.code, { id: toastId });
              }
            });
        } else {
          toastId.error("Access Have Been Revoked By admin", { id: toastId });
        }
      } else {
        toast.error("Access Not provided To User", {
          id: toastId,
        });
      }
    } else {
      toastId.error("Please Enter Email And Password", { id: toastId });
    }
  };

  if (isLoading || uload || Loading) {
    return <p className="mx-auto text-lg">Loading</p>;
  }

  return (
    // <div className=" h-screen w-screen relative overflow-hidden flex justify-center items-center">
    //   <div className="h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse"></div>
    //   <div className="h-35-r w-35-r bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse"></div>
    //   <Tilt>
    //     <div class="w-96 shadow-2xl shadow-slate-900 mx-auto text-white bg-clip-padding backdrop-filter bg-white bg-opacity-10 backdrop-blur-md mt-20 py-10 px-8 rounded-md relative bottom-7">
    //       <div class="text-center text-2xl">Login</div>
    //       <form class="mt-6">
    //         <div class="mb-4">
    //           <label for="email">Email</label>
    //           <input
    //             id="email"
    //             type="email"
    //             class="bg-white  bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full"
    //           />
    //         </div>
    //         <div class="mb-4">
    //           <label for="password">Password</label>
    //           <input
    //             id="password"
    //             type="password"
    //             class="bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full"
    //           />
    //         </div>
    //         <button class="mt-1 text-primary bg-blue-gradient  bg-opacity-30 hover:bg-opacity-40 transition duration-500 rounded-md shadow-md shadow-slate-600/70 p-3 w-full font-semibold">
    //           Login
    //         </button>
    //         <div class="text-center my-4">or</div>
    //         <div class="flex place-content-evenly">
    //           <button
    //             onClick={() => {
    //               navigate(`/signup`);
    //             }}
    //             class="mt-1 text-primary bg-blue-gradient bg-opacity-30 hover:bg-opacity-40 transition duration-500 rounded-md shadow-md shadow-slate-600/70 p-3 w-full font-semibold"
    //           >
    //             Sign Up
    //           </button>
    //         </div>
    //       </form>
    //       <div class="text-center pt-4 text-sm">Forgot a password?</div>
    //     </div>
    //   </Tilt>
    // </div>

    <div class="flex justify-center items-center">
      <div class="row full-height justify-content-center">
        <div class="col-12 text-center align-self-center py-5">
          <div class="section pb-5 pt-6 pt-sm-2 text-center">
            <h6 class="mb-0 pb-3 text-white">
              <span>Admin </span>
              <span>Seller</span>
            </h6>
            <input
              class="checkbox"
              type="checkbox"
              id="reg-log"
              name="reg-log"
            />
            <label for="reg-log"></label>
            <div class="card-3d-wrap mx-auto">
              <div class="card-3d-wrapper">
                <div class="card-front">
                  <div class="center-wrap">
                    <div class="section text-center">
                      <h4 class="mb-4 pb-3 text-lg text-white font-poppins tracking-wider">
                        Login
                      </h4>
                      <div class="form-group">
                        <input
                          type="email"
                          name="logemail"
                          class="form-style"
                          placeholder="Your Email"
                          id="logemail"
                          autocomplete="off"
                          disabled={Otpbool2}
                          onChange={(e) => {
                            Setemail(e.target.value);
                          }}
                        />

                        <UilEnvelopeOpen
                          size="25"
                          class="input-icon"
                          color="#ffeba7"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          name="logpass"
                          class="form-style mt-[30px]"
                          placeholder="Your Password"
                          id="logpass"
                          autocomplete="off"
                          disabled={Otpbool2}
                          onChange={(e) => {
                            Setpass(e.target.value);
                          }}
                        />
                        <UilKeySkeleton
                          size="25"
                          class="input-icon mt-[30px]"
                          color="#ffeba7"
                        />
                      </div>

                      {Otpbool2 ? (
                        <div class="form-group">
                          <input
                            type="number"
                            name="logpass"
                            class="form-style mt-[30px]"
                            placeholder="OTP"
                            id="logpass"
                            autocomplete="off"
                          />
                          <UilMobileAndroid
                            size="25"
                            class="input-icon mt-[30px]"
                            color="#ffeba7"
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <a
                        href="#"
                        class="btn mt-5"
                        onClick={() => {
                          Masterlogin();
                        }}
                      >
                        submit
                      </a>

                      <p class="mb-0 mt-4 text-center">
                        <a href="#0" class="link">
                          Forgot your password?
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="card-back">
                  <div class="center-wrap">
                    <div class="section text-center">
                      <form onSubmit={requestOTP}>
                        <h4 class="mb-10 pb-3 text-white">
                          Enter Your Phone Number
                        </h4>
                        <div class="form-group">
                          <input
                            type="tel"
                            name="logname"
                            class="form-style mb-2"
                            placeholder="Mobile Number"
                            id="logname"
                            autocomplete="off"
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
                          onClick={() => Onclick()}
                        >
                          Request Otp
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Toaster position="bottom-center" reverseOrder={false} />
        </div>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Glassmorphismbox;
