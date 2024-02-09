"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/page";
import { useSelector } from "react-redux";
import Image from "next/image";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Progress,
} from "@nextui-org/react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const page = () => {
  const { userDetails } = useSelector((state) => state.user);
  const { email, fullName, organization, role } = userDetails;

  const [userList, setUserList] = useState([]);
  const fetchUserList = async () => {
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/users`);
    const data = await res.json();
    setUserList(data.userList);
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <>
      <section className="py-8 text-black bg-gray-50">
        <div className="container bg-white p-5 rounded flex items-center gap-8 mb-14">
          <div className="flex items-center gap-4 w-1/2">
            <Image
              src="/profile.webp"
              width={2000}
              height={2000}
              alt="profile"
              className="w-24 aspect-square rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold">{fullName}</h2>
              <small className="text-blue-500">{role}</small>
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-start gap-1">
            <p>
              <span className="font-medium">Name:</span> {fullName}
            </p>
            <p>
              <span className="font-medium">Email:</span> {email}
            </p>
            <p>
              <span className="font-medium">Organization Name:</span>{" "}
              {organization}
            </p>
          </div>
        </div>
        <div className="container flex flex-col items-start gap-2">
          <h2 className="text-3xl font-bold">My Task</h2>
          <div className="w-full grid grid-cols-3 gap-3">
            <div className="flex flex-col items-start gap-2 bg-gray-100 p-3">
              <h3 className="text-xl font-semibold">Upcoming</h3>
              <div className="flex flex-col items-start gap-2 w-full">
                <div className="bg-white w-full p-2 flex flex-col items-start gap-4">
                  <div className="flex items-center justify-between w-full">
                    <h4 className="text-lg font-semibold text-blue-600">
                      Project Name
                    </h4>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered">Project Members</Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        {userList?.map((item, id) => (
                          <DropdownItem key={id}>{item.fullName}</DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className="w-full flex flex-col items-start gap-1">
                    <p>0%</p>
                    <Progress
                      aria-label="Loading..."
                      size="sm"
                      value={0}
                      className="w-full"
                    />
                  </div>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat dicta veniam repellendus, animi.
                  </p>
                  <div className="flex items-center w-full justify-between text-sm font-medium text-gray-500">
                    <p>
                      <span className="text-blue-500">Start Date:</span>
                      2024-01-20
                    </p>
                    <p>
                      <span className="text-blue-500">Target Date:</span>
                      2024-01-20
                    </p>
                  </div>
                  <Link
                    href="#"
                    className="text-blue-500 border-b border-blue-500 text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-200 ease-linear"
                  >
                    View Details <FaArrowRightLong className="text-xs" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 bg-gray-100 p-3">
              <h3 className="text-xl font-semibold">In Progress</h3>
              <div className="flex flex-col items-start gap-2 w-full group">
                <div className="bg-white w-full p-2 flex flex-col items-start gap-4">
                  <div className="flex items-center justify-between w-full">
                    <h4 className="text-lg font-semibold text-blue-600">
                      Project Name
                    </h4>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered">Project Members</Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        {userList?.map((item, id) => (
                          <DropdownItem key={id}>{item.fullName}</DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className="w-full flex flex-col items-start gap-1">
                    <p>60%</p>
                    <Progress
                      aria-label="Loading..."
                      size="sm"
                      value={60}
                      className="w-full"
                    />
                  </div>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat dicta veniam repellendus, animi.
                  </p>
                  <div className="flex items-center w-full justify-between text-sm font-medium text-gray-500">
                    <p>
                      <span className="text-blue-500">Start Date:</span>
                      2024-01-20
                    </p>
                    <p>
                      <span className="text-blue-500">Target Date:</span>
                      2024-01-20
                    </p>
                  </div>
                  <Link
                    href="#"
                    className="text-blue-500 border-b border-blue-500 text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-200 ease-linear"
                  >
                    View Details <FaArrowRightLong className="text-xs" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 bg-gray-100 p-3">
              <h3 className="text-xl font-semibold">Completed</h3>
              <div className="flex flex-col items-start gap-2 w-full">
                <div className="bg-white w-full p-2 flex flex-col items-start gap-4">
                  <div className="flex items-center justify-between w-full">
                    <h4 className="text-lg font-semibold text-blue-600">
                      Project Name
                    </h4>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered">Project Members</Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        {userList?.map((item, id) => (
                          <DropdownItem key={id}>{item.fullName}</DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className="w-full flex flex-col items-start gap-1">
                    <p>100%</p>
                    <Progress
                      aria-label="Loading..."
                      size="sm"
                      value={100}
                      className="w-full"
                    />
                  </div>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat dicta veniam repellendus, animi.
                  </p>
                  <div className="flex items-center w-full justify-between text-sm font-medium text-gray-500">
                    <p>
                      <span className="text-blue-500">Start Date:</span>
                      2024-01-20
                    </p>
                    <p>
                      <span className="text-blue-500">Target Date:</span>
                      2024-01-20
                    </p>
                  </div>
                  <Link
                    href="#"
                    className="text-blue-500 border-b border-blue-500 text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-200 ease-linear"
                  >
                    View Details <FaArrowRightLong className="text-xs" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
