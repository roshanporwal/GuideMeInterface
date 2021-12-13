import React from 'react';
import { Container } from 'react-bootstrap';
function InnerLayout(props) {

    return ( 
        <div>
            {props.ThankYouModal}
            <Container>
                <div className="mt-4">
                    <div className="row  align-items-center justify-content-around">
                        <div className='col-md-4 col-11'>
                            <div className='mt-lg-5 mt-2 text-center'>
                                <img src={props.HeroImage} width="100%" alt='company-logo' />
                                <h5>{props.pageName}</h5>
                            </div>
                        </div>
                        <div className='col-md-5 col-11 mt-5 mt-lg-0'>
                            {props.NestedComponent}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
     );
}

export default InnerLayout;