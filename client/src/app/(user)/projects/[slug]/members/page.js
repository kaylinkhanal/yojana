'use client'
import React, { useEffect } from "react";
import AdminLayout from "@/components/adminLayout/page";
import { useSelector } from "react-redux";
import axios from "axios";
const page = ({params}) => {
  const  {selectedProjectId}= useSelector(state=>state.project)
  
  const fetchMembers  = async()=>{
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/members/${selectedProjectId}`)
    // alert(JSON.stringify(data))
  }
  useEffect(()=>{
    fetchMembers()
  },[])
  return (
    <AdminLayout>
      <div></div>
      Hello I am members<p>{params.slug}</p>
    </AdminLayout>
  );
};

export default page;
