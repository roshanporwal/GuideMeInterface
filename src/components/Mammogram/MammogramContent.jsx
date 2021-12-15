import React, { useState } from 'react';
import InnerLayout from '../Layout/InnerLayout';
import HeroImage from '../../assets/mammogram-hero.png';
import ThankYouModal from '../Layout/ThankYouModal';
import Mammogram from './Mammogram';



function MammogramContent() {
    
    const [modalshow, setModalShow] = useState(false);
    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);

    return ( 
        <InnerLayout 
            HeroImage={HeroImage}
            pageName={"MAMMOGRAM"}
            NestedComponent={<Mammogram handleModalShow={handleModalShow} />}
            ThankYouModal = {<ThankYouModal modalshow={modalshow} handleModalClose={handleModalClose} />}
        />
    );
}

export default MammogramContent;