import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Sidebar from "./Sidebar";
import Loading from "./Loading";

const SidebarLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // User is logged in
      } else {
        setIsAuthenticated(false); // User is logged out
      }
      setLoading(false); // Once the state is determined, stop loading
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  console.log("Auth state ---->>", isAuthenticated);

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default SidebarLayout;
