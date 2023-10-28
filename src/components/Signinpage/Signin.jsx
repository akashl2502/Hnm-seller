import React from "react";
import "./Glassmorphism.css";
import "./Glassmorphismbox";
import background from "../../assets/background.mp4";
import Glassmorphismbox from "./Glassmorphismbox";
import { LS } from "../../constants/Reusedfunctopn";
import { Navigate } from "react-router-dom";
const Signin = () => {
  return (
    <div className="Background">
      {LS.get("LB") ? <Navigate to={"../newuser"} replace={true} /> : <></>}
      <div className="overlay">
        {" "}
        <Glassmorphismbox />
      </div>
    </div>
  );
};

export default Signin;
