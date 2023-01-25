import localstorageEncrypt from "localstorage-encrypt";
import toast, { Toaster } from "react-hot-toast";
export const Globaltoast = toast;
export const LS = localstorageEncrypt.init("Groups", "groups");
