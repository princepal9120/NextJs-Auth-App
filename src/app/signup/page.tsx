'use client'

import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const [user, setUser] = useState({
    email:"",
    password:"",
    username:""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const router=useRouter()
const onSignup=async()=>{
  try {
    setLoading(true);
    const response =await axios.post("/api/users/signup",user)
    console.log("SignUp success", response.data);
    router.push("/login")
  } catch (error:any) {
    log.error("SignUp error", error.message);
    toast.error(error.message)
    
  }
}

  return (
    <div>signup page</div>
  )
}

