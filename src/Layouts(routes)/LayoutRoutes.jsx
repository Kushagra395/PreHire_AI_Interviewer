

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
import CreateEditPage from "@/Pages/CreateEditPage";
import EditMockInterview from "@/Pages/EditMockInterview";
import MainInterviewPage from "@/Pages/MainInterviewPage";
import StartInterviewQuestions from "@/Pages/StartInterviewQuestions";

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
        <Route path="/contact" element={<Contact />} />
        <Route path="/interviews" element={<Interview />} />
        <Route path="/interview/create" element={<CreateEditPage />} />
        <Route path="/interview/edit/:id" element={<EditMockInterview />} />
         <Route path="/interview/:id" element={< MainInterviewPage />} />
         <Route path="/interview/:id/start" element={< StartInterviewQuestions />} />
         


        
       </Route>
       

      </Routes>

    </Router>
  );
};

export default LayoutRoutes;
