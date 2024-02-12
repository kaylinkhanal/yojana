'use client'
import axios from 'axios'
import React, { useEffect,useState } from 'react'

const page = ({params}) => {
  const [ userDetails , setUserDetails] = useState([])
  const fetchUser = async()=> {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`+params.id)
    setUserDetails(data.userDetails)
  }
  useEffect(()=>{
    fetchUser()
  },[])
  return (
    <div>
      {userDetails.password}
      <p>
        {userDetails.fullName}
      </p>
      {userDetails.email}
      </div>
  )
}

export default page