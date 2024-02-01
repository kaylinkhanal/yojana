'use client'
import React , {useState} from 'react';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import FormSection from '@/components/formSection/page'

import {Select, SelectItem, Avatar, Chip,Dropdown,Input, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';


const DynamicForm = (props) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
    },
    onSubmit: values => {
      handleSave(values);
      formik.resetForm()
    }
  });
  const handleSave = async(inputFields)=>{
    const map = {}
    props.formFields.forEach(item=>{
        map[item.label] = item.type
    })


    for(let item in inputFields){
     if(map[item] == 'Dropdown'){
       inputFields[item] = inputFields?.[item]?.split(',')
     }
  }
  props.onSave(inputFields)
}

console.log(formik)
  return(
  <FormSection>
        <form onSubmit={formik.handleSubmit}>
            {props.formFields.map((item)=>{
              if(item.type == 'Dropdown'){
                return(
                  <Select
                  items={item.data}
                  label={item.label}
                  name={item.label}
                  onChange={ formik.handleChange}
                  value={formik.values[item.label]}
                  variant="bordered"
                  isMultiline={true}
                  selectionMode="multiple"
                  placeholder="Select a user"
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
                        {/* <Avatar alt={user.fullName} className="flex-shrink-0" size="sm" src={user.avatar} /> */}
                        <div className="flex flex-col">
                          <span className="text-small">{user.fullName}</span>
                          <span className="text-tiny text-default-400">{user.email}</span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select>
                )
              }
                return (
                    <Input
                      id={item.label}
                      label={item.label}
                      onBlur={(e)=>props.generateKey(formik.values['projectName'], e)}
                      name={item.label}
                      onChange={ formik.handleChange}
                      value={formik.values[item.label]}
                      placeholder={item.placeholder || ''}
                      labelPlacement="outside"
                    />
                )
            })}
          <br/>
          {props.projectKey && <p>project key: {props.projectKey}</p> }
          <Button  type="submit" color="primary" variant="flat">
        {props.buttonTitle}
      </Button>  
        </form>
  </FormSection>
)}

export default DynamicForm


