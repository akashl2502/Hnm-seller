import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDBtDytKZEFVCQcgSa81XVk4FD2HWubcxk",
  authDomain: "groupslatest-6e969.firebaseapp.com",
  projectId: "groupslatest-6e969",
  storageBucket: "groupslatest-6e969.appspot.com",
  messagingSenderId: "758769434670",
  appId: "1:758769434670:web:fc8758c9a7b5562f779fbf",
};

const app = initializeApp(firebaseConfig);
export const Db = getFirestore(app);
export const Authentication = getAuth(app);
export const storage = getStorage(app);
