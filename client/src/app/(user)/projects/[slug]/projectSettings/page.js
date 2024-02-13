import React from "react";
import AdminLayout from "@/components/adminLayout/page";
import { Input, Button } from "@nextui-org/react";

const page = ({ params }) => {
  return (
    <>
      <AdminLayout path={params.slug}>
        <div>
          <Input placeholder="Enter github url"/>
          <Button className="m-2">
            Delete Project
          </Button>
          <p>{params.slug}</p>
        </div>
      </AdminLayout>
    </>
  );
};

export default page;
