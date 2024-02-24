'use client'
import React, { useState, useRef, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import AdminLayout from "@/components/adminLayout/page";

import axios from "axios";
import { useSelector } from 'react-redux'
import Modal from "@/components/modal/page";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { FaXmark } from "react-icons/fa6";
import { Button, Chip, Select,useDisclosure, SelectItem } from "@nextui-org/react";
import toast from "react-hot-toast";

const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: "ghost",
  group: "shared",
  forceFallback: true
};


export default function App() {
  const { selectedProjectId } = useSelector(state => state.project)
  const {userDetails} = useSelector(state=>state.user)
  const inputRef = useRef([])
  const [selectedModalTask, setSelectedModalTask]= useState({})
  const [activeForm, setActiveForm] = useState(1)
  const [memberList, setMemberList] = useState([])
  const [sprintsList, setSprintsList] = useState([]);
  const handleActiveForm = (index) => {
    setActiveForm(index);
  };
  const addSprint = async () => {
    const existingSprintsList = [...sprintsList]
    const tempSprint = {
      sprintName: "Yojana-" + (existingSprintsList.length + 1),
      tasks: [
      ],
      projectId: selectedProjectId
    }
    existingSprintsList.push(tempSprint)
    setSprintsList(existingSprintsList)
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sprints`, tempSprint)
    if(res.statusText == "OK") fetchSprintList()
  }

  const fetchSprintList = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sprints/${selectedProjectId}`)
     setSprintsList(data.sprintList)
   
  }

  const fetchMembers = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/members/${selectedProjectId}`)
    setMemberList(data.projectList.members)
  }



  useEffect(() => {
    fetchSprintList()
    fetchMembers()
  }, [])

    const createTasks = async(inputId,sprintName) => {
       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {summary: sprintName, sprint: inputId, assignee: userDetails._id})
    }
  


  useEffect(() => {
    const handleChange= (e)=>{
      const inputId =e.target.getAttribute('data-arrayId')
      const sprintId = e.target.getAttribute('data-sprintId') 
      const summary = inputRef?.current?.[inputId]?.value
        if (e.key === "Enter" && inputRef.current[inputId]) {
          const tempSprintsList = [...sprintsList]
            tempSprintsList[inputId].tasks.push({
              summary: summary,
              id: inputId,
              description: '',
              assignee: '',
              sprint: '',
              issueType: '',
              project:''
          })
    
          createTasks(sprintId, summary)
          setSprintsList(tempSprintsList)
          inputRef.current[inputId].value=''
        }
    }
    
document.body.addEventListener("keydown", handleChange)
//return can have a clean up functions
return () => {
  document.body.removeEventListener("keydown", handleChange);
};
},[inputRef, createTasks, setSprintsList])

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const changeSprintInfo= (sprintId,taskId, taksUniqueId)=>{
    onOpen()
    setSelectedModalTask(sprintsList[sprintId].tasks[taskId])
  }
  // }, []);

const changeFormDetails =(e, fieldType, id)=>{
  const tempSelectedSprint = {...selectedModalTask}
  if(e?.target?.value){
    tempSelectedSprint[fieldType] =e?.target.value
  }else {
    tempSelectedSprint[fieldType] = id
  }
  setSelectedModalTask(tempSelectedSprint)
}


const updateTaskInfo = async()=> {
  const {data} = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${selectedModalTask._id}`, selectedModalTask)
  onOpenChange()
  toast( data.msg,
    {
      icon:  '✅' ,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    }
  );
}

