import React from 'react'
import Header from './components/Header'
import HomeScreen from './pages/HomeScreen'
import { Outlet } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import PrivateRoute from './components/PrivateRoute'
import PrivateAdminRoute from './components/PrivateAdminRoute'
import EditUser from './pages/EditUser'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <BrowserRouter>

    <Header />
    <ToastContainer />
    <Routes>

      <Route path='/' element ={<HomeScreen/>}/>
      <Route path='/signin' element ={<SignIn/>}/>
      <Route path='/signup' element ={<SignUp/>}/>
      
      <Route path= '' element = {<PrivateRoute />} >
        <Route path='/profile' element ={<Profile/>}/>
      </Route>

      <Route path='/admin/login' element ={<AdminLogin/>}/>
      <Route path='' element ={<PrivateAdminRoute />} >
        <Route path='/admin/dashboard' element ={<AdminDashboard/>}/>
        <Route path ="/admin/userslist/edit/:id" element={<EditUser />} />
      </Route>
    </Routes>

    </BrowserRouter>
  )
}

export default App