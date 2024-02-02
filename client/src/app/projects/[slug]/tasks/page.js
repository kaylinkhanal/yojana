'use client'
import React,{useState} from "react";
import AdminLayout from "@/components/adminLayout/page";
import { Button } from "@nextui-org/react";

const page = ({params}) => {
  const [sprintList, setSprintList] = useState([])
  const addSprint=()=>{
 
    const existingSprintList = [...sprintList]


    const spirntDetails = {sprintName: 'Yojana'+ (sprintList.length+1) }
    existingSprintList.push(spirntDetails)
    setSprintList(existingSprintList)
  }
  return (
    <AdminLayout>
      <div></div>
      <Button onClick={addSprint}>Create sprint</Button>
      {sprintList.map((item)=>{
        return (
          <div className="p-4 m-16 bg-color-red-200">
              {item.sprintName}
          </div>
        )
      })}
       <p>{params.slug}</p>
    </AdminLayout>
  );
};

export default page;
