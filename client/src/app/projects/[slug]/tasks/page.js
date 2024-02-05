"use client";
import React, { useEffect, useRef, useState } from "react";
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

export default function App() {
  const inputField = useRef(null);
  const [sprintsList, setSprintsList] = useState([]);
  const [issueList, setIssueList] = useState([]);
  const [activeForm, setActiveForm] = useState(null);
  // {
  //   id: 1,
  //   content: "Yojana 1.0",
  //   parent_id: null,
  //   type: "container",
  //   tasks: [
  //     {
  //       id: 2,
  //       content: "Create a login page",
  //       width: 3,
  //       type: "text",
  //       parent_id: 1,
  //     },
  //     {
  //       id: 3,
  //       content: "Create a register page",
  //       width: 3,
  //       type: "text",
  //       parent_id: 1,
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   content: "Yojana 1.1",
  //   parent_id: null,
  //   type: "container",
  //   tasks: [
  //     {
  //       id: 5,
  //       content: "Change password feature",
  //       width: 3,
  //       parent_id: 2,
  //       type: "container",
  //       children: [
  //         {
  //           id: 8,
  //           content: "Change password feature",
  //           width: 6,
  //           type: "text",
  //           parent_id: 5,
  //         },
  //         {
  //           id: 9,
  //           content: "logout user",
  //           width: 6,
  //           type: "text",
  //           parent_id: 5,
  //         },
  //       ],
  //     },
  //     {
  //       id: 6,
  //       content: "logout user",
  //       width: 2,
  //       type: "text",
  //       parent_id: 2,
  //     },
  //     {
  //       id: 7,
  //       content: "esewa integrate",
  //       width: 2,
  //       type: "text",
  //       parent_id: 2,
  //     },
  //   ],
  // },

  const addSprint = () => {
    setSprintsList((prevSprint) => [
      ...prevSprint,
      {
        id: 1,
        content: `Yojana${sprintsList.length + 1}`,
        parent_id: null,
        type: "container",
        tasks: issueList,
      },
    ]);
  };

  const handleActiveForm = (index) => {
    setActiveForm(index);
  };

  useEffect(() => {
    document.body.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && inputField.current.value) {
        setIssueList((prevState) => {
          if (!prevState.includes(inputField.current.value)) {
            return [
              ...prevState,
              {
                id: issueList.length + 1,
                content: inputField.current.value,
              },
            ];
          } else return [...prevState];
        });
      }
    });
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col items-end gap-4">
        <Button onClick={addSprint}>Create Sprint</Button>
        <ReactSortable
          list={sprintsList}
          setList={setSprintsList}
          {...sortableOptions}
          className="w-full"
        >
          {sprintsList?.map((sprintItem, sprintId) => (
            <div className="p-4 m-4 bg-gray-200 flex flex-col items-start gap-1">
              <p>{sprintItem.content}</p>
              {sprintItem.tasks.length > 0 ? (
                <ReactSortable
                  list={sprintItem.tasks}
                  setList={(currentList) => {
                    console.log("currentList", currentList);
                    setSprintsList((currentSprintList) => {
                      console.log("currentSprintList", currentSprintList);
                      return currentSprintList;
                    });
                  }}
                  className="w-full"
                >
                  {sprintItem.tasks.map((taskItem, taskId) => {
                    return (
                      <div className="p-4 m-2 bg-white">{taskItem.content}</div>
                    );
                  })}
                </ReactSortable>
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
                    ref={inputField}
                    type="text"
                    placeholder="Enter issue title?"
                    className="w-full focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </ReactSortable>
      </div>
    </AdminLayout>
  );
}
