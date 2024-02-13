'use client'
import React, { useState, useRef, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import AdminLayout from "@/components/adminLayout/page";
import { Button, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useSelector } from 'react-redux'
import Modal from "@/components/modal/page";
import { Listbox, ListboxItem } from "@nextui-org/react";
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
  }

  const fetchSprintList = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sprints/${selectedProjectId}`)
    //  setSprintsList(data.sprintList)
    alert(JSON.stringify(data))
  }

  useEffect(() => {
    fetchSprintList()
  }, [])

  // useEffect(() => {
  //   debugger;
  document.body.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && inputRef.current.value) {
      const currentSprint = parseInt(inputRef.current.id.split('*')[0])
      const tempSprintsList = JSON.parse(inputRef.current.id.split('*')[1]).sprintsList

      if (tempSprintsList[currentSprint]?.tasks[tempSprintsList[currentSprint].tasks.length - 1]?.sprintName !== inputRef.current.value) {
        tempSprintsList[currentSprint].tasks.push({
          sprintName: inputRef.current.value,
          id: tempSprintsList[currentSprint].tasks.length + 1
        })
        setSprintsList(tempSprintsList)
        inputRef.current.value = ""
      }
    }
  });


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

                      <Modal
                        title={taskItem.sprintName}
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onOpenChange={onOpenChange}
                      >
                        <Listbox
                          aria-label="Listbox Variants"
                        >
                          <ListboxItem>Summary</ListboxItem>
                          <ListboxItem>Description</ListboxItem>
                          <ListboxItem>Assignee</ListboxItem>
                          <ListboxItem>Reporter</ListboxItem>
                        </Listbox>
                      </Modal>
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
    </AdminLayout>
  );
}