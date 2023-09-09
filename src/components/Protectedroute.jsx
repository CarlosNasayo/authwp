import React from 'react'
import { useAuth } from '../context/authcontext'
import { Navigate } from 'react-router-dom'
export default function Protectedroute({children}) {
    const {user,loading} =useAuth()
    if(loading) return <h1>loading</h1>
    if(!user) return <Navigate to='/login'/>
  return <>{children}</>
    
  
}
