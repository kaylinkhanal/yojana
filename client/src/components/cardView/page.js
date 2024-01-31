"use client";
import { React, useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  divider,
  Pagination,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];
const dropDown = [
  {
    key: "high",
    label: "HIGH",
  },
  {
    key: "low",
    label: "LOW",
  },
  {
    key: "normal",
    label: "NORMAL",
  },
];

const columns = [
  {
    key: "projectKey",
    label: "ID",
  },

  {
    key: "projectName",
    label: "PROJECT NAME",
  },
  {
    key: "lead",
    label: "ASSIGNEE",
  },
  {
    key: "members",
    label: "MEMBERS",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "priority",
    label: "PRIORITY",
  },
];

export default function App(props) {
  const [selectedKeys, setSelectedKeys] = useState([]);
  console.log(selectedKeys);
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;
  const pages = Math.ceil(props.projectList.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return props.projectList.slice(start, end);
  }, [page, props.projectList]);

  return (
    <>
      <Table
        aria-label="Controlled table example with dynamic content"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns} className="py-5">
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => {
                let displayValue = item[columnKey];

                return <TableCell>{displayValue}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {selectedKeys.size > 0 && (
        <div className="flex justify-end items-center">
          <button className="bg-white text-black text-5xl ">
            <FontAwesomeIcon icon={faTrash} />{" "}
          </button>

          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">PRIORITY </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={dropDown}>
              {(item) => (
                <DropdownItem
                  key={item.key}
                  color={item.key === "high" ? "danger" : "default"}
                  className={item.key === "high" ? "text-danger" : ""}
                >
                  {item.label}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </>
  );
}
