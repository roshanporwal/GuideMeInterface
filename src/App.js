import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home";

import PATIENT_DASHBOARD from "./pages/patient_dashboard";
import HOSPITAL_DASHBOARD from "./pages/hospital_dashboard";
import DoctorsHospital from "./pages/doctor_list.js";
import HOSPITAL_PROFILE from "./pages/hospital_profile";
import PATIENT_FORM from "./admin/patient_form";
import ADMIN_HOSPITAL_DASHBOARD from "./admin/admin_hospital_dashboard";
import ADMIN_ENQUIRY_DASHBOARD from "./admin/admin_enquiry_dashboard";
import ADMIN_HOSPITAL_PROFILE from "./admin/admin_hospital_profile";
import ADMIN_PATIENT_DASHBOARD from "./admin/admin_patient_dashboard";
import ADMIN_ENQUIRY_INFO from "./admin/admin_enquiry_info";
import ADMIN_Home from "./admin/admin_home.js";
//import HospitalNavbar from './Navbar/hospital_navbar';
//import ADMIN_NAVBAR from './Navbar/admin_navbar';
import PATIENT_VIEW from "./admin/patient_view";
import SMART_SEARCH from "./admin/smart_search";
import Landing from "./pages/landing";
import mis from "./admin/mis"

import "./App.css";
import "react-bootstrap";

export default function App(props) {
  return (
    <Router>
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/admin" exact component={ADMIN_Home} />
        <Route path="/" exact component={Landing} />
        <Route path='/feedback' component={() => { 
            window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfcPrt4Zu-EryLavYYpNKQYWoGWlXZ2_eOMR5Nz4Y_sZeY-DA/viewform'; 
            return null;
        }}/>
        <Route path="/hospital/sendquota" exact component={PATIENT_DASHBOARD} />
        <Route
          path="/hospital/dashboard"
          exact
          component={HOSPITAL_DASHBOARD}
        />
        <Route exact path="/hospital/doctors" component={DoctorsHospital} />
        <Route path="/hospital/profile" exact component={HOSPITAL_PROFILE} />

        <Route exact path="/admin/enqurie_form" component={PATIENT_FORM} />
        <Route
          path="/admin/dashboard"
          exact
          component={ADMIN_HOSPITAL_DASHBOARD}
        />
        <Route
          path="/admin/enquiry"
          exact
          component={ADMIN_ENQUIRY_DASHBOARD}
        />
        <Route
          path="/admin/hospital/profile"
          exact
          component={ADMIN_HOSPITAL_PROFILE}
        />
        <Route
          path="/admin/sendquota"
          exact
          component={ADMIN_PATIENT_DASHBOARD}
        />
        <Route
          path="/admin/enquiry/info"
          exact
          component={ADMIN_ENQUIRY_INFO}
        />
        <Route path="/admin/smartsearch" exact component={SMART_SEARCH} />
        <Route path="/admin/mis" exact component={mis} />

        <Route path="/patient_view" exact component={PATIENT_VIEW} />
      </Switch>
    </Router>
  );
}

/* function isadmin() {
  let data = localStorage.getItem("login")
  data = JSON.parse(data)
  if(data.admin){
    return true
  }else{
    return false
  }
} */
