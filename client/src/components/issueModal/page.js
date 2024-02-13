import { Button, Chip, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";

const IssueModal = ({ sprintItem, projectMembers, taskItem, setOpenModal }) => {
  return (
    <div className="fixed z-[999] w-2/5 h-2/3 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white shadow-[0_0_10px_1px_rgba(0,0,0,0.2)] p-8 overflow-y-auto">
      <button
        onClick={() => setOpenModal(false)}
        className="w-6 h-6 border border-gray-600 rounded-full flex justify-center items-center ms-auto"
      >
        <FaXmark />
      </button>
      <div className="w-full flex flex-col items-start gap-3">
        <h2 className="text-2xl font-medium">{taskItem.sprintName}</h2>
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
                <Select
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
                </Select>
              </div>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
              <p className="w-1/2 font-medium">Sprint</p>
              <p className="w-1/2 text-lg">{sprintItem.sprintName}</p>
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
  );
};

export default IssueModal;
