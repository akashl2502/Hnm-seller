import React, { useEffect } from "react";
import bg from "../../assets/bbblurry.svg";
import "./seller.css";
import bcrypt from "bcryptjs";
import { UilEye, UilEyeSlash } from "@iconscout/react-unicons"; // Add eye icon for visibility toggle

import {
  useNavigate,
  createSearchParams,
  useSearchParams,
  useNavigation,
} from "react-router-dom";
import { useState } from "react";
import { Masteruserdetails } from "../../Serverquery/Firebaseref";
import { async } from "@firebase/util";
import { Globaltoast, LS } from "../../constants/Reusedfunctopn";
import toast, { Toaster } from "react-hot-toast";
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  deleteDoc,
  collection,
  where,
} from "firebase/firestore";
import { RiLockPasswordFill } from "react-icons/ri";

import { Db } from "../../Firebase/Firebase-Config";
function Newuser() {
  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const notesSnapshot = await getDocs(a);
    const notesList = notesSnapshot.docs.map((doc) => doc.data());
    if (notesList.length != 0) {
      LS.save("data", notesList[0]);
      if (notesList[0].type == 2) {
        navigate("../delivery");
      } else if (notesList[0].type == 1) {
        navigate("../sellerhome");
      } else if (notesList[0].type == 3) {
        navigate("../Transport");
      }
    }
    Setloading(false);
  };
  const [SP] = useSearchParams();
  const uid = SP.get("uid") ?? LS.get("uid");
  const type = SP.get("US") ?? LS.get("US");
  const cusid = SP.get("cusid") ?? LS.get("cusid");

  var a = query(Masteruserdetails, where("uid", "==", uid));

  const [Loading, Setloading] = useState(true);
  const [showmodel, setShowModal] = useState(true);
  const [Password, Setpassword] = useState("");
  const [confirmPassword, setconfirmpassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // For Password field
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // For Confirm Password field

  const [Newdata, Setnewdata] = useState({
    name: "",
    company: "",
    email: "",
    mob: null,
    gst: "",
    type: type,
    uid: uid,
    cusid: cusid,
  });
  const navigate = useNavigate();
  const Toastid = Globaltoast;
  const Setdata = async (e) => {
    if (
      Newdata.name.length != 0 &&
      Newdata.company.length != 0 &&
      Newdata.email.length != 0 &&
      Newdata.mob.toString().length == 10
    ) {
      if (type == 3) {
        e.preventDefault();

        await addDoc(Masteruserdetails, Newdata).then(() => {
          LS.save("data", Newdata);

          navigate("../sellerhome");
        });
      } else {
        if (Newdata.gst.length != 15) {
          Toastid.error("Please Enter GST", { id: Toastid });
        } else {
          await addDoc(Masteruserdetails, Newdata).then(() => {
            LS.save("data", Newdata);

            navigate("../sellerhome");
          });
        }
      }
    } else {
      if (Newdata.name.length == 0) {
        Toastid.error("Please Enter Name", { id: Toastid });
      } else if (Newdata.company.length == 0) {
        Toastid.error("Please Enter Company", { id: Toastid });
      } else if (Newdata.email.length == 0) {
        Toastid.error("Please Enter Email Id", { id: Toastid });
      } else if (Newdata.gst.length != 15) {
        Toastid.error("Please Enter GST", { id: Toastid });
      } else if (Newdata.mob.toString().length != 10) {
        Toastid.error("Please Enter Valid Mobile Number", { id: Toastid });
      }
    }
  };
  const encrypt_password = async (password) => {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash.toString();
    } catch (error) {
      console.error("Error while hashing the password:", error);
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };
  const updateUserPassword = async (uid, newPassword) => {
    Toastid.loading("Password is being updated please wait.....", {
      id: Toastid,
    });
    try {
      const userQuery = query(collection(Db, "user"), where("uid", "==", uid));
      const querySnapshot = await getDocs(userQuery);
      if (querySnapshot.empty) {
        toast.error("User not found", { id: Toastid });
        Setloading(false);

        return;
      }
      const userDoc = querySnapshot.docs[0];

      const docRef = doc(Db, "user", userDoc.id);
      await updateDoc(docRef, { password: newPassword })
        .then(() => {
          Toastid.success("Password has been successfully updated", {
            id: Toastid,
          });

          setShowModal(false);
        })
        .catch((err) => {
          Toastid.error("Something error occured please try again later", {
            id: Toastid,
          });
          location.reload();
        });
    } catch (error) {
      Toastid.error("Something error occured please try again later", {
        id: Toastid,
      });
      location.reload();
      console.error("Error updating password:", error);
    }
  };
  return (
    <div className="user">
      {!Loading ? (
        <div className="container">
          {showmodel ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-[400px] my-6 mx-auto max-w-3xl">
                  {/* Modal content */}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-br from-[#ff966d] via-[#fa538d] to-[#89379c] outline-none focus:outline-none">
                    {/* Header */}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                      <h3 className="text-2xl font-semibold text-white">
                        Change Password
                      </h3>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col gap-6 p-6 bg-white rounded-b-lg">
                      {/* Password Field */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="password"
                          className="text-gray-700 font-medium"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <input
                            id="password"
                            className="w-full px-4 py-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#fa538d] focus:border-[#fa538d]"
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Enter new password"
                            onChange={(e) => {
                              Setpassword(e.target.value);
                            }}
                          />
                          {/* Eye Icon */}
                          <div
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer hover:text-gray-700"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                          >
                            {passwordVisible ? (
                              <UilEyeSlash size="20" />
                            ) : (
                              <UilEye size="20" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Confirm Password Field */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="confirm-password"
                          className="text-gray-700 font-medium"
                        >
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            id="confirm-password"
                            className="w-full px-4 py-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#fa538d] focus:border-[#fa538d]"
                            type={confirmPasswordVisible ? "text" : "password"}
                            placeholder="Confirm password"
                            onChange={(e) => {
                              setconfirmpassword(e.target.value);
                            }}
                          />
                          {/* Eye Icon */}
                          <div
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer hover:text-gray-700"
                            onClick={() =>
                              setConfirmPasswordVisible(!confirmPasswordVisible)
                            }
                          >
                            {confirmPasswordVisible ? (
                              <UilEyeSlash size="20" />
                            ) : (
                              <UilEye size="20" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-4 p-4 border-t border-solid border-gray-300">
                      <button
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 text-sm font-medium text-white bg-[#fa538d] rounded-md shadow-sm hover:bg-[#89379c] focus:outline-none focus:ring-2 focus:ring-[#fa538d] focus:ring-offset-2"
                        onClick={async () => {
                          if (Password === confirmPassword) {
                            if (!validatePassword(Password)) {
                              Toastid.error(
                                "Password must be at least 8 characters long and contain at least one capital letter and one number.",
                                { id: Toastid }
                              );
                            } else {
                              var enpassword = await encrypt_password(Password);
                              console.log(enpassword);
                              await updateUserPassword(uid, enpassword);
                            }
                          } else {
                            Toastid.error("Passwords do not match.");
                          }
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
          <div className="design">
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
                        Setnewdata({
                          ...Newdata,
                          mob: parseInt(e.target.value),
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              {type != 3 ? (
                <div className="w-full flex gap-10 mt-5">
                  <div className="w-full">
                    <label>GST Number</label>
                    <div className="text-input">
                      <i className="ri-user-fill"></i>
                      <input
                        maxLength={15}
                        type="text"
                        placeholder="GST Number"
                        onChange={(e) => {
                          Setnewdata({ ...Newdata, gst: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* <div className="w-half mt-5 px-10 mr-10 ml-[-2rem]">
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
          </div> */}

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
      ) : (
        <>
          <div className="loader flex justify-center items-center h-screen">
            <div data-glitch="Loading..." className="glitch">
              Loading...
            </div>
          </div>
        </>
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default Newuser;
