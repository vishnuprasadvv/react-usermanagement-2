import React, { useEffect, useState } from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

function SignIn() {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [inputError, setInputError] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state) => state.auth)

  useEffect(() => { 
    if(userInfo) {
      navigate('/profile')
    }
  },[navigate, userInfo]) 

  //handle input changes 
  const handleChange= (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
    setInputError({...inputError, [e.target.name] : ''})
  }

  const validatForm = () => {
    let isValid = true;
    let tempErrors = {...inputError};

    // email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(formData.email)){
      tempErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if(formData.password.length < 6){
      tempErrors.password = 'Password length must be 6 characters long';
      isValid = false;
    }

    setInputError(tempErrors);
    return isValid;
  }

  const submitHandler =async (e) =>{
    e.preventDefault();
    try {
       if(validatForm()){
        const res = await axios.post('/api/users/auth' ,formData)
        console.log(res.data)
        dispatch(setCredentials(res.data))
        setError('')
        toast.success('Login success')
        navigate('/profile')
       }
        
      
    } catch (error) {
      toast.error(error.response.data)
      setError(error.response.data)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign In</h1>

      <form className='flex flex-col gap-4 ' 
      onSubmit={submitHandler} >

        <input type="email" placeholder='Email'
        onChange={handleChange}
        id='email'
        name='email'
        value={formData.email}
        className='bg-slate-100 p-3 rounded-lg'
        required
         />
        {inputError.email && <p style={{ color: 'red' }}>{inputError.email}</p>}

        <input type="password" placeholder='Password'
        onChange={handleChange}
        id='password' 
        name='password'
        value={formData.password}
        className='bg-slate-100 p-3 rounded-lg'
        required />
         {inputError.password && <p style={{ color: 'red' }}>{inputError.password}</p>}

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