import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

function Loader({ isLoading  }) {
  return isLoading ? (
    <div className="backdrop-opacity-10 fixed h-[100vh] w-[100vw] flex items-center justify-center ">
      <PacmanLoader color="#714b67" size={30} />
    </div>
  ) : null;
}

export default Loader;
