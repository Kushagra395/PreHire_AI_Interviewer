import Footer from '@/components/footer'
import Header from '@/components/Header'
import AuthHandler from '@/Handlers/AuthHandler'
import React from 'react'
import { Outlet } from 'react-router'

const GeneralLayout = () => {
  return ( 
    <div className="w-full"> 
    <AuthHandler/>
     <Header />
     <Outlet/>
     <Footer/>
     </div>
  )
}

export default GeneralLayout
