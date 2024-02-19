"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/adminLayout/page";
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
import { columns } from "./data";
import axios from "axios";
import { useSelector } from "react-redux";

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
                  <div>{renderCell(item, columnKey)}</div>
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const page = ({ params }) => {
  const { selectedProjectId } = useSelector((state) => state.project);
  const [memberList, setMemberlist] = useState([]);

  const fetchMember = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/members/${selectedProjectId}`
    );
    setMemberlist(response.data.projectList.members);
  };

  useEffect(() => {
    fetchMember();
  }, []);

  return (
    <AdminLayout>
      <div>
        <h2 className="text-3xl font-semibold mb-4">Project Memberlist</h2>
        <UserTable userList={memberList} />
      </div>
    </AdminLayout>
  );
};

export default page;
