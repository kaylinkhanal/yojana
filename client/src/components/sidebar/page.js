"use client";
import Link from "next/link";
import React from "react";
import { IoIosPeople } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

const page = ({ path }) => {
  return (
    <aside className="h-screen fixed py-10 border-r border-gray-500 w-48">
      <ul className="flex flex-col items-start gap-2 border-b border-gray-500 px-2 pb-6">
        <li className="font-medium w-full">
          <Link
            href={`/projects/${path}`}
            className={`flex items-center gap-2 w-full hover:bg-blue-950 hover:bg-opacity-10 p-2`}
          >
            <RxDashboard />
            Board
          </Link>
        </li>
        <li className="font-medium w-full">
          <Link
            href={`/projects/${path}/tasks`}
            className={`flex items-center gap-2 w-full hover:bg-blue-950 hover:bg-opacity-10 p-2 `}
          >
            <FaTasks />
            Tasks
          </Link>
        </li>
        <li className="font-medium w-full">
          <Link
            href={`/projects/${path}/members`}
            className="flex items-center gap-2 w-full hover:bg-blue-950 hover:bg-opacity-10 p-2"
          >
            <IoIosPeople />
            Members
          </Link>
        </li>
      </ul>
      <div className="font-medium px-2 pt-6 w-full">
        <Link
          href={`/projects/${path}/projectSettings`}
          className="flex items-center gap-2 w-full hover:bg-blue-950 hover:bg-opacity-10 p-2"
        >
          <IoSettingsOutline />
          Project Settings
        </Link>
      </div>
    </aside>
  );
};

export default page;
