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
import {setSelectedProjectId} from '@/redux/reducerSlices/projectSlice'
import { useDispatch } from "react-redux"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";


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
    key: "projectLead",
    label: "Project Lead",
  },
  {
    key: "projectType",
    label: "Project Type",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

 const VerticalDotsIcon = ({size = 24, width, height, ...props}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
      fill="currentColor"
    />
  </svg>
);

export default function App(props) {
  const dispatch = useDispatch()
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


  const generateDisplayName = (item, columnKey)=>{
    let displayValue;
    if(columnKey === 'projectLead'){
      displayValue= item[columnKey]['fullName']
    } else{
      displayValue= item[columnKey]
    }
    
    return displayValue
  }
  return (
    <>
      <Table
        aria-label="Controlled table example with dynamic content"
        // selectionMode="multiple"
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

            switch (columnKey) {
              case "projectName":
                      return (<TableCell >
                      <Link className="text-blue-400" onClick={()=>dispatch(setSelectedProjectId(item._id))} href={`/projects/${item.projectKey}`}>{generateDisplayName(item, columnKey)}</Link>
                      </TableCell>);
              case "actions":
                  return (
                      <TableCell className="relative flex justify-end items-center gap-2">
                        <Dropdown className="bg-background border-1 border-default-200">
                          <DropdownTrigger>
                            <Button isIconOnly radius="full" size="sm" variant="light">
                              <VerticalDotsIcon className="text-default-400" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem>View</DropdownItem>
                            <DropdownItem onClick={()=>props.editProject(item._id)}>Edit</DropdownItem>
                            <DropdownItem onClick={()=>props.deleteProject(item._id)}>Delete</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>
                    )
                default:
                  return (<TableCell>{generateDisplayName(item, columnKey)}</TableCell>)
                            
                          
              }}}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {selectedKeys.size > 0 && (
        <div className="flex justify-end items-center">
          <button className="bg-white text-black text-5xl ">
            trash
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
