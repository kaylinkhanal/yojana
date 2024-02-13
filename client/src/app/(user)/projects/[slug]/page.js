'use client'
import React from "react";
import AdminLayout from "@/components/adminLayout/page";

const page = ({ params }) => {
  return (
    <>
      <AdminLayout>
        <div>
          hello world
          <p>{params.slug}</p>
        </div>
      </AdminLayout>
    </>
  );
};

export default page;
