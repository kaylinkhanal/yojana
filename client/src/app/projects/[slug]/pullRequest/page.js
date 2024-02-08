"use client";
import React, { useCallback, useEffect, useState } from "react";
import AdminLayout from "@/components/adminLayout/page";
import axios from "axios";
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

const PullTable = (props) => {
  const renderCell = useCallback((request, columnKey) => {
    const cellValue = request[columnKey];

    switch (columnKey) {
      case "id":
        return <div className="text-base">{cellValue}</div>;
      case "title":
        return (
          <div className="font-medium text-base capitalize">{cellValue}</div>
        );
      case "date":
        return <div className="text-base">{request.created_at}</div>;
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid} className="text-base">{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={props.requestList}>
        {(item) => (
          <TableRow key={item} className="border">
            {(columnKey) => {
              return (
                <TableCell>
                  <div >{renderCell(item, columnKey)}</div>
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
  const [requestList, setRequestList] = useState([]);
  const fetchUser = async () => {
    const response = await axios.get(
      "https://api.github.com/repos/kaylinkhanal/yojana/pulls"
    );
    setRequestList(response.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <AdminLayout path={params.slug}>
        <div className="flex flex-col items-start gap-5 px-4 py-6">
          <h1 className="text-3xl font-bold">Pending pull requests</h1>
          <PullTable requestList={requestList} />
        </div>
      </AdminLayout>
    </>
  );
};

export default page;
