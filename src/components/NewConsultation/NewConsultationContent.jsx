import React, { Component } from 'react';
import InnerLayout from '../Layout/InnerLayout';
import HeroImage from '../../assets/new-consultation.png';
import NewConsultation from './NewConsultation';


function NewConsultationContent() {
    return ( 
        <InnerLayout 
            HeroImage={HeroImage}
            NestedComponent={<NewConsultation />}
        />
    );
}

export default NewConsultationContent;