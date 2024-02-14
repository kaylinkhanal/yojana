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
  const inputRef = useRef(null)
  const [activeForm, setActiveForm] = useState(null)
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
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sprints`, tempSprint)
    fetchSprintList()
  }

  const fetchSprintList = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sprints/${selectedProjectId}`)
     setSprintsList(data.sprintList)
   
  }

  useEffect(() => {
    fetchSprintList()
  }, [])

    const createTasks = async() => {
      debugger;
       const currentSprint = parseInt(inputRef.current.id.split('*')[0])
       const tempSprintsList = JSON.parse(inputRef.current.id.split('*')[1]).sprintsList
       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {summary: inputRef.current.value, sprint: tempSprintsList[currentSprint]._id })
    }
  
  useEffect(() => {
  document.body.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && inputRef.current.value) {
      const currentSprint = parseInt(inputRef.current.id.split('*')[0])
      const tempSprintsList = JSON.parse(inputRef.current.id.split('*')[1]).sprintsList
      if (tempSprintsList[currentSprint]?.tasks[tempSprintsList[currentSprint].tasks.length - 1]?.sprintName !== inputRef.current.value) {
        createTasks()
        tempSprintsList[currentSprint].tasks.push({
          sprintName: inputRef.current.value,
          id: tempSprintsList[currentSprint].tasks.length + 1
        })
        setSprintsList(tempSprintsList)
        inputRef.current.value = ""
      }
    }
  });
},[])

  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  // }, []);
  return (
    <AdminLayout>
      <div className="flex flex-col items-end gap-4">
        <Button onClick={addSprint}>Create Sprint</Button>

        {JSON.stringify(sprintsList)}
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
                        className="p-4 m-2 bg-white" onClick={onOpen}>
                        {taskItem.sprintName}
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
                        ref={inputRef}
                        id={[sprintId, '*' + JSON.stringify({ sprintsList })]}
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
                        title={'test'}
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onOpenChange={onOpenChange}
                      >
                      
                       
                       <div>
  
      <div className="w-full flex flex-col items-start gap-3">

        <div className="flex flex-col items-start gap-1 w-full">
          <label htmlFor="">Summary</label>
          <textarea
            name=""
            id=""
            rows="4"
            className="w-full border border-gray-500 focus:outline-none p-2"
          ></textarea>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <label htmlFor="">Description</label>
          <textarea
            name=""
            id=""
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
                {/* <Select
                  items={projectMembers}
                  variant="bordered"
                  isMultiline={true}
                  selectionMode="multiple"
                  placeholder="Assigne"
                  labelPlacement="outside"
                  classNames={{
                    base: "max-w-xs",
                    trigger: "min-h-unit-12 py-2",
                  }}
                  renderValue={(items) => {
                    return (
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <Chip key={item.key}>{item.data.fullName}</Chip>
                        ))}
                      </div>
                    );
                  }}
                >
                  {(user) => (
                    <SelectItem key={user._id} textValue={user.fullName}>
                      <div className="flex gap-2 items-center">
                        <div className="flex flex-col">
                          <span className="text-small">{user.fullName}</span>
                          <span className="text-tiny text-default-400">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select> */}
              </div>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
              <p className="w-1/2 font-medium">Sprint</p>
              <p className="w-1/2 text-lg">test</p>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
              <p className="w-1/2 font-medium">Issue Type</p>
              <div className="w-1/2">
                <select name="" id="" className="focus:outline-none">
                  <option value="feature">Feature</option>
                  <option value="bug">Bug</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <button className="bg-blue-700 text-white py-1 px-2">
          Save Changes
        </button>
      </div>
    </div>
               
                      </Modal>
    </AdminLayout>
  );
}