import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { AuthProvider } from "./service/authContext";
import LoginScreen from "./components/Auth/Login";
import RestrictedRoute from "./components/routes/RestrictedRoutes";
import SignUpScreen from "./components/Auth/SignUp";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import NewConsultation from "./components/NewConsultation/NewConsultationContent";
import SecondOpinionContent from "./components/SecondOpinion/SecondOpinionContent";
import FreeOpinionContent from "./components/FreeOpinion/FreeOpinionContent";
import "react-datepicker/dist/react-datepicker.css";
import InternationalOpinionContent from "./components/InternationalOpinion/InternationalOpinionContent";
import HomeCareContent from "./components/HomeCare/HomeCareContent";
import RTPCRContent from "./components/RT-PCR/RTPCRContent";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
            <Route path="/log-in" element={<RestrictedRoute><LoginScreen/></RestrictedRoute>} />
            <Route path="/sign-up" element={<RestrictedRoute><SignUpScreen/></RestrictedRoute>} />
            <Route path="/" element={<Dashboard />} />
            <Route element={<Layout />} >
              <Route path="/new-consultation" element={<NewConsultation />} />
              <Route path="/second-opinion" element={<SecondOpinionContent />} />
              <Route path="/free-opinion" element={<FreeOpinionContent />} />
              <Route path="/international-opinion" element={<InternationalOpinionContent />} />
              <Route path="/home-care-services" element={<HomeCareContent />} />
              <Route path="/rt-pcr" element={<RTPCRContent />} />
              <Route path="/teleconsultation" element={<RTPCRContent />} />
              <Route path="/doctor-home-visit" element={<RTPCRContent />} />
              <Route path="/physiotherapy" element={<RTPCRContent />} />
              <Route path="/nursing-service" element={<RTPCRContent />} />
            </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
