import React,{useState} from 'react';
import InnerLayout from '../Layout/InnerLayout';
import HeroImage from '../../assets/Labtest-hero.png';
import ThankYouModal from '../Layout/ThankYouModal';
import Pharmacy from './Pharmacy';


function PharmacyContent() {
    const [modalshow, setModalShow] = useState(false);
    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);
    return ( 
        <InnerLayout 
            HeroImage={HeroImage}
            pageName={"Pharmacy"}
            NestedComponent={<Pharmacy handleModalShow={handleModalShow} />}
            ThankYouModal = {<ThankYouModal modalshow={modalshow} handleModalClose={handleModalClose} />}
        />
    );
}

export default PharmacyContent;