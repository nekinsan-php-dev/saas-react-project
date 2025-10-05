import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {
    const {user,loading} = useAuth();

    if(loading) return <div>Loading...</div>

  return user ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes