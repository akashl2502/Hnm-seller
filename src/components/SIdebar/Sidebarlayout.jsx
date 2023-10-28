import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { LS } from "../../constants/Reusedfunctopn";

const SidebarLayout = () =>
  LS.get("LB") ? (
    <>
      <Sidebar />
      <Outlet />
    </>
  ) : (
    <Navigate to={"../signin"} replace={true} />
  );

export default SidebarLayout;
