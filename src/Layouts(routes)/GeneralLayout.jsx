import Footer from '@/components/ui/footer'
import Header from '@/components/ui/Header'
import React from 'react'
import { Outlet } from 'react-router'

const GeneralLayout = () => {
  return ( 
    <div className="w-full"> 
     <Header />
     <Outlet/>
     <Footer/>
     </div>
  )
}

export default GeneralLayout
