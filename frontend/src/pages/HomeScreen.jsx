import React from 'react'
import { Link } from 'react-router-dom'

const HomeScreen = () => {
  return (
    <>
    <h1 className='text-3xl text-center font-bold my-7'>Home</h1>

    <div className='p-3 max-w-lg mx-auto' >
      <div className='flex flex-col gap-4 ' >

    <Link to='/signin'  className='bg-slate-700 text-white p-3
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80 text-center ' >User Login </Link>
    <Link to='/admin/login'  className='bg-slate-700 text-white p-3
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80 text-center' >Admin Login</Link>
    </div>
    </div>
    </>
  )
}

export default HomeScreen