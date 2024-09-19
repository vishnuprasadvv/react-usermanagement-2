import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux' 


function Header() {

  const location = useLocation();
  
  const isAdminPage = location.pathname.startsWith('/admin')

  const {userInfo , adminInfo} = useSelector((state) => state.auth)


  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center 
        max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <h1 className='font-bold'>user-management-App</h1>
            </Link>
            <ul className="flex gap-4">
             
                
               { !isAdminPage ?
               ( userInfo ? (
                <Link to='/profile'>
                <li> {userInfo.username}</li>
                </Link>
               ) : (
                <Link to= '/signin'>
                  <li>Sign-In</li>
                </Link>
               )
              ) :
              (
                adminInfo ? (
                  <Link to='/admin/dashboard'>
                  <li> {adminInfo.name}</li>
                  </Link>
                 ) : (
                  <Link to= '/admin/login'>
                    <li>Sign-In</li>
                  </Link>
                )
              )
               }
              
              
                
               
               
            </ul>
        </div>
    </div>
  )
}

export default Header