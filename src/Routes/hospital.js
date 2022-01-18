import React,{Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

 import Home from '../pages/home';

import PATIENT_DASHBOARD from '../pages/patient_dashboard';
import HOSPITAL_DASHBOARD from '../pages/hospital_dashboard';
import DOCTOR_LIST from '../pages/doctor_list.js';
import HOSPITAL_PROFILE from '../pages/hospital_profile';
import PATIENT_NAVBAR from '../Navbar/hospital_navbar';




class  Hospital extends Component {
  render(){

  return (
    <Router>
    
      <Switch>
      <Route path='' exact component={Home} />
      <div>
        <PATIENT_NAVBAR/>
        <Route path='/sendquota' component={PATIENT_DASHBOARD} />
        <Route path='/dashbord' component={HOSPITAL_DASHBOARD} />
        <Route path='/doctor' component={DOCTOR_LIST} />        
        <Route path='/profile' component={HOSPITAL_PROFILE} />
      </div>
      </Switch>
      
    </Router>
  );
};
  
}

export default Hospital;