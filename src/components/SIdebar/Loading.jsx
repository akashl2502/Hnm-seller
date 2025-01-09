import React from "react";
import "./Loading.css";
const Loading = () => {
  return (
    <div className="loader flex justify-center items-center h-screen">
      <div data-glitch="Loading..." className="glitch">
        Loading...
      </div>
    </div>
  );
};

export default Loading;
