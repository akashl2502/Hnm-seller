import React from "react";
import "./Loading.css";
const Loading = () => {
  return (
    <div class="loader flex justify-center items-center h-screen">
      <div data-glitch="Loading..." class="glitch">
        Loading...
      </div>
    </div>
  );
};

export default Loading;
