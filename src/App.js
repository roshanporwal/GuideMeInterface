/* eslint-disable react/jsx-pascal-case */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import FeedbackContent from "./components/Feedback/FeedbackContent";
import Home from "./pages/home";

import PATIENT_DASHBOARD from "./pages/patient_dashboard";
import HOSPITAL_DASHBOARD from "./pages/hospital_dashboard";
import ADMIN_ENQUIRY_DASHBOARD from "./admin/admin_enquiry_dashboard";
import DoctorsHospital from "./pages/doctor_list.js";
import HOSPITAL_PROFILE from "./pages/hospital_profile";
import PATIENT_FORM from "./admin/patient_form";
import ADMIN_HOSPITAL_DASHBOARD from "./admin/admin_hospital_dashboard";
import ADMIN_HOSPITAL_PROFILE from "./admin/admin_hospital_profile";
import ADMIN_PATIENT_DASHBOARD from "./admin/admin_patient_dashboard";
import ADMIN_ENQUIRY_INFO from "./admin/admin_enquiry_info";
import ADMIN_Home from "./admin/admin_home";
import PATIENT_VIEW from "./admin/patient_view";
import SMART_SEARCH from "./admin/smart_search";
// import Landing from "./pages/landing";
import Mis from "./admin/mis";

import "./App.css";
import "react-bootstrap";

// function admin_home(){return <ADMIN_Home/>}
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/hospital" element={<Home/>} />
          <Route path="/admin" element = {<ADMIN_Home />} />
          <Route
            path="/hospital/sendquota"
            element={<PATIENT_DASHBOARD/>}
          />
          <Route
            path="/hospital/dashboard"
            element={<HOSPITAL_DASHBOARD/>}
          />
          <Route
            path="/admin/enquiry"
            element={<ADMIN_ENQUIRY_DASHBOARD/>}
          />
          <Route path="/hospital/doctors" element={<DoctorsHospital/>} />
          <Route path="/hospital/profile" element={<HOSPITAL_PROFILE/>} />

          <Route path="/admin/enqurie_form" element={<PATIENT_FORM/>} />
          <Route
            path="/admin/dashboard"
            element={<ADMIN_HOSPITAL_DASHBOARD/>}
          />
          <Route
            path="/admin/hospital/profile"
            element={<ADMIN_HOSPITAL_PROFILE/>}
          />
          <Route
            path="/admin/sendquota"
            element={<ADMIN_PATIENT_DASHBOARD/>}
          />
          <Route
            path="/admin/enquiry/info"
            element={<ADMIN_ENQUIRY_INFO/>}
          />
          <Route path="/admin/smartsearch" element={<SMART_SEARCH/>} />
          <Route path="/admin/mis" element={<Mis/>} />

          <Route path="/patient_view" element={<PATIENT_VIEW/>} />
          <Route
            path="/log-in"
            element={
              <RestrictedRoute>
                <LoginScreen />
              </RestrictedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <RestrictedRoute>
                <SignUpScreen />
              </RestrictedRoute>
            }
          />
          <Route path="/" element={<Dashboard />} />
          <Route element={<Layout />}>
            <Route path="/feedback/:type" element = {<FeedbackContent/>}/>
            <Route path="/new-consultation" element={<NewConsultation />} />
            <Route path="/second-opinion" element={<SecondOpinionContent />} />
            <Route path="/free-opinion" element={<FreeOpinionContent />} />
            <Route
              path="/international-opinion"
              element={<InternationalOpinionContent />}
            />
            <Route path="/home-care-services" element={<HomeCareContent />} />
            <Route path="/rt-pcr" element={<RTPCRContent />} />
            <Route
              path="/teleconsultation"
              element={<TeleConsultationContent />}
            />
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
