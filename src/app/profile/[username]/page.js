
import React from 'react'

const Page = ({params}) => {

  return (
    <div className='bg-teal-300 rounded-xl shadow-xl shadow-black w-[80%] h-[80vh] mx-auto my-[5vh] p-4'>
      <h1 className='text-3xl font-bold text-center my-10'>Profile Page</h1>
      <div className=" h-[70%] flex flex-col items-center">
        <span className='text-3xl text-center'>{params.username}</span>
      </div>
    </div>
  )
}

export default Page;
