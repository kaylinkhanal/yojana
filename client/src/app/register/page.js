'use client'
import React , {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormSection from '@/components/formSection/page'
import { CiMail } from "react-icons/ci";
import {Dropdown,Input, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";


const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

});

const roles = ['Project Manager', 'Developer', 'Designer', 'Staff', 'Software Engineer']
  
const Register = () => {
  const [organization, setOrganization] = useState('gmail')
  const [selectedRole, setSelectedRole] = useState('')

  const handleRegister = (inputFields)=>{
    fetch('http://localhost:5000/register/',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(inputFields)
    })
  }
  return(
  <FormSection>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        email: '',
        password: '',
        organization: '',
        role: ''
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        values.role = selectedRole
        values.email=values.email+'@'+organization+'.com'
        handleRegister(values);
      }}
    >
      {({ errors, touched,handleChange }) => (
        <Form>
      <Input
          type="organization"
          name="organization"
          label="Organization"
          placeholder="Enter Organization"
          labelPlacement="outside"
          onChange={(e)=> {
            handleChange(e);
            setOrganization(e.target.value?.split(' ').join('').toLowerCase())
          }}
        />
        <Input
          label="Email"
          name="email"
          onChange={handleChange}
          placeholder="Enter Email"
          labelPlacement="outside"
          startContent={
            <CiMail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">@{organization}.com</span>
            </div>
          }
        />
          {errors.email && touched.email ? (
            <div>{errors.email}</div>
          ) : null}
          <br/>
          <Input
          type="password"
          name="password"
          onChange={handleChange}
          label="password"
          placeholder="Enter password"
          labelPlacement="outside"
        />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <br/>
          <Dropdown >
            <DropdownTrigger >
              <Button 
                variant="bordered" 
              >
              {selectedRole ||  'Choose role'}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              {roles.map((item)=>{
                return (
                  <DropdownItem  onClick={(e)=>setSelectedRole(e.target.outerText)} key={item}>{item}</DropdownItem>
                )
              })}
          
            </DropdownMenu>
          </Dropdown>
          <br/>
          <Button  type="submit" color="primary" variant="flat">
        Register
      </Button>  

        </Form>
      )}
    </Formik>
  </FormSection>
)}

export default Register