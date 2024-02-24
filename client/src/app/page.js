"use client";
import React, { useEffect, useState} from "react";
import Footer from "@/components/footer/page";
import Navbar from "@/components/navbar/page";
import Image from "next/image";
import Link from "next/link";
import { io } from "socket.io-client";
import { Button } from "@nextui-org/react";
import { useRef } from "react";
import { useSelector } from "react-redux";
const socket = io("http://localhost:8080/");


const userList = ['kaylin2', 'test', 'ram']
export default function App() {
  const [selectedReceiver, setSelectedReceiver] = useState('')
  const {userDetails} = useSelector(state=>state.user)
  const [chat, setChat] = useState({})
  const inputRef = useRef()
  useEffect(()=>{
  socket.on('connection')
  socket.on('chatInfo',(chatInfo)=>{
    setChat(chatInfo)
  })
  },[])

  const sendChat = ()=> {
   const chatInfo ={receiver: selectedReceiver, sender:userDetails.fullName, msg: inputRef.current.value}
    socket.emit('chatInfo',chatInfo)
  }
  return (
    <>
    {userList.map((item)=><div onClick={()=>setSelectedReceiver(item)} className="bg-teal-100 p-2 m-2 border border-black">{item}</div>)}
    {JSON.stringify(chat)}
   <div className="bg-pink-200 m-2 p-2 border border-black">
    {selectedReceiver}
        <input ref={inputRef} placeholder="enter chat msg"/>
     <Button onClick={sendChat}>Send</Button>
   </div>

    </>
  );
}
