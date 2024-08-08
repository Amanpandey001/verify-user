"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
const Login = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [buttondis, setButtondis] = useState(false)
  const [loading, setLoading] = useState(false)
  const onLogin = async () => {

    try {
      setLoading(true)
      const res = await axios.post("/api/user/login", user);
      console.log("login success", res.data);
      router.push(`/profile`);
      toast.success("user created successfully")
    } catch (error) {
      console.log("error occured~");
      toast.error(error.message);
    }
  }
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 6) {
      setButtondis(false)
    } else {
      setButtondis(true)
    }
  }, [user])
  return (
    <div className='text-black flex flex-col items-center gap-4 p-4 h-[80vh] w-[70%] mx-auto my-10 bg-emerald-300 rounded-xl shadow-2xl shadow-black'>
      <>{loading && <div className='loader'></div>}</>
      <h1 className='text-4xl font-bold text-center '>Login</h1>
      <div className=' flex flex-col items-end gap-5 p-3 my-5'>
        <div>
          <label htmlFor="email" className='text-xl font-semibold'>Email: </label>
          <input type="email" name="email" value={user.email} required onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='Email' className='px-4 py-2 text-white bg-black bg-opacity-25 placeholder:text-gray-300' autoComplete='off' id="email" />
          <p className='text-xs text-end text-red-400 leading-normal my-6'></p>
        </div>
        <div>
          <label htmlFor="password" className='text-xl font-semibold'>Password: </label>
          <input type="password" name="password" value={user.password} required onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='Password' className='px-4 py-2 text-white bg-black bg-opacity-25 placeholder:text-gray-300' autoComplete='off' id="password" />
          <p className='text-xs text-end text-red-400 leading-normal'>*password should be atleast 7 characters</p>

        </div>
        <div className='w-full flex justify-center'><button disabled={buttondis} onClick={onLogin} className='px-3 py-1 bg-emerald-500 font-bold shadow-lg disabled:bg-emerald-200 disabled:scale-100 disabled:shadow-none hover:scale-110 disabled:text-gray-400 shadow-black transition-all duration-150'>Signup</button></div>
      </div>
      <Link href="/signup" className='text-xl font-semibold'> Don't have an account? Signup</Link>
    </div>
  )
}

export default Login
