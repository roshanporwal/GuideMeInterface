import React, { useState } from 'react';
import InnerLayout from '../Layout/InnerLayout';
import HeroImage from '../../assets/ct-scan-hero.png';
import ThankYouModal from '../Layout/ThankYouModal';
import CTScan from './CTScan';



function CTScanContent() {
    
    const [modalshow, setModalShow] = useState(false);
    const handleModalClose = () =>{ 
        setModalShow(false)
        window.location.reload();
    };
    const handleModalShow = () => setModalShow(true);

    return ( 
        <InnerLayout 
            HeroImage={HeroImage}
            pageName={"CT-SCAN"}
            NestedComponent={<CTScan handleModalShow={handleModalShow} />}
            ThankYouModal = {<ThankYouModal modalshow={modalshow} handleModalClose={handleModalClose} />}
        />
    );
}

export default CTScanContent;