const assignedMembers = memberList?.find((item=>{
  if(item._id === selectedModalTask.assignee){
  return item
}}))
  return (
    <AdminLayout>
      <div className="flex flex-col items-end gap-4">
        <Button onClick={addSprint}>Create Sprint</Button>

        <ReactSortable
          className="w-full"
          list={sprintsList} setList={setSprintsList} {...sortableOptions}>
          {sprintsList?.map((sprintItem, sprintId) => {
            return (
              <div
                key={sprintItem.id}
                className="p-4 m-4 bg-gray-200 flex flex-col items-start gap-1">
                {sprintItem.sprintName}
                <ReactSortable
                  className="w-full"
                  list={sprintItem.tasks} setList={(currentList) => {
                    setSprintsList((currentSprintList) => {
                      const newList = [...currentSprintList]
                      newList[sprintId].tasks = currentList
                      return newList
                    })
                  }}
                  {...sortableOptions}
                >
                  {sprintItem?.tasks.length > 0 ? sprintItem.tasks.map((taskItem, taskId) => (

                    <div>
                      <div
                        key={taskItem.id}
                        className="p-4 m-2 bg-white" onClick={()=>changeSprintInfo(sprintId,taskId,taskItem._id)}>
                        {taskItem.summary}
                      </div>

                    </div>

                  )) : (
                    <div className="w-full py-2 text-center border border-gray-500 border-dashed">
                      <p>
                        Plan a sprint by dragging a issue or by creating new one
                      </p>
                    </div>
                  )}
                  <div className="w-full relative">
                    <Button
                      onClick={() => handleActiveForm(sprintId)}
                      className="w-full text-start hover:bg-gray-200 px-1 py-2 flex justify-start rounded-none"
                    >
                      + Create issue
                    </Button>
                    <div
                      className={`${activeForm === sprintId ? "flex" : "hidden"
                        } absolute w-full h-full inset-0 bg-white border border-blue-600 items-center gap-3 px-2`}
                    >
                      <select name="" id="" className="focus:outline-none">
                        <option value="feature">Feature</option>
                        <option value="bug">Bug</option>
                      </select>
                       
                      <input
                        data-arrayId={sprintId}
                        data-sprintId={sprintItem._id}
                        ref={(element)=>inputRef.current[sprintId]= element }
                        placeholder="Enter issue title?"
                        className="w-full focus:outline-none"
                      />
                    </div>
                  </div>
                </ReactSortable>
              </div>
            )
          })}
        </ReactSortable>
      </div>

      <Modal
                        title={'Change Ticket Info'}
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onOpenChange={onOpenChange}
                      >
                      
                       
                       <div>
  
      <div className="w-full flex flex-col items-start gap-3">

        <div className="flex flex-col items-start gap-1 w-full">
         <label htmlFor="">Summary</label>
          <textarea
            value={selectedModalTask.summary}
            name=""
            onChange={(e)=>changeFormDetails(e,'summary')}
            id=""
            rows="4"
            className="w-full border border-gray-500 focus:outline-none p-2"
          ></textarea>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <label htmlFor="">Description</label>
          <textarea
            name=""
            value={selectedModalTask.description}
            id=""
            onChange={(e)=>changeFormDetails(e,'description')}
            rows="4"
            className="w-full border border-gray-500 focus:outline-none p-2"
          ></textarea>
        </div>
        <div className="w-full h-full border border-gray-400">
          <h3 className="border-b border-gray-400 px-3 py-2">
            Project Details
          </h3>
          <div className="p-3 flex flex-col items-start gap-2">
            <div className="w-full flex items-center justify-between gap-4">
              <p className="w-1/2 font-medium">Assignee</p>
              <div className="w-1/2">
                <Select
        placeholder={assignedMembers?.fullName || 'Select Assignee'}
        value="f"
        className="max-w-xs"
      >
        {memberList.map((item) => (
          <SelectItem key={item._id}   onClick={(e)=>changeFormDetails(null,'assignee',item._id)}value={item.fullName}>
            {item.fullName}
          </SelectItem>
        ))}
      </Select>
              </div>
            </div>
            {/* <div className="w-full flex items-center justify-between gap-4">
              <p className="w-1/2 font-medium">Sprint</p>
              <p className="w-1/2 text-lg">test</p>
            </div> */}
            <div className="w-full flex items-center justify-between gap-4">
              {/* <p className="w-1/2 font-medium">Issue Type</p>
              <div className="w-1/2">
                <select name="" id="" className="focus:outline-none">
                  <option value="feature">Feature</option>
                  <option value="bug">Bug</option>
                </select>
              </div> */}
            </div>
          </div>
        </div>
        <button onClick={updateTaskInfo} className="bg-blue-700 text-white py-1 px-2">
          Save Changes
        </button>
      </div>
    </div>
               
                      </Modal>
    </AdminLayout>
  );
}


