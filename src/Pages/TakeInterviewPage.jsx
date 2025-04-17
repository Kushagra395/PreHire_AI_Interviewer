import { Button } from '@/components/button'
import HeaderInterview from '@/components/HeaderInterview'
import { Separator } from "@/components/ui/separator"
import { useAuth } from '@clerk/clerk-react'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

const Interview = () => {
  const [interview,setinterview]= useState([])
  const [loading,setloading]=useState(false);
  const {userId}= useAuth();

  useEffect(()=>{
    const 
  })
  return (
    <> 
    <div className='flex w-full p-3 items-center justify-between'>
      <HeaderInterview 
      title="Dashboard"
      description="Create and Start your AI-Powered Interviews"
      />
      <Link to="/interview/create">
      <Button className={"bg-black m-2 hover:bg-violet-950 rounded-xl p-4 text-white"}><Plus/> Add Interview</Button></Link>
      
    </div>
   <Separator className="my-2"/>
    </>
     
  )
}

export default Interview
