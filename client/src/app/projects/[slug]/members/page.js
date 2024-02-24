import React from "react";
import AdminLayout from "@/components/adminLayout/page";

import axios from "axios";

async function getData() {
  const res = await fetch('http://localhost:8080/members/65cac7b0ab1ce818de56d769')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
const page = async({params}) => {
  const data = await getData()

  return (
    <AdminLayout>
      <div>hello</div>
    {JSON.stringify(data)}
    </AdminLayout>
  );
};

export default page;
console.log("Hi")