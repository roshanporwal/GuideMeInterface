/* eslint-disable react/jsx-pascal-case */
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./service/authContext";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import "react-bootstrap";

const LoginScreen = lazy(() => import("./components/Auth/Login"));
const RestrictedRoute = lazy(() =>
    import("./components/routes/RestrictedRoutes")
);
const SignUpScreen = lazy(() => import("./components/Auth/SignUp"));
const Layout = lazy(() => import("./components/Layout/Layout"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const NewConsultation = lazy(() =>
    import("./components/NewConsultation/NewConsultationContent")
);
const SecondOpinionContent = lazy(() =>
    import("./components/SecondOpinion/SecondOpinionContent")
);
const FreeOpinionContent = lazy(() =>
    import("./components/FreeOpinion/FreeOpinionContent")
);

const InternationalOpinionContent = lazy(() =>
    import("./components/InternationalOpinion/InternationalOpinionContent")
);
const HomeCareContent = lazy(() =>
    import("./components/HomeCare/HomeCareContent")
);
const RTPCRContent = lazy(() => import("./components/RT-PCR/RTPCRContent"));
const TeleConsultationContent = lazy(() =>
    import("./components/TeleConsultation/TeleConsultationContent")
);
const DoctorVisitContent = lazy(() =>
    import("./components/DoctorVisit/DoctorVisitContent")
);
const PhysioTherapyContent = lazy(() =>
    import("./components/PhysioTherapy/PhysioTherapyContent")
);
const NurseServiceContent = lazy(() =>
    import("./components/Nurse/NurseServiceContent")
);
const LabTestContent = lazy(() =>
    import("./components/LabTest/LabTestContent")
);
const PharmacyContent = lazy(() =>
    import("./components/Pharmacy/PharmacyContent")
);
const DiagnosticContent = lazy(() =>
    import("./components/Diagnostic/DiagnosticContent")
);
const XRayContent = lazy(() => import("./components/XRay/XRayContent"));
const MammogramContent = lazy(() =>
    import("./components/Mammogram/MammogramContent")
);
const CTScanContent = lazy(() => import("./components/CTScan/CTScanContent"));
const MRIContent = lazy(() => import("./components/MRI/MRIContent"));
const UltraSoundContent = lazy(() =>
    import("./components/Ultrasound/UltraSoundContent")
);
const FeedbackContent = lazy(() =>
    import("./components/Feedback/FeedbackContent")
);
const TandC = lazy(() => import("./components/TandC/TandC"));
const Home = lazy(() => import("./pages/home"));

const PATIENT_DASHBOARD = lazy(() => import("./pages/patient_dashboard"));
const HOSPITAL_DASHBOARD = lazy(() => import("./pages/hospital_dashboard"));
const ADMIN_ENQUIRY_DASHBOARD = lazy(() =>
    import("./admin/admin_enquiry_dashboard")
);
const DoctorsHospital = lazy(() => import("./pages/doctor_list.js"));
const HOSPITAL_PROFILE = lazy(() => import("./pages/hospital_profile"));
const PATIENT_FORM = lazy(() => import("./admin/patient_form"));
const ADMIN_HOSPITAL_DASHBOARD = lazy(() =>
    import("./admin/admin_hospital_dashboard")
);
const ADMIN_HOSPITAL_PROFILE = lazy(() =>
    import("./admin/admin_hospital_profile")
);
const ADMIN_PATIENT_DASHBOARD = lazy(() =>
    import("./admin/admin_patient_dashboard")
);
const ADMIN_ENQUIRY_INFO = lazy(() => import("./admin/admin_enquiry_info"));
const ADMIN_Home = lazy(() => import("./admin/admin_home"));
const PATIENT_VIEW = lazy(() => import("./admin/patient_view"));
const SMART_SEARCH = lazy(() => import("./admin/smart_search"));
const Mis = lazy(() => import("./admin/mis"));

function App() {
    return (
        <AuthProvider>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route
                            path="/terms-and-conditions"
                            element={<TandC />}
                        />
                        <Route path="/hospital" element={<Home />} />
                        <Route path="/admin" element={<ADMIN_Home />} />
                        <Route
                            path="/hospital/sendquota"
                            element={<PATIENT_DASHBOARD />}
                        />
                        <Route
                            path="/hospital/dashboard"
                            element={<HOSPITAL_DASHBOARD />}
                        />
                        <Route
                            path="/admin/enquiry"
                            element={<ADMIN_ENQUIRY_DASHBOARD />}
                        />
                        <Route
                            path="/hospital/doctors"
                            element={<DoctorsHospital />}
                        />
                        <Route
                            path="/hospital/profile"
                            element={<HOSPITAL_PROFILE />}
                        />

                        <Route
                            path="/admin/enqurie_form"
                            element={<PATIENT_FORM />}
                        />
                        <Route
                            path="/admin/dashboard"
                            element={<ADMIN_HOSPITAL_DASHBOARD />}
                        />
                        <Route
                            path="/admin/hospital/profile"
                            element={<ADMIN_HOSPITAL_PROFILE />}
                        />
                        <Route
                            path="/admin/sendquota"
                            element={<ADMIN_PATIENT_DASHBOARD />}
                        />
                        <Route
                            path="/admin/enquiry/info"
                            element={<ADMIN_ENQUIRY_INFO />}
                        />
                        <Route
                            path="/admin/smartsearch"
                            element={<SMART_SEARCH />}
                        />
                        <Route path="/admin/mis" element={<Mis />} />

                        <Route
                            path="/patient_view"
                            element={<PATIENT_VIEW />}
                        />
                    </Routes>
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
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
                        <Route element={<Layout />}>
                            <Route
                                path="/feedback/:type"
                                element={<FeedbackContent />}
                            />
                            <Route
                                path="/new-consultation"
                                element={<NewConsultation />}
                            />
                            <Route
                                path="/second-opinion"
                                element={<SecondOpinionContent />}
                            />
                            <Route
                                path="/free-opinion"
                                element={<FreeOpinionContent />}
                            />
                            <Route
                                path="/international-opinion"
                                element={<InternationalOpinionContent />}
                            />
                            <Route
                                path="/home-care-services"
                                element={<HomeCareContent />}
                            />
                            <Route path="/rt-pcr" element={<RTPCRContent />} />
                            <Route
                                path="/teleconsultation"
                                element={<TeleConsultationContent />}
                            />
                            <Route
                                path="/doctor-home-visit"
                                element={<DoctorVisitContent />}
                            />
                            <Route
                                path="/physiotherapy"
                                element={<PhysioTherapyContent />}
                            />
                            <Route
                                path="/nursing-service"
                                element={<NurseServiceContent />}
                            />
                            <Route
                                path="/nursing-service"
                                element={<NurseServiceContent />}
                            />
                            <Route
                                path="/lab-tests"
                                element={<LabTestContent />}
                            />
                            <Route
                                path="/pharmacy"
                                element={<PharmacyContent />}
                            />
                            <Route
                                path="/diagnostic"
                                element={<DiagnosticContent />}
                            />
                            <Route path="/x-ray" element={<XRayContent />} />
                            <Route
                                path="/mammogram"
                                element={<MammogramContent />}
                            />
                            <Route
                                path="/ct-scan"
                                element={<CTScanContent />}
                            />
                            <Route path="/mri" element={<MRIContent />} />
                            <Route
                                path="/ultrasound"
                                element={<UltraSoundContent />}
                            />
                        </Route>
                    </Routes>
                </Suspense>
            </Router>
        </AuthProvider>
    );
}

export default App;
