import React from 'react';
import 'font-awesome/css/font-awesome.min.css';



import './style.css'
import ADMIN_NAVBAR from "../Navbar/admin_navbar";
import Button from '@restart/ui/esm/Button';
import constants from '../constant';


function Mis() {
   
  
    
        return (
            <>
                <ADMIN_NAVBAR />
                <Button onClick={() => { window.location.href =`${constants.serverBaseUrl}/uploadexcel/patient_excel` }}>patient</Button>
                <Button onClick={()=> { window.location.href =`${constants.serverBaseUrl}/uploadexcel/hospital_excel` }}>doctor</Button>
            </>
        );
   
}

export default Mis;