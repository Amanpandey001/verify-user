import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='border-b-2 rounded-b-xl border-black flex justify-between items-center p-4 font-bold'>
      <h1 className='text-3xl mx-10 cursor-default'>ICON</h1>
      <ul className='flex gap-5 text-xl mx-10 cursor-pointer'>
        <Link href="/"><li className='hover:scale-110 transition-all duration-150'>Home</li></Link>
        <Link href="/signup"><li className='hover:scale-110 transition-all duration-150'>SignUp</li></Link>
        <Link href="/login"><li className='hover:scale-110 transition-all duration-150'>Login</li></Link>
      </ul>
    </nav>
  )
}

export default Navbar
