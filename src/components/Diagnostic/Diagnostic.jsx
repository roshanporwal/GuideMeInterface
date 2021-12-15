import React from 'react';
import { useNavigate } from 'react-router-dom';
import Xray from '../../assets/x-rays-logo.png';
import Mammogram from '../../assets/mammogram.png';
import CTScan from '../../assets/ct-scan.png';
import MRI from '../../assets/mri.png';
import Ultrasound from '../../assets/ultrasound.png';

function Diagnostic() {
    const navigate = useNavigate();

    return (
        <div /* className="form-container" */>
            <div className="row justify-content-center">
                <div className='col-10 col-md-5'>
                    <div className="large-buts-for-homecare" role="button" onClick={() => navigate('/x-ray')}>
                        <img src={Xray} alt="im"/>
                        <p>X-ray</p>
                    </div>
                </div>
                <div className='col-10 col-md-5'>
                    <div className="large-buts-for-homecare" role="button" onClick={() => navigate('/mammogram')}>
                        <img src={Mammogram} alt="im"/>
                        <p>Mammogram</p>
                    </div>
                </div>
                <div className='col-10 col-md-5'>
                    <div className="large-buts-for-homecare" role="button" onClick={() => navigate('/ct-scan')}>
                        <img src={CTScan} alt="im"/>
                        <p>CT-Scan</p>
                    </div>
                </div>
                <div className='col-10 col-md-5'>
                    <div className="large-buts-for-homecare" role="button" onClick={() => navigate('/mri')}>
                        <img src={MRI} alt="im"/>
                        <p>MRI</p>
                    </div>
                </div>
                <div className='col-10 col-md-5'>
                    <div className="large-buts-for-homecare" role="button" onClick={() => navigate('/ultrasound')}>
                        <img src={Ultrasound} alt="im"/>
                        <p>Ultrasound</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Diagnostic;