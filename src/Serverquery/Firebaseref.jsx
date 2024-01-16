import { collection } from "firebase/firestore";
import { Db } from "../Firebase/Firebase-Config";
export const adminref = collection(Db, "admin");
export const Masteruserdetails = collection(Db, "Userdetails");
export const Orderdetails = collection(Db, "orderdetails");
export const Transportref = collection(Db, "Transport");

export const sellerref = collection(Db, "user");
