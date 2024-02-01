import React from "react";
import Sidebar from "../sidebar/page";

const page = ({ path, children }) => {
  return (
    <>
      <Sidebar path={path} />
      <div className="pl-48">
        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

export default page;
