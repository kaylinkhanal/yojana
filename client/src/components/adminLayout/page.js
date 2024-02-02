import React from "react";
import Sidebar from "../sidebar/page";

const page = ({ children }) => {
 
  return (
    <>
      <Sidebar />
      <div className="pl-48">
        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

export default page;
