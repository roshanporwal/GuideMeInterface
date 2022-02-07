import React from 'react';
import InnerLayout from '../Layout/InnerLayout';
import HeroImage from '../../assets/home-care-hero.png';
import HomeCare from './HomeCare';


function HomeCareContent() {
    return ( 
        <InnerLayout 
            HeroImage={HeroImage}
            pageName={"Home Care Services"}
            NestedComponent={<HomeCare />}
        />
    );
}

export default HomeCareContent;