import { collection } from "firebase/firestore";
import { Db } from "../Firebase/Firebase-Config";
export const adminref = collection(Db, "admin");
export const sellerref = collection(Db, "seller");
