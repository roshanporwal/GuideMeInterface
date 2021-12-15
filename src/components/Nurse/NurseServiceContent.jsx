import React, { useState } from 'react';
import InnerLayout from '../Layout/InnerLayout';
import HeroImage from '../../assets/nursing-hero.png';
import ThankYouModal from '../Layout/ThankYouModal';
import NurseService from './NurseService';



function NurseServiceContent() {
    
    const [modalshow, setModalShow] = useState(false);
    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);

    return ( 
        <InnerLayout 
            HeroImage={HeroImage}
            pageName={"NURSING SERVICE"}
            NestedComponent={<NurseService handleModalShow={handleModalShow} />}
            ThankYouModal = {<ThankYouModal modalshow={modalshow} handleModalClose={handleModalClose} />}
        />
    );
}

export default NurseServiceContent;