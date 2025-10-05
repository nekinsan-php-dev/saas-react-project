import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function GuestLayout() {
  return (
    <div>
        <header>
        <nav>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
        </header>

        <main>
            <Outlet/>
        </main>
        
    </div>
  )
}

export default GuestLayout