"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/page";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { columns } from "./data";
import { Pagination } from "@nextui-org/react";
const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const UserTable = (props) => {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                view
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                edit
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                delete
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={props.userList}>
        {(item) => (
          <TableRow key={item}>
            {(columnKey) => {
              return (
                <TableCell>
                  {" "}
                  <div
                    className={
                      item?._id === props.currentUserId
                        ? "p-2 bg-red-100"
                        : null
                    }
                  >
                    {renderCell(item, columnKey)}
                  </div>
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const Page = () => {
  const { userDetails } = useSelector((state) => state.user);
  const [userList, setUserList] = useState([]);
  const [count, setCount] = useState(0);
  const fetchUserList = async (page = 1) => {
    const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}`);
    const data = await res.json();
    setUserList(data.userList);
    setCount(data.count);
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div>
      <UserTable currentUserId={userDetails._id} userList={userList} />
      <Pagination
        onChange={(page) => fetchUserList(page)}
        isCompact
        showControls
        total={Math.ceil(count / 5) || 1}
        initialPage={1}
        loop={true}
        page={1}
      />
    </div>
  );
};

export default Page;
