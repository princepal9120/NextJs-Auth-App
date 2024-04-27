'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function page() {
  const router=useRouter()
  const [user, setUser] = useState({
    email:"",
    password:""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const onLogin=async()=>{
    try {
      setLoading(true)
      const response= await axios.post("api/users/login",user)
      console.log("Login success", response.data)
      toast.success("Login success")
      router.push("/")
    } catch (error:any) {
      console.log("Login Failed", error.message)
      toast.error(error.message)
  
      
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => { 
    if(user.email.length && user.password.length){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }, [user])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-2'> 
    <h1>{loading?"processing":"login"}</h1>
    <label htmlFor="email"></label>
    <input className='p-2 border border-gray-300 rounded-lg mb-4
    focus:outline-none focus:border-red-1000 text-black' 
    type="email" id="email" placeholder='email' 
    value={user.email}
    onChange={(e)=>setUser({...user,email:e.target.value})} />
    <label htmlFor="password"></label>
    <input className='p-2 border border-gray-300 rounded-lg mb-4
    focus:outline-none focus:border-red-1000 text-black'
    placeholder='password' 
    value={user.password}
    onChange={(e)=>setUser({...user,password:e.target.value})}
     type="password" id="password" />


 <button className='p-3 border border-gray-800 rounded-lg mb-5 focus:outline-none
    focus:border-grey-100' onClick={onLogin}>{buttonDisabled?"fill the form":"Login"}</button>
    <Link href={"/signup"}>directed to SignuUp Page</Link>
    


    
     </div>


  )
}

export default page