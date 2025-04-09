import Footer from "@/components/ui/footer";
import Header from "@/components/ui/Header";
import Homepage from "@/Pages/Homepage";
import LoginPage from "@/Pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import GeneralLayout from "./GeneralLayout";
import AuthLayout from "./AuthLayout";
import SignUpPage from "@/Pages/SignUpPage";
import LoaderPage from "@/Pages/LoaderPage";

const LayoutRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* here there will be general layout */}
        <Route element={<GeneralLayout />}>
          <Route path="/" element={<Homepage />} />
        </Route>

        {/* here there will layout when auth take place */}
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        {/* protected  routes here  */}
        <Route element={<ProtectedRoutes />}>
        
        
        </Route>

      </Routes>

    </Router>
  );
};

export default LayoutRoutes;
