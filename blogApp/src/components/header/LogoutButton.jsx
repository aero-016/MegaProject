import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutButton() {
  const navigate=useNavigate();
    const dispatch=useDispatch();
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout())
            navigate('/login')
        })
    }
  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:text-white rounded-full'
    onClick={logoutHandler}><h2 className="text-lg font-semibold">Logout</h2></button>
  )
}

export default LogoutButton