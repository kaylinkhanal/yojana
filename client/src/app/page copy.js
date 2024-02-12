"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, {useState, useEffect} from 'react'

const page = () => {
const router = useRouter()
  const [userList, setUserList] = useState([])
  const fetchUser = async()=> {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
    setUserList(data.userList)
  }
  useEffect(()=>{
    fetchUser()
  },[])

  const handleClick =(id)=> {
    router.push('/users/'+id)
  }
  return (
    <div className='flex'>
      {userList.map((item,id)=>{
        return <div onClick={()=>handleClick(item._id)} className='m-3 p-3 bg-red-100 border-4 w-72'>
          <p>{item.email}</p>
          {item.fullName}
          </div>
      })}
    </div>
  )
}

export default page