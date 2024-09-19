import React, { useEffect, useState } from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

function SignIn() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const dispatch = useDispatch();
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
      }else{
        setEmailError('')
        const res = await axios.post('/api/users/auth' ,{email,password})
        console.log(res.data)
        dispatch(setCredentials(res.data))
        setError('')
        toast.success('Login success')
        navigate('/profile')
      }
    } catch (error) {
      toast.error(error.response.data)
      setError(error.response.data)
      setEmailError('')
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign In</h1>

      <form className='flex flex-col gap-4 ' 
      onSubmit={submitHandler} >

        <input type="email" placeholder='Email'
        onChange={(e)=> setEmail(e.target.value)}
        id='email'
        className='bg-slate-100 p-3 rounded-lg'
         />
        {emailError &&  <span className='text-red-700'>{  emailError}</span> }

        <input type="password" placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        id='password' 
        className='bg-slate-100 p-3 rounded-lg'
        required />

        <button  className='bg-slate-700 text-white p-3
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80' > Sign In</button>

      </form>

      <div className='flex gap-2 mt-5'>
        <p className=''>Don't have an account? Go to </p>
        <Link to='/signup'>
        <span className='text-blue-400'>Sign Up</span>
        </Link>

      </div>
    <div className='mt-5'>
        <span className='text-red-700'>{ error.length > 0 ? error || 'Something went wrong!' : ''}</span>
      </div>
      
    </div>
  )
}

export default SignIn