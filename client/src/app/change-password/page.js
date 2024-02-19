'use client'
import React from 'react'
import { Card, CardBody } from "@nextui-org/react";
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import FormSection from '@/components/formSection/page'
import { Input, Button } from "@nextui-org/react";
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/redux/reducerSlices/userSlice';
import { useRouter } from 'next/navigation';

const changePasswordSchema = Yup.object().shape({

    currentPassword: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('please enter current password'),
    newPassword: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('please enter new password'),
    confirmNewPassword: Yup.string()
        .required('please retype your new password')
        .oneOf([Yup.ref('newPassword')], "password doesnot match")
});
const page = () => {
    const {userDetails}= useSelector(state=>state.user)
    const {_id} = userDetails
    const router = useRouter()
    const dispatch = useDispatch()

    const handlePasswordChanges = async (inputChanges) => {
        try {
            const res = await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/change-password`, inputChanges)
            const data = await res.data

            toast(data.check ? `${data.msg}, please login! `: data.msg,
                {
                    icon: data.check ? '✅' : '❌',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );

            if (data.check) {
                //after successful password change it will logout and will redirect to login page.
                dispatch(logoutUser())
                router.push('/login')
            }

        } catch (err) {
            console.log(err)
        }
    }
    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        },
        validationSchema: changePasswordSchema,
        onSubmit: values => {
            values.id= _id
            handlePasswordChanges(values);
            formik.resetForm()
        }

    });
    return (
        <>
            <Card className='max-w-lg mx-auto my-16'>
                <CardBody>
                    <FormSection>
                        <p className="text-xl font-semibold mb-5">Change Password</p>
                        <form onSubmit={formik.handleSubmit} >
                            <div className='flex flex-col gap-3'>
                                <Input
                                    type="password"
                                    name="currentPassword"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    placeholder="current password"
                                    labelPlacement="outside"
                                />
                                {formik?.errors.currentPassword}

                                <Input
                                    type="password"
                                    name="newPassword"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    placeholder="new password"
                                    labelPlacement="outside"
                                />
                                {formik?.errors.newPassword}

                                <Input
                                    type="password"
                                    name="confirmNewPassword"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    placeholder="retype your new password"
                                    labelPlacement="outside"
                                />
                                {formik?.errors.confirmNewPassword}
                            </div>
                            <br />
                            <Button type="submit" color="primary" variant="flat">
                                Save Changes
                            </Button>
                        </form>
                    </FormSection>
                </CardBody>
            </Card>
        </>
    )
}

export default page