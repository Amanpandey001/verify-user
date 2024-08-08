"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
// import {useRouter} from 'next/router'

const Verify = () => {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)
    // const router = useRouter()

    const verifyUserEmail = async () => {
        try {
            const res = await axios.post("/api/user/verify", { token })
            setVerified(true)
            setError(false)
        } catch (error) {
            setError(true)
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const userToken = window.location.search.split("=")[1] // Split the URL to get the token
        // const {query} = router
        // const userToken = query.token
        setToken(userToken || "")
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className='bg-emerald-400 absolute top-0 z-10 w-full h-full'>
            <div className=' w-[70%] mx-auto flex items-center bg-teal-400 h-[70%] m-[7%] shadow-xl shadow-black rounded-xl flex-col'>
                <h1 className='text-3xl p-3 underline font-bold my-10'>Verify Email</h1>
                <h2 className='text-2xl p-3 underline font-bold my-2'>
                    {token ? `${token}` : "No token found"}
                </h2>
                <h2 className='text-2xl p-3 underline font-bold my-2'>
                    {verified && (
                        <div>
                            Email verified successfully.
                            <Link href="/login">Login</Link>
                        </div>
                    )}
                    {error && "Something went wrong. Please try again later."}
                </h2>
            </div>
        </div>
    )
}

export default Verify
