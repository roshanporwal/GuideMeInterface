import React,{Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

 import Home from './pages/home';

import PATIENT_DASHBOARD from './pages/patient_dashboard';
import HOSPITAL_DASHBOARD from './pages/hospital_dashboard';
import DOCTOR_LIST from './pages/doctor_list.js';
<<<<<<< HEAD
import HOSPITAL_PROFILE from './pages/hospital_profile';
=======
import HOSPITAL_PROFILE from './pages/hospital_profile'; 
>>>>>>> 840a1921a379650e826ab1f3e6d5c33d42c8ae74
import PATIENT_FORM from './pages/patient_form';

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
<<<<<<< HEAD
        <Route path='/HOSPITAL_PROFILE' component={HOSPITAL_PROFILE} />
        <Route path='/PATIENT_FORM' component={PATIENT_FORM} />
=======
        <Route path='/HOSPITAL_PROFILE' component={HOSPITAL_PROFILE}/>
        <Route path='/HOSPITAL_PROFILE' component={PATIENT_FORM}
        />
       
>>>>>>> 840a1921a379650e826ab1f3e6d5c33d42c8ae74
      </Switch>
      
    </Router>
  );
};
  
}

export default App;