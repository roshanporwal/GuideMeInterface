import React, { useState } from 'react';
import InnerLayout from '../Layout/InnerLayout';
import HeroImage from '../../assets/Telconsultation-hero.png';
import ThankYouModal from '../Layout/ThankYouModal';
import TeleConsultation from './TeleConsultation';


function TeleConsultationContent() {
    
    const [modalshow, setModalShow] = useState(false);
    const handleModalClose = () =>{ 
        setModalShow(false)
        window.location.reload();
    };
    const handleModalShow = () => setModalShow(true);

    return ( 
        <InnerLayout 
            HeroImage={HeroImage}
            pageName={"TELECONSULTATION"}
            NestedComponent={<TeleConsultation handleModalShow={handleModalShow} />}
            ThankYouModal = {<ThankYouModal modalshow={modalshow} handleModalClose={handleModalClose} />}
        />
    );
}

export default TeleConsultationContent;