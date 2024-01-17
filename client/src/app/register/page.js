'use client'
import React , {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import FormSection from '@/components/formSection/page'
import { CiMail } from "react-icons/ci";
import {Dropdown,Input, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
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
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      organization: '',
      role: ''
    },
    onSubmit: values => {
      values.role = selectedRole
      values.email=values.email+'@'+organization+'.com'
      handleRegister(values);
      formik.resetForm()
    }
  });
  const handleRegister = async(inputFields)=>{
    try{
      const res = await fetch('http://localhost:5000/register/',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inputFields)
      })
      const data = await res.json()

      toast( res.status == 200 ? data.msg+ '. Please login': data.msg,
          {
            icon: res.status == 200 ? '✅' : '❌',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
 
    }catch(err){
      console.log(err)
    }
  
  }
  return(
  <FormSection>
    <h1>Signup</h1>
      <Toaster />

    <Formik
      validationSchema={SignupSchema}
    >
      {({ errors, touched }) => (
        <Form onSubmit={formik.handleSubmit}>
      <Input
          type="organization"
          name="organization"
          label="Organization"
          placeholder="Enter Organization"
          labelPlacement="outside"
          value={formik.values.organization}
          onChange={(e)=> {   
            formik.handleChange(e);
            setOrganization(e.target.value?.split(' ').join('').toLowerCase())
          }}
        />
        <Input
          label="Email"
          name="email"
          onChange={ formik.handleChange}
          value={formik.values.email}
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
          value={formik.values.password}
          onChange={ formik.handleChange}
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