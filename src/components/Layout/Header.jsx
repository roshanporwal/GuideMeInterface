import React from 'react';
import {Row,Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/guidemedoc-logo.png';
import './Layout.css';
function Header() {
    const navigate = useNavigate();
    return ( 
        <div className='container-fluid'>
            <Row className="header-row">
                <Col role="button" lg={{span:2,offset:1}} xs={6} onClick={() => navigate('/')}>
                    <img src={Logo} width={166}  alt='company-logo' />
                </Col>
            </Row>
        </div>
     );
}

export default Header;