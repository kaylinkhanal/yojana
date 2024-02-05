'use client'
import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";


const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: "ghost",
  group: "shared",
  forceFallback: true
};

export default function App() {
  const [spintsList, setSprintsList] = useState([
    {
      id: 1,
      content: "Yojana 1.0",
      parent_id: null,
      type: "container",
      tasks: [
        {
          id: 2,
          content: "Create a login page",
          width: 3,
          type: "text",
          parent_id: 1
        },
        {
          id: 3,
          content: "Create a register page",
          width: 3,
          type: "text",
          parent_id: 1
        }
      ]
    },
    {
      id: 4,
      content: "Yojana 1.1",
      parent_id: null,
      type: "container",
      tasks: [
        {
          id: 5,
          content: "Change password feature",
          width: 3,
          parent_id: 2,
          type: "container",
          children: [
            { id: 8, content: "Change password feature", width: 6, type: "text", parent_id: 5 },
            { id: 9, content: "logout user", width: 6, type: "text", parent_id: 5 }
          ]
        },
        {
          id: 6,
          content:  "logout user",
          width: 2,
          type: "text",
          parent_id: 2
        },
        {
          id: 7,
          content: "esewa integrate",
          width: 2,
          type: "text",
          parent_id: 2
        }
      ]
    }
  ]);

  return (
    <div>
      <ReactSortable list={spintsList} setList={setSprintsList} {...sortableOptions}>
        {spintsList?.map((sprintItem, sprintId) => (
            <div className="p-4 m-4 bg-red-500">
              {sprintItem.content}
              <ReactSortable  list={sprintItem.tasks} setList={(currentList)=>{
                console.log("currentList", currentList)
                setSprintsList((currentSprintList)=>{
                  console.log("currentSprintList",currentSprintList)
                  return currentSprintList
                })
              }} >
              {sprintItem.tasks.map((taskItem, taskId)=>{
                return <div className="p-4 m-2 bg-blue-600">{taskItem.content}</div>
              })}
              </ReactSortable>
              </div>
        ))}
      </ReactSortable>
    </div>
  );
}

