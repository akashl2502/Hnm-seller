import React, { useEffect } from "react";
import bg from "../../assets/bbblurry.svg";
import "./seller.css";
import bcrypt from "bcryptjs";

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

import { data } from "autoprefixer";
import { Db } from "../../Firebase/Firebase-Config";
function Newuser() {
  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const notesSnapshot = await getDocs(a);
    const notesList = notesSnapshot.docs.map((doc) => doc.data());
    console.log(notesList);
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
          console.log("adding data");

          navigate("../sellerhome");
        });
      } else {
        if (Newdata.gst.length != 15) {
          Toastid.error("Please Enter GST", { id: Toastid });
        } else {
          console.log("adding data");
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
              <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-[400px] my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Change password
                      </h3>
                      {/* <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button> */}
                    </div>
                    {/*body*/}
                    <div className="flex w-full  flex-col gap-10 p-8 justify-center items-start">
                      <div className=" flex w-full flex-col gap-2">
                        <div className="text-left flex gap-2 justify-start items-center">
                          <label htmlFor="">Password</label>
                          <RiLockPasswordFill />
                        </div>
                        <div className="w-full">
                          <input
                            className="bg-gray-100 w-full border border-black rounded-md h-[2.3rem]"
                            type="password"
                            onChange={(e) => {
                              Setpassword(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className=" flex w-full flex-col gap-2">
                        <div className="text-left flex gap-2 justify-start items-center">
                          <label htmlFor="">Confirm Password</label>
                          <RiLockPasswordFill />
                        </div>
                        <div className="w-full">
                          <input
                            className="bg-gray-100 w-full border border-black rounded-md h-[2.3rem]"
                            type="password"
                            onChange={(e) => {
                              setconfirmpassword(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                      {/* <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                    }}
                  >
                    Close
                  </button> */}
                      <button
                        className="text-emerald-500  active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded  hover: outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
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
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
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
          <div class="loader flex justify-center items-center h-screen">
            <div data-glitch="Loading..." class="glitch">
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
