import React,{useState} from 'react';
import InnerLayout from '../Layout/InnerLayout';
import HeroImage from '../../assets/pharmac-hero.jpeg';
import ThankYouModal from '../Layout/ThankYouModal';
import Pharmacy from './Pharmacy';


function PharmacyContent() {
    const [modalshow, setModalShow] = useState(false);
    const handleModalClose = () =>{ 
        setModalShow(false)
        window.location.reload();
    };
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