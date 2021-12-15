import React from 'react';
import InnerLayout from '../Layout/InnerLayout';
import HeroImage from '../../assets/Labtest-hero.png';
import LabTest from './LabTest';


function LabTestContent() {
    return ( 
        <InnerLayout 
            HeroImage={HeroImage}
            pageName={"LAB TEST"}
            NestedComponent={<LabTest />}
        />
    );
}

export default LabTestContent;