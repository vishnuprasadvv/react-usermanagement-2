import React, { useEffect, useState } from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios';
import {toast} from 'react-toastify'


function SignUp() {

  const navigate = useNavigate();
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password : ''
  })
  const [inputError, setInputError] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password : ''
  })

  const {userInfo} = useSelector((state) => state.auth)

  useEffect(() => { 
    if(userInfo) {
      navigate('/profile')
    }
  },[navigate, userInfo]) 



  const handleChange =(e) => {
    setFormData({...formData, [e.target.id] :e.target.value })
    //remove error on input
   setInputError({...inputError, [e.target.name] : ''})
   
  }

  const validatForm = () => {
    let isValid = true;
    let tempErrors = {...inputError};
    
    //username 
    if(formData.username.trim().length < 3){
      tempErrors.username = 'Username must be atleast 3 characters long';
      isValid = false;
    }

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

    if(formData.password !== formData.confirm_password){
      tempErrors.confirm_password = 'Password do not match';
      isValid = false;
    }
    setInputError(tempErrors);
    return isValid;
  }

  const submitHandler =async (e) =>{
    e.preventDefault();
    
    try {
      if(validatForm()){
        
        const res = await axios.post('/api/users' ,formData)
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
        onChange={handleChange}
        name='username'
        value={formData.username}
        id='username'  required
        className='bg-slate-100 p-3 rounded-lg'  />
        {inputError.username && <p style={{ color: 'red' }}>{inputError.username}</p>}
        
        <input type="email" placeholder='Email'
        onChange={handleChange}
        name='email'
        value={formData.email}
        id='email' required
        className='bg-slate-100 p-3 rounded-lg' />
        {inputError.email && <p style={{ color: 'red' }}>{inputError.email}</p>}

        <input type="password" placeholder='Password'
        onChange={handleChange}
        name='password'
        value={formData.password}
        id='password'  required
        className='bg-slate-100 p-3 rounded-lg' />
        {inputError.password && <p style={{ color: 'red' }}>{inputError.password}</p>}

        <input type="password" placeholder='Confirm Password'
        onChange={handleChange}
        name='confirm_password'
        value={formData.confirm_password}
        id='confirm_password'  required
        className='bg-slate-100 p-3 rounded-lg' />
        {inputError.confirm_password && <p style={{ color: 'red' }}>{inputError.confirm_password}</p>}

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