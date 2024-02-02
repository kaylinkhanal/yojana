import React from "react";
import AdminLayout from "@/components/adminLayout/page";

const page = ({ params }) => {
  return (
    <>
      <AdminLayout path={params.slug}>
        <div>
          I am project settings
          <p>{params.slug}</p>
        </div>
      </AdminLayout>
    </>
  );
};

export default page;
