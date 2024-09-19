import React, { useEffect, useState } from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios';
import {toast} from 'react-toastify'


function SignUp() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  const {userInfo} = useSelector((state) => state.auth)

  useEffect(() => { 
    if(userInfo) {
      navigate('/profile')
    }
  },[navigate, userInfo]) 

  const submitHandler =async (e) =>{
    e.preventDefault();
    try {
      if(email.length ===0 ){
        setEmailError('Enter email')
      }else if(username.length === 0 ){
        setUsernameError('Enter username')
      }else{
        setEmailError('')
        setUsernameError('')
        const res = await axios.post('/api/users' ,{username, email,password})
        console.log(res.data)
        setError('')
        toast.success('new user registered successfully')
        navigate('/signin')
      }
    } catch (error) {
      toast.error(error?.response?.data || error.message)
      setError(error?.response?.data || error.message)
      setEmailError('')
    }
  }
  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign Up</h1>

      <form className='flex flex-col gap-4 ' 
      onSubmit={submitHandler} >

        <input type="text" placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
        id='username'  required
        className='bg-slate-100 p-3 rounded-lg'  />
        
        <input type="email" placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        id='email' required
        className='bg-slate-100 p-3 rounded-lg' />

        <input type="password" placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        id='password'  required
        className='bg-slate-100 p-3 rounded-lg' />

        <button  className='bg-slate-700 text-white p-3
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80' > Sign Up </button>

      </form>

      <div className='flex gap-2 mt-5'>
        <p className=''>Have an account?</p>
        <Link to='/signin'>
        <span className='text-blue-400'>Sign in</span>
        </Link>

      </div>
      { error &&
    <div className='mt-5'>
        <span className='text-red-700'> {error || 'Something went wrong'} </span>
      </div> }
      
    </div>
  )
}

export default SignUp