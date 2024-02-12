import React from "react";
import AdminLayout from "@/components/adminLayout/page";

const page = ({params}) => {
  //http://localhost:8080/members/65c58964da50ff93d8edc06f
  return (
    <AdminLayout>
      <div></div>
      Hello I am members<p>{params.slug}</p>
    </AdminLayout>
  );
};

export default page;
