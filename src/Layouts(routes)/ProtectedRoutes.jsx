import React from 'react'
import { useAuth } from '@clerk/clerk-react';
import LoaderPage from '@/Pages/LoaderPage';
import { Navigate } from 'react-router';




const ProtectedRoutes = ({children}) => {
    const { isSignedIn,isLoaded } = useAuth();
 

  if(!isLoaded){
     return  <LoaderPage/>
    };
 
    if(!isSignedIn){
      return <Navigate to="/signin"  replace/>
    }  ;
    
 return  children;

     
  
}

export default ProtectedRoutes
