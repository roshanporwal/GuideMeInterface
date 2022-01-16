import React, { useState } from 'react';
import InnerLayout from '../Layout/InnerLayout';
import HeroImage from '../../assets/doctor-visit-hero.png';
import ThankYouModal from '../Layout/ThankYouModal';
import DoctorVisit from './DoctorVisit';



function DoctorVisitContent() {
    
    const [modalshow, setModalShow] = useState(false);
    const handleModalClose = () =>{ 
        setModalShow(false)
        window.location.reload();
    };
    const handleModalShow = () => setModalShow(true);

    return ( 
        <InnerLayout 
            HeroImage={HeroImage}
            pageName={"DOCTOR HOME VISIT"}
            NestedComponent={<DoctorVisit handleModalShow={handleModalShow} />}
            ThankYouModal = {<ThankYouModal modalshow={modalshow} handleModalClose={handleModalClose} />}
        />
    );
}

export default DoctorVisitContent;