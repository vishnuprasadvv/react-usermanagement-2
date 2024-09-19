import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { logout ,setCredentials} from '../redux/slices/authSlice'
import { toast } from 'react-toastify'

function Profile() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userInfo} = useSelector((state)=>state.auth)

  const [image, setImage] = useState(undefined)


  const handleLogout = async() =>{
    try {
      const res = await axios.post('/api/users/logout');
      dispatch(logout())
      toast.success('Logout successful!')
    } catch (error) {
      console.log(error.response?.data || error.message)
      toast.error(error.response?.data || error.message)
    }

  }

  const handleUploadImage = async(e)=>{
    e.preventDefault();
    
    try {
      if(image){
        const res = await axios.put('api/users/profile/upload' ,{profileImage:image},{
          headers:{"Content-Type" : "multipart/form-data"}
        })
        console.log(res.data.data)
        dispatch(setCredentials(res.data.data))

        toast.success(res.data.message)
      }else{
        toast.error('Please select an image')
      }
      
    } catch (error) {
      console.log(error?.response?.data || error.message)
      toast.error(error?.response?.data || error.message)
    }

}
  return (
    <>
      <div>
        <h1 className='text-3xl font-bold text-center p-4 mb-5'>Profile</h1>
        <div className='flex flex-col'>
          <img src={userInfo ? `http://localhost:8000${userInfo.profileImage}` : ''} 
          alt=""
          className='w-24 h-24 rounded-full self-center
          cursor-pointer object-cover'/>
          

        </div>
        <div className='flex flex-col text-center p-5 '>
          <span className='p-3 text-2xl'>Username : {userInfo ? userInfo.username : 'NA'} </span>
          <span className='p-3 text-2xl' >Email : {userInfo ? userInfo.email : 'NA'} </span>
          <div className='flex flex-row justify-center p-4'>
            <form action="" className='flex flex-col' onSubmit={handleUploadImage} >
            <input type="file" accept='image/*'
            onChange={(e) => setImage(e.target.files[0])}
            className='p-4'/>
            <div className='bg-slate-700 text-white h-10 flex align-middle justify-center rounded-lg  hover:opacity-90'>
                <button type="submit">Upload Profile Image</button>
            </div>
            </form>
          </div>
          <div className='flex justify-center'>
            <button className='text-white bg-red-500 p-3 rounded-full flex items-center
             justify-center hover:opacity-90' 
             onClick={handleLogout}
             >signout</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile