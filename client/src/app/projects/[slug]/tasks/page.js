"use client";
import React, { useState, useRef, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import AdminLayout from "@/components/adminLayout/page";
import { Button } from "@nextui-org/react";

const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: "ghost",
  group: "shared",
  forceFallback: true,
};

const sprintStr = {
  id: 1,
  content: "Yojana",
  parent_id: null,
  type: "container",
  tasks: [],
};

export default function App() {
  const inputRef = useRef(null);
  const [activeForm, setActiveForm] = useState(null);
  const [spintsList, setSprintsList] = useState([sprintStr]);
  const handleActiveForm = (index) => {
    setActiveForm(index);
  };
  const addSprint = () => {
    const existingSpintsList = [...spintsList];
    existingSpintsList.push({
      id: 1,
      content: "Yojana",
      parent_id: null,
      type: "container",
      tasks: [],
    });
    setSprintsList(existingSpintsList);
  };

  // useEffect(() => {
  //   debugger;
  document.body.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && inputRef.current.value) {
      const currentSprint = parseInt(inputRef.current.id.split("*")[0]);
      const tempSpintsList = JSON.parse(
        inputRef.current.id.split("*")[1]
      ).spintsList;

      debugger;
      if (
        tempSpintsList[currentSprint]?.tasks[
          tempSpintsList[currentSprint].tasks.length - 1
        ]?.content !== inputRef.current.value
      ) {
        tempSpintsList[currentSprint].tasks.push({
          content: inputRef.current.value,
          id: tempSpintsList[currentSprint].tasks.length + 1,
        });
        setSprintsList(tempSpintsList);
      }
    }
  });

  // }, []);
  return (
    <AdminLayout>
      <div className="flex flex-col items-end gap-4">
        <Button onClick={addSprint}>Create Sprint</Button>

        {JSON.stringify(spintsList)}
        <ReactSortable
          className="w-full"
          list={spintsList}
          setList={setSprintsList}
          {...sortableOptions}
        >
          {spintsList?.map((sprintItem, sprintId) => (
            <div
              key={sprintItem.id}
              className="p-4 m-4 bg-gray-200 flex flex-col items-start gap-1"
            >
              {sprintItem.content} {sprintId}
              <ReactSortable
                className="w-full"
                list={sprintItem.tasks}
                setList={(currentList) => {
                  setSprintsList((currentSprintList) => {
                    const newList = [...currentSprintList];
                    newList[sprintId].tasks = currentList;
                    return newList;
                  });
                }}
                {...sortableOptions}
              >
                {sprintItem?.tasks.length > 0 ? (
                  sprintItem.tasks.map((taskItem, taskId) => {
                    return (
                      <div key={taskItem.id} className="p-4 m-2 bg-white">
                        {taskItem.content}
                      </div>
                    );
                  })
                ) : (
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
                    className={`${
                      activeForm === sprintId ? "flex" : "hidden"
                    } absolute w-full h-full inset-0 bg-white border border-blue-600 items-center gap-3 px-2`}
                  >
                    <select name="" id="" className="focus:outline-none">
                      <option value="feature">Feature</option>
                      <option value="bug">Bug</option>
                    </select>
                    <input
                      ref={inputRef}
                      id={[sprintId, "*" + JSON.stringify({ spintsList })]}
                      mapping="test"
                      type="text"
                      placeholder="Enter issue title?"
                      className="w-full focus:outline-none"
                    />
                  </div>
                </div>
              </ReactSortable>
            </div>
          ))}
        </ReactSortable>
      </div>
    </AdminLayout>
  );
}
