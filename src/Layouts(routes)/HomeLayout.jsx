import React from 'react'
import Footer from '@/components/footer'
import Header from '@/components/Header'
import AuthHandler from '@/Handlers/AuthHandler'

import { Outlet } from 'react-router'

const HomeLayout = () => {
  return (
    <div className="w-full"> 
    
     <Header />
     <Outlet/>
     <Footer/>
     </div>
  )
}

export default HomeLayout
 