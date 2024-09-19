import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector ,useDispatch } from 'react-redux';
import { useNavigate ,Link } from 'react-router-dom';
import { adminLogout } from '../redux/slices/authSlice';
import { toast } from 'react-toastify'

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
  const {adminInfo} = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  


  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        
        const response = await axios.get('/api/admin/userslist');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.response ? err.response.data.message : 'Error occurred');
        console.log(err.response ? err.response.data.message : 'Error occurred')
      }
    };
    fetchUsers();
  }, [ searchTerm ==='']);

  // Search users
  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
   try{
      const response = await axios.get(`/api/admin/userslist?search=${searchTerm}`);
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response ? err.response.data.message : 'Error occurred');
    }
  };

  // Add a new user
  const handleCreateUser = async () => {
    try {
      
     const res = await axios.post('/api/admin/userslist/create', newUser);
      setNewUser({ username: '', email: '', password: '' });
      // Refetch the users after creation
      setUsers([...users, res.data.data]);

      toast.success(res.data.message)
    } catch (err) {
      console.log(err.response ? err.response.data.message : 'Error occurred');
      toast.error(err.response ? err.response.data.message : 'Error occurred');
    }
  };

  // Delete a user
  const handleDeleteUser = async (id) => {
    try {
     
      await axios.delete(`/api/admin/userslist/delete/${id}` );
      setUsers(users.filter((user) => user._id !== id));
      toast.success('user deleted successfully')
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Error occurred');
    }
  };


  const handleSignout = async()=>{

    try {
      const res = await axios.post ('/api/admin/logout')
    console.log(res.data)
    dispatch(adminLogout())
    toast.success('admin logout sucessfully')
    navigate ('/admin/login')
    } catch (error) {
      console.log(error?.res?.data || error.message)
      toast.error(error?.res?.data || error.message)
    }
    
  }
  return (
    <div >
      <h1 className='text-3xl text-center font-bold my-7'>Admin Dashboard</h1>

      <div className='flex justify-center pb-5 mb-5'>
      <button className='text-white bg-red-500 p-3 rounded-lg flex items-center
             justify-center hover:opacity-90' onClick={handleSignout} >Signout</button>
             </div>
      
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div className='text-center' >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
           className='bg-slate-100 p-3 rounded-lg'
        />
        <button onClick={handleSearch} 
        className='bg-slate-700 text-white p-3 m-2
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80 '>Search</button>
      </div>

      <div className='flex align-middle justify-center'>
      <div className=' text-center flex flex-col p-2 w-3/6'>
        <h3 className='text-xl'>Create User</h3>
        <input
          type="text"
          className='bg-slate-100 p-3 rounded-lg m-1 '
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          placeholder="Username"
        />
        <input
          type="email"
          className='bg-slate-100 p-3 rounded-lg m-1'
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="password"
          className='bg-slate-100 p-3 rounded-lg m-1'
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          placeholder="Password"
        />
        <button  className='bg-slate-700 text-white p-3 m-2
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
         onClick={handleCreateUser}>Create User</button>
      </div>

      </div>

      <h3 className='text-xl text-center'>Users List</h3>
      <div className='flex justify-center align-middle'>

      {users.length > 0 ? (
        <table className='m-2'>
          <thead className='bg-slate-200'>
            <tr >
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-slate-100'>
            {users.map((user) => (
              <tr key={user._id }>
                <td className='p-4'>{user.username}</td>
                <td className='p-4'>{user.email}</td>
                <td className='p-4'>

                  <div className='flex '>
                  <button 
                  className=' bg-slate-700 text-xs text-white p-3 m-2 h-5 w-12
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80 flex items-center justify-center'
                   onClick={() => handleDeleteUser(user._id)}>Delete</button>
                  <Link to={`/admin/userslist/edit/${user._id}` }
                  className=' bg-slate-700 text-xs text-white p-3 m-2 h-5 w-12
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80 flex items-center justify-center' 
                  >Edit</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
      </div>
    </div>
  );
};

export default AdminDashboard;
