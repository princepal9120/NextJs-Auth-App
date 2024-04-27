'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
 const router=useRouter()
 const [data, setData] = React.useState("nothing")
 const logout= async()=>{
   try {
    await axios.get('/api/users/logout')
    toast.success("Logout Successful")
    router.push('/login')
   } catch (error:any) {
    console.log(error.message)
    toast.error(error.message)
   }
    
   }
   const getUserDetails= async ()=>{
    const res=await axios.get('/api/users/me')
    console.log(res.data.data._id)
    setData(res.data.data._id)
   }
  return (
    <div className='flex flex-col items-center justify-center max-h-screen py-2'>
        <h1>Profile</h1>
        <hr />
        <p>Profile Page</p>
        <h2>{data=== 'nothing'?"nothign":
           <Link href={`/profile/${data}`}>{data}</Link> }</h2>
  
        <button onClick={logout}
        className='bg-red-900 mt-4 hover:bg-red-400 text-wrap font-bold px-4 rounded-lg'
        >Logout</button>
        <button    className='bg-green-900 mt-4 hover:bg-green-400 text-wrap font-bold px-4 rounded-lg'
        onClick={getUserDetails}
        >Get User Details</button>
        </div>
  )
}

