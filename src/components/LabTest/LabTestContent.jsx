import React,{useState} from 'react';
import InnerLayout from '../Layout/InnerLayout';
import HeroImage from '../../assets/Labtest-hero.png';
import ThankYouModal from '../Layout/ThankYouModal';
import LabTest from './LabTest';


function LabTestContent() {
    const [modalshow, setModalShow] = useState(false);
    const handleModalClose = () =>{ 
        setModalShow(false)
        window.location.reload();
    };
    const handleModalShow = () => setModalShow(true);
    return ( 
        <InnerLayout 
            HeroImage={HeroImage}
            pageName={"LAB TEST"}
            NestedComponent={<LabTest handleModalShow={handleModalShow} />}
            ThankYouModal = {<ThankYouModal modalshow={modalshow} handleModalClose={handleModalClose} />}
        />
    );
}

export default LabTestContent;