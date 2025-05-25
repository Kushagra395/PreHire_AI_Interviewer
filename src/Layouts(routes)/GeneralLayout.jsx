import Footer from '@/components/footer'
import Header from '@/components/Header'
import AuthHandler from '@/Handlers/AuthHandler'
import React from 'react'
import { Outlet } from 'react-router'

const GeneralLayout = () => {
  return ( 
    <div className="flex flex-col min-h-screen"> 
      <AuthHandler/>
      <Header />
      <main className="flex-grow">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default GeneralLayout