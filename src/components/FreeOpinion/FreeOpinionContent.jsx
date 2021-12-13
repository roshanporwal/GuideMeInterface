import React, { useState } from 'react';
import InnerLayout from '../Layout/InnerLayout';
import HeroImage from '../../assets/freeopinion-hero.png';
import FreeOpinion from './FreeOpinion';
import ThankYouModal from '../Layout/ThankYouModal';


function FreeOpinionContent() {

    const [modalshow, setModalShow] = useState(false);
    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);


    return ( 
        <InnerLayout 
            HeroImage={HeroImage}
            pageName={"Free Surgical Second Opinion Within The Country"}
            NestedComponent={<FreeOpinion handleModalShow={handleModalShow} />}
            ThankYouModal = {<ThankYouModal modalshow={modalshow} handleModalClose={handleModalClose} />}
        />
    );
}

export default FreeOpinionContent;