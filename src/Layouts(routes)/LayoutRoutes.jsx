import Footer from "@/components/ui/footer";
import Header from "@/components/ui/Header";
import Homepage from "@/Pages/Homepage";
import LoginPage from "@/Pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import GeneralLayout from "./GeneralLayout";
import AuthLayout from "./AuthLayout";
import SignUpPage from "@/Pages/SignUpPage";
import LoaderPage from "@/Pages/LoaderPage";
import ProtectedRoutes from "./ProtectedRoutes";
import About from "@/Pages/About";
import Apply from "@/Pages/Apply";
import Interview from "@/Pages/Interview";
import Contact from "@/Pages/Contact";

const LayoutRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* here there will be general layout */}
        <Route element={<GeneralLayout />}>
          <Route path="/" element={<Homepage />} />
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
