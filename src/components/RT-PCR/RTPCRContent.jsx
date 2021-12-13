import React, { useState } from 'react';
import InnerLayout from '../Layout/InnerLayout';
import HeroImage from '../../assets/new-consultation.png';
import ThankYouModal from '../Layout/ThankYouModal';
import RTPCR from './RTPCR';


function RTPCRContent() {
    
    const [modalshow, setModalShow] = useState(false);
    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);

    return ( 
        <InnerLayout 
            HeroImage={HeroImage}
            pageName={"RT PCR"}
            NestedComponent={<RTPCR handleModalShow={handleModalShow} />}
            ThankYouModal = {<ThankYouModal modalshow={modalshow} handleModalClose={handleModalClose} />}
        />
    );
}

export default RTPCRContent;