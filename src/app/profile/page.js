"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const Profile = () => {
  const router = useRouter()
  const [data, setData] = useState()

  const getUserDetails = async () => {
    try {
      const res = await axios.post('/api/user/me')
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }

  }
  const logOut = async () => {
    try {
      await axios.get('/api/user/logout')
      toast.success('user logged out successfully')
      router.push('/login')
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])
  return (
    <div className='bg-teal-300 rounded-xl flex flex-col gap-10 shadow-xl p-4 shadow-black w-[70%] mx-auto my-[10vh] h-[70vh]'>
      <h1 className='text-3xl font-bold text-center'>Profile</h1>
      <div className='flex justify-center my-5'>
        <span>{data === undefined ? 'loading...' : <div className='text-center text-xl font-semibold'>Logged In Successfully <Link className='underline' href={'/profile/[username]'} as={`/profile/${data.data.username}?id=${data.data._id}`}>
          Click here to visit Profile
        </Link>
        </div>}</span>
      </div>
      <div className='flex justify-center my-5'>
        <button className='bg-red-500 text-white p-2 rounded shadow-black shadow-lg ' onClick={logOut}>Logout</button>
      </div>
    </div>
  )
}

export default Profile
