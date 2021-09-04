import React,{Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

 import Home from './pages/home';

import PATIENT_DASHBOARD from './pages/patient_dashboard';
import HOSPITAL_DASHBOARD from './pages/hospital_dashboard';
import DOCTOR_LIST from './pages/doctor_list.js';
import HOSPITAL_PROFILE from './pages/hospital_profile';
import PATIENT_FORM from './pages/patient_form';
import ADMIN_HOSPITAL_DASHBOARD from './admin/admin_hospital_dashboard';
import ADMIN_HOSPITAL_PROFILE from './admin/admin_hospital_profile';
import ADMIN_PATIENT_DASHBOARD from './admin/admin_patient_dashboard';
import ADMIN_Home from './admin/admin_home.js';


import './App.css';
import 'react-bootstrap';


class  App extends Component {
  render(){

  return (
    <Router>
    
      <Switch>
      <Route path='/' exact component={Home} />
        <Route path='/patient' component={PATIENT_DASHBOARD} />
        <Route path='/HOSPITAL_DASHBOARD' component={HOSPITAL_DASHBOARD} />
        <Route path='/DOCTOR_LIST' component={DOCTOR_LIST} />        
        <Route path='/HOSPITAL_PROFILE' component={HOSPITAL_PROFILE} />
        <Route path='/PATIENT_FORM' component={PATIENT_FORM} />
        <Route path='/ADMIN_HOSPITAL_DASHBOARD' component={ADMIN_HOSPITAL_DASHBOARD} />
        <Route path='/ADMIN_HOSPITAL_PROFILE' component={ADMIN_HOSPITAL_PROFILE} />
        <Route path='/ADMIN_PATIENT_DASHBOARD' component={ADMIN_PATIENT_DASHBOARD} />
        <Route path='/admin' component={ADMIN_Home} />
      </Switch>
      
    </Router>
  );
};
  
}

export default App;