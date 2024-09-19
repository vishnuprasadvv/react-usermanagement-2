import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify'

const EditUser = () => {
  
  const {id} = useParams();

  const [error, setError] = useState(null);
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate();

  useEffect(() => {

   const fetchUser = async()=> {
    try {
      const res = await axios.get('/api/admin/userslist/edit/' + id );
      setUsername(res.data.username)
      setEmail(res.data.email)
    } catch (error) {
      console.log(error?.res?.data || error.message)
    }
    }

    fetchUser();
   
  } ,[])

  const handleEditUser = async () => {
    
    try {
      const res = await axios.put('/api/admin/userslist/edit/' + id , {username, email})
      toast.success(res.data.message)
      navigate('/admin/dashboard')
    } catch (error) {
      toast.error(error?.res?.data || error.message)
    }
    
  }

  return (
    <div >
      <h1 className='text-3xl text-center font-bold my-7'>Edit User</h1>

      
      <div className='flex align-middle justify-center'>
      <div className=' text-center flex flex-col p-2 w-3/6'>
        
        <input
          type="text"
          className='bg-slate-100 p-3 rounded-lg m-1 '
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="email"
          className='bg-slate-100 p-3 rounded-lg m-1'
          value={email}
          onChange={ (e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button  className='bg-slate-700 text-white p-3 m-2
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
         onClick={handleEditUser}>Save changes</button>
      </div>

      </div>

    
    </div>
  )
}

export default EditUser