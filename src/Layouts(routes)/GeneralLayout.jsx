import Footer from '@/components/ui/footer'
import Header from '@/components/ui/Header'
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
