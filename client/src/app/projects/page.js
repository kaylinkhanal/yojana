'use client'
import React, { useEffect,useState} from 'react'
import CardView from '@/components/cardView/page'
import Modal from '@/components/modal/page'
import { Button, useDisclosure} from "@nextui-org/react";
import DynamicForm from '@/components/dynamicForm/page';
import { useSelector } from 'react-redux';
import axios from 'axios';


const page = () => {
  const {userDetails} = useSelector(state=>state.user)
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [projectList, setProjectList] = useState([])
  const [userList, setUserList] = useState([])

  const fetchProjectList =async ()=>{
     const res = await fetch(`http://localhost:8080/projects`)
     const data = await res.json()
     setProjectList(data.projectList)
  }

  const fetchUserList =async ()=>{
    const res = await fetch(`http://localhost:8080/users`)
    const data = await res.json()
    setUserList(data.userList)
 }


  useEffect(()=>{
    fetchProjectList()
    fetchUserList()

  },[])

  const onSave = async(inputFields)=>{
    inputFields.organization = userDetails.organization
    const {data} = await axios.post('http://localhost:8080/projects', inputFields )
    console.log(data)
  }

  return (
    <div>
      <Button onPress={onOpen} className='m-4' color="primary">
      Add Projects
    </Button>
    <Modal
     title="Add Projects"
      isOpen={isOpen} 
      onOpen={onOpen}
      onOpenChange={onOpenChange}>
        <DynamicForm 
        buttonTitle= "Add"
        onSave= {onSave}
        formFields={[{label: 'projectName' ,placeholder:"Enter project Name"},
                    {label: 'projectDescription',placeholder:"Enter project Description"},
                     {label: 'members', placeholder:'Members', type:'Dropdown', data:userList},
                     ]}/>
        </Modal>
     

     {projectList.map((item)=>{
      return       <CardView/>
     })}

      
      </div>
  )
}

export default page