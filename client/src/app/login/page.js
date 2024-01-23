'use client'
import React , {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import FormSection from '@/components/formSection/page'
import { CiMail } from "react-icons/ci";
import {Dropdown,Input, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/reducerSlices/userSlice'


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


const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password:''
    },
    validationSchema:SignupSchema,
    onSubmit: values => {
      debugger;
      handleLogin(values);
      formik.resetForm()
    }
  });
  const handleLogin = async(inputFields)=>{
    try{
      const res = await fetch('http://localhost:5000/login/',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inputFields)
      })
      const data = await res.json()
      if(res.status == 201){
        dispatch(loginUser(data))
        router.push('/dashboard')
      }
      toast( data.msg,
          {
            icon: res.status == 201 ? '✅' : '❌',
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
    <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
        
        <Input
        id="email"
          label="Email"
          name="email"
          onChange={ formik.handleChange}
          value={formik.values.email}
          placeholder="Enter Email"
          labelPlacement="outside"
        />
       {formik?.errors.email}
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
       {formik?.errors.password}
          <br/>
          <Button  type="submit" color="primary" variant="flat">
        Login
      </Button>  
        </form>
  </FormSection>
)}

export default Login


