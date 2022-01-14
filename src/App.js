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
import TeleConsultationContent from "./components/TeleConsultation/TeleConsultationContent";
import DoctorVisitContent from "./components/DoctorVisit/DoctorVisitContent";
import PhysioTherapyContent from "./components/PhysioTherapy/PhysioTherapyContent";
import NurseServiceContent from "./components/Nurse/NurseServiceContent";
import LabTestContent from "./components/LabTest/LabTestContent";
import PharmacyContent from "./components/Pharmacy/PharmacyContent";
import DiagnosticContent from "./components/Diagnostic/DiagnosticContent";
import XRayContent from "./components/XRay/XRayContent";
import MammogramContent from "./components/Mammogram/MammogramContent";
import CTScanContent from "./components/CTScan/CTScanContent";
import MRIContent from "./components/MRI/MRIContent";
import UltraSoundContent from "./components/Ultrasound/UltraSoundContent";
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
              <Route path="/teleconsultation" element={<TeleConsultationContent />} />
              <Route path="/doctor-home-visit" element={<DoctorVisitContent />} />
              <Route path="/physiotherapy" element={<PhysioTherapyContent />} />
              <Route path="/nursing-service" element={<NurseServiceContent />} />
              <Route path="/nursing-service" element={<NurseServiceContent />} />
              <Route path="/lab-tests" element={<LabTestContent />} />
              <Route path="/pharmacy" element={<PharmacyContent />} />
              <Route path="/diagnostic" element={<DiagnosticContent />} />
              <Route path="/x-ray" element={<XRayContent />} />
              <Route path="/mammogram" element={<MammogramContent />} />
              <Route path="/ct-scan" element={<CTScanContent />} />
              <Route path="/mri" element={<MRIContent />} />
              <Route path="/ultrasound" element={<UltraSoundContent />} />

            </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
