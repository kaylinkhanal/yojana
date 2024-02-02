import React from "react";
import AdminLayout from "@/components/adminLayout/page";

const page = ({params}) => {
  return (
    <AdminLayout>
      <div></div>
      Hello I am task  <p>{params.slug}</p>
    </AdminLayout>
  );
};

export default page;
