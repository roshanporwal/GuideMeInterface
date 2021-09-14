import React,{Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

 import Home from './pages/home';

import PATIENT_DASHBOARD from './pages/patient_dashboard';
import HOSPITAL_DASHBOARD from './pages/hospital_dashboard';
import DoctorsHospital from './pages/doctor_list.js';
import HOSPITAL_PROFILE from './pages/hospital_profile';
import PATIENT_FORM from './admin/patient_form';
import ADMIN_HOSPITAL_DASHBOARD from './admin/admin_hospital_dashboard';
import ADMIN_HOSPITAL_PROFILE from './admin/admin_hospital_profile';
import ADMIN_PATIENT_DASHBOARD from './admin/admin_patient_dashboard';
import ADMIN_Home from './admin/admin_home.js';
import HospitalNavbar from './Navbar/hospital_navbar';
import ADMIN_NAVBAR from './Navbar/admin_navbar';


import './App.css';
import 'react-bootstrap';


class  App extends Component {
  
  render(){

  return (
    <Router>
      {islogin() ?isadmin() ? <ADMIN_NAVBAR/> : <HospitalNavbar/>:null}
    
      <Switch>
      <Route path='/' exact  component={Home} />
      <Route path='/admin' exact component={ADMIN_Home} />
      
      
        <Route path='/hospital/sendquota' exact component={PATIENT_DASHBOARD} />
        <Route path='/hospital/dashboard' exact component={HOSPITAL_DASHBOARD} />
        <Route exact path='/hospital/doctors'  component={DoctorsHospital} />        
        <Route path='/hospital/profile' exact component={HOSPITAL_PROFILE} />
    
      
     
        <Route exact path='/admin/enqurie_form'  component={PATIENT_FORM} />
        <Route path='/admin/dashboard' exact component={ADMIN_HOSPITAL_DASHBOARD} />
        <Route path='/admin/hospital/profile' exact component={ADMIN_HOSPITAL_PROFILE} />
        <Route path='/admin/sendquota' exact component={ADMIN_PATIENT_DASHBOARD} />
      
      </Switch>
      
    </Router>
  );
};
  
}
function islogin() {
  let data = localStorage.getItem("login")
 if(data===null){
   return false
 }
  data = JSON.parse(data)
  if(Object.keys(data).length !== 0){
    return true
  }
    console.log("false fadvsdfsdsfsdvdsv")
    return false
  

}

function isadmin() {
  let data = localStorage.getItem("login")
  data = JSON.parse(data)
  if(data.admin){
    return true
  }else{
    return false
  }

}
export default App;