

import LoginPage from "@/Pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import GeneralLayout from "./GeneralLayout";
import AuthLayout from "./AuthLayout";
import SignUpPage from "@/Pages/SignUpPage";
 
import ProtectedRoutes from "./ProtectedRoutes";
import About from "@/Pages/AboutPage";
import Apply from "@/Pages/ApplyPage";
import Interview from "@/Pages/TakeInterviewPage";
import Contact from "@/Pages/ContactPage";
import Home from "@/Pages/HomePage";
import HomeLayout from "./HomeLayout";

const LayoutRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* here there will be general layout */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
       </Route>
    

        {/* here there will layout when auth take place */}
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        {/* protected  routes here  */}
        <Route element={<ProtectedRoutes> <GeneralLayout></GeneralLayout></ProtectedRoutes>}>
        <Route path="/Apply" element={<Apply />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/contact" element={<Contact />} />
       </Route>

      </Routes>

    </Router>
  );
};

export default LayoutRoutes;
