import React, { useState } from 'react';
import InnerLayout from '../Layout/InnerLayout';
import HeroImage from '../../assets/International-opinion-header.png';
import ThankYouModal from '../Layout/ThankYouModal';
import InternationalOpinion from './InternationalOpinion';


function InternationalOpinionContent() {

    const [modalshow, setModalShow] = useState(false);
    const handleModalClose = () =>{ 
        setModalShow(false)
        window.location.reload();
    };
    const handleModalShow = () => setModalShow(true);


    return ( 
        <InnerLayout 
            HeroImage={HeroImage}
            pageName={"International Expert Opinion"}
            NestedComponent={<InternationalOpinion handleModalShow={handleModalShow} />}
            ThankYouModal = {<ThankYouModal modalshow={modalshow} handleModalClose={handleModalClose} />}
        />
    );
}

export default InternationalOpinionContent;