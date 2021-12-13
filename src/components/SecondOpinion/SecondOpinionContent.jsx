import React from 'react';
import InnerLayout from '../Layout/InnerLayout';
import HeroImage from '../../assets/second-opinion-hero.png';
import SecondOpinion from './SecondOpinion';


function SecondOpinionContent() {
    return ( 
        <InnerLayout 
            HeroImage={HeroImage}
            pageName={"Second Opinion"}
            NestedComponent={<SecondOpinion />}
        />
    );
}

export default SecondOpinionContent;