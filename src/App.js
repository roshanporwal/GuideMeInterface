import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { AuthProvider } from "./service/authContext";
import LoginScreen from "./components/Auth/Login";
import RestrictedRoute from "./components/routes/RestrictedRoutes";
import SignUpScreen from "./components/Auth/SignUp";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import NewConsultation from "./components/NewConsultation/NewConsultationContent";

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
            </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
