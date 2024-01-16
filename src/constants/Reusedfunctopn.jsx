import localstorageEncrypt from "localstorage-encrypt";
import toast, { Toaster } from "react-hot-toast";
export const Globaltoast = toast;
export const LS = localstorageEncrypt.init("Groups_Seller", "groups");
export const websitelink = "http://127.0.0.1:5173";
