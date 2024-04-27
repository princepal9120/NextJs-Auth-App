'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignUpPage() {
  const [user, setUser] = useState({
    email:"",
    password:"",
    username:""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const router=useRouter()
const onSignUp=async()=>{
  try {
    setLoading(true);
    const response =await axios.post("/api/users/signup",user)
    console.log("SignUp success", response.data);
    router.push("/login")
  } catch (error:any) {
    console.error("SignUp error", error.message);
    toast.error(error.message)
    
  }finally{
    setLoading(false)
  }
}
useEffect(() => {
  if(user.username.length>0 && user.email.length>0 && user.password.length>0){
    setButtonDisabled(true);
  }else{
    setButtonDisabled(false);
  }


}, [user])


  return (
   <div className='flex flex-col items-center justify-center min-h-screen'>
    <h1>{loading?"processing":"signing"}</h1>
    <label htmlFor="username">username</label>
    <input
    className='p-2 border border-gray-300 rounded-lg mb-4
    focus:outline-none focus:border-red-1000 text-black'
    id='username'
    type="text" 
    value={user.username}
    onChange={(e)=>setUser({...user, username:e.target.value})}
    placeholder='username'
    />
    <label htmlFor="email">email</label>
    <input className='p-2 border border-gray-300 rounded-lg mb-4
    focus:outline-none focus:border-red-1000 text-black'
    id='email'
    type="email" 
    value={user.email}
    onChange={(e)=>setUser({...user, email:e.target.value})}
    placeholder='email'/>
    <label htmlFor="password">password</label>
    <input  className='p-2 border border-gray-300 rounded-lg mb-4
    focus:outline-none focus:border-red-1000 text-black'
    id='password'
    type="password" 
    value={user.password}
    onChange={(e)=>setUser({...user, password:e.target.value})}
    placeholder='username' />
    <button className='p-3 border border-gray-800 rounded-lg mb-5 focus:outline-none
    focus:border-grey-100' onClick={onSignUp}>{!buttonDisabled?"fill the form":"SignUp"}</button>
    <Link href={"/login"}>directed to login Page</Link>
   </div>
  )
}

