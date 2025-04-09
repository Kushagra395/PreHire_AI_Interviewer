import React from 'react';
import { Outlet } from 'react-router';
import video from '../assets/AuthBg.mp4';

const AuthLayout = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden p-0 m-0">
      {/* Video: Removed blur-xs, added min-w/min-h to force full coverage */}
      <video
        autoPlay
        loop
        muted
        className="absolute min-w-full min-h-full w-auto h-auto object-cover top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-"
      >
        <source src={video} type="video/mp4" />
      </video>
      
      {/* Dark overlay */}
      <div className="absolute inset-0  bg-opacity-50">
         
      </div>
      
      {/* Content */}
      <div className="relative w-full h-full flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;