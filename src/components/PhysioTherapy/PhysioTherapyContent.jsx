import React, { useState } from 'react';
import InnerLayout from '../Layout/InnerLayout';
import HeroImage from '../../assets/physio-hero.png';
import ThankYouModal from '../Layout/ThankYouModal';
import PhysioTherapy from './PhysioTherapy';



function PhysioTherapyContent() {
    
    const [modalshow, setModalShow] = useState(false);
    const handleModalClose = () =>{ 
        setModalShow(false)
        window.location.reload();
    };
    const handleModalShow = () => setModalShow(true);

    return ( 
        <InnerLayout 
            HeroImage={HeroImage}
            pageName={"PHYSIOTHERAPY"}
            NestedComponent={<PhysioTherapy handleModalShow={handleModalShow} />}
            ThankYouModal = {<ThankYouModal modalshow={modalshow} handleModalClose={handleModalClose} />}
        />
    );
}

export default PhysioTherapyContent;