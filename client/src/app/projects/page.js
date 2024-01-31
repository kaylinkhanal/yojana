"use client";
import React, { useEffect, useState } from "react";
import CardView from "@/components/cardView/page";
import Modal from "@/components/modal/page";
import { Button, useDisclosure } from "@nextui-org/react";
import DynamicForm from "@/components/dynamicForm/page";
import { useSelector } from "react-redux";
import axios from "axios";

const page = () => {
  const { userDetails } = useSelector((state) => state.user);
  const [projectKey, setProjectKey] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [projectList, setProjectList] = useState([]);
  const [userList, setUserList] = useState([]);

  const fetchProjectList = async () => {
    const res = await fetch(`http://localhost:8080/projects`);
    const data = await res.json();
    setProjectList(data.projectList);
  };

  const fetchUserList = async () => {
    const res = await fetch(`http://localhost:8080/users`);
    const data = await res.json();
    setUserList(data.userList);
  };

  useEffect(() => {
    fetchProjectList();
    fetchUserList();
  }, []);

  const onSave = async (inputFields) => {
    inputFields.organization = userDetails.organization;
    inputFields.projectKey = projectKey;
    const { data } = await axios.post(
      "http://localhost:8080/projects",
      inputFields
    );
    onOpenChange();
    fetchProjectList();
  };

  const generateKey = (inputProject, event) => {
    if (event?.target.name === "projectName") {
      if (!inputProject) return "";
      let finalKey =
        userDetails.organization.charAt(0).toUpperCase() +
        inputProject
          ?.split(" ")
          ?.map((item) => item[0])
          .join("")
          .toUpperCase();
      const projectKeys = projectList.map((item) => {
        return item.projectKey;
      });

      if (projectKeys.includes(finalKey)) {
        finalKey =
          finalKey +
          inputProject[
            Math.floor(Math.random() * inputProject.length)
          ].toUpperCase();
      }

      setProjectKey(finalKey);
      return finalKey;
    }
  };
  return (
    <div>
      <Button onPress={onOpen} className="m-4" color="primary">
        Add Projects
      </Button>
      <Modal
        title="Add Projects"
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        <DynamicForm
          buttonTitle="Add"
          onSave={onSave}
          projectKey={projectKey}
          generateKey={generateKey}
          formFields={[
            { label: "projectName", placeholder: "Enter project Name" },
            {
              label: "projectDescription",
              placeholder: "Enter project Description",
            },
            {
              label: "members",
              placeholder: "Members",
              type: "Dropdown",
              data: userList,
            },
          ]}
        />
      </Modal>

      {/* {projectList.map((item)=>{
      return       <CardView item={item}/>
     })} */}
      <CardView projectList={projectList} />
    </div>
  );
};

export default page;
