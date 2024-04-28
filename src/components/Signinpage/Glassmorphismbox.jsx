import React, { useState, useEffect, useCallback } from "react";
import { loadFull } from "tsparticles";
import bcrypt from "bcryptjs";

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
import "../SIdebar/Loading.css";
import {
  adminref,
  Masteruserdetails,
  sellerref,
} from "../../Serverquery/Firebaseref";
import { Globaltoast, LS } from "../../constants/Reusedfunctopn";
import * as BootstrapIcons from "react-icons/bs";
function Glassmorphismbox() {
  const toastId = Globaltoast;
  const [userdata, Setuserdata] = useState({ cusid: null, password: null });
  const [Loading, Setloading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      Setloading(true);
      console.log(userdata);
      const userQuery = query(
        collection(Db, "user"),
        where("cusid", "==", userdata.cusid)
      );
      const querySnapshot = await getDocs(userQuery);
      if (querySnapshot.empty) {
        toast.error("User not found", { id: toastId });
        Setloading(false);

        return;
      }
      const userDoc = querySnapshot.docs[0];
      const storedPassword = userDoc.data().password;
      const uid = userDoc.data().uid;
      const type = userDoc.data().type;
      const cusid = userDoc.data().cusid;

      const isMatch = await bcrypt.compare(userdata.password, storedPassword);
      if (!isMatch) {
        toast.error("Incorrect password", { id: toastId });
        Setloading(false);

        return;
      }
      if (isMatch) {
        LS.save("uid", uid);
        LS.save("LB", true);
        LS.save("US", type);
        LS.save("cusid", cusid);
        Setloading(false);
        navigate({
          pathname: "../newuser",
          search: createSearchParams({
            uid: uid,
            type: type,
            cusid: cusid,
          }).toString(),
        });
        toast.success("Login successful", { id: toastId });
        console.log(userDoc.data());
      }
    } catch (error) {
      console.error("Error during login:", error);
      Setloading(false);

      toast.error("An error occurred during login", { id: toastId });
    }
  };
  if (Loading) {
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
                      <form>
                        <h4 class="mb-10 pb-3 text-white">Customer Login</h4>
                        <div class="form-group">
                          <input
                            name="customer_id"
                            class="form-style mb-2"
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
                            class="input-icon"
                            color="#ffeba7"
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="password"
                            class="form-style mb-2"
                            placeholder="password"
                            onChange={(e) => {
                              Setuserdata({
                                ...userdata,
                                password: e.target.value,
                              });
                            }}
                          />
                          <UilUserMd
                            size="25"
                            class="input-icon"
                            color="#ffeba7"
                          />
                        </div>

                        <div>
                          <a
                            href="#"
                            class="btn mt-7"
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
}

export default Glassmorphismbox;
