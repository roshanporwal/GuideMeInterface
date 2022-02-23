import React from 'react';
import InnerLayout from '../Layout/InnerLayout';
import HeroImage from '../../assets/diagnostics-hero.jpeg';
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