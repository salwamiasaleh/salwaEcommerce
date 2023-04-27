import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import NavbarUpdated from '../Navbar/NavbarUpdated'

export default function Layout({userdata,logout}) {
  return (
    <>
     <Navbar userdata={userdata} logout={logout}/> 
 <div className="container">
      <Outlet/>
    </div>
    </>
  )
}
