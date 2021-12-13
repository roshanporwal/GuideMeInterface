import React from 'react';
import { useNavigate } from 'react-router-dom';
import Rtpcr from '../../assets/rtpcr-logo.png';
import Telecom from '../../assets/telecom-logo.png';
import DoctorVisit from '../../assets/doctor-visit-logo.png';
import Physio from '../../assets/pysio-logo.png';
import Nurse from '../../assets/home-service.png';

function HomeCare() {
    const navigate = useNavigate();

    return (
        <div /* className="form-container" */>
            <div className="row justify-content-center">
                <div className='col-10 col-md-5'>
                    <div className="large-buts" role="button" onClick={() => navigate('/rt-pcr')}>
                        <img src={Rtpcr} alt="im"/>
                        <p>RT PCR Test</p>
                    </div>
                </div>
                <div className='col-10 col-md-5'>
                    <div className="large-buts" role="button" onClick={() => navigate('/teleconsultation')}>
                        <img src={Telecom} alt="im"/>
                        <p>Teleconsultation</p>
                    </div>
                </div>
                <div className='col-10 col-md-5'>
                    <div className="large-buts" role="button" onClick={() => navigate('/doctor-home-visit')}>
                        <img src={DoctorVisit} alt="im"/>
                        <p>Doctor Home Visit</p>
                    </div>
                </div>
                <div className='col-10 col-md-5'>
                    <div className="large-buts" role="button" onClick={() => navigate('/physiotherapy')}>
                        <img src={Physio} alt="im"/>
                        <p>Physiotherapy</p>
                    </div>
                </div>
                <div className='col-10 col-md-5'>
                    <div className="large-buts" role="button" onClick={() => navigate('/nursing-service')}>
                        <img src={Nurse} alt="im"/>
                        <p>Nursing service</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeCare;