import React from 'react';
import InnerLayout from '../Layout/InnerLayout';
import HeroImage from '../../assets/home-care-hero.png';
import Diagnostic from './Diagnostic';


function DiagnosticContent() {
    return ( 
        <InnerLayout 
            HeroImage={HeroImage}
            pageName={"Diagnostics / Radiology"}
            NestedComponent={<Diagnostic />}
        />
    );
}

export default DiagnosticContent;