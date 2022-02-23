import React from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FreeOpinion from '../../assets/second-op-logo.png';
import InternationalOpinion from '../../assets/international-opi.png';

import * as auth_service from "../../service/auth_service";
function SecondOpinion() {
    const navigate = useNavigate();
    // const [formValues, setFormValues] = useState();
    // const handleChange = (e) => {
    //     let { name, value } = e.target;
    //     setFormValues({ ...formValues, [name]: value });
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
               
        const formData = new FormData();
        let data = localStorage.getItem("login")
        data = JSON.parse(data)

        // formValues.patient_id = data._id;
        // formValues.patient_name = data.name;
        // formValues.type = "new_consulation";


        // formData.append('formValues', JSON.stringify(formValues));

        const createNewConsulation = await auth_service.createNewenqurire(data.login_id, formData)
        if(!createNewConsulation.payload)
            alert(createNewConsulation.message)
        
    }

    return (
        <div /* className="form-container" */>
            <Form onSubmit={e => handleSubmit(e)} className="row justify-content-center">
                {/* <div className='col-12'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <FaRegUser />
                        </div>
                        <Form.Control
                            type='text'
                            name="name"
                            placeholder='Person Name *'
                            onChange={handleChange}
                            className="global-inputs"
                        />
                    </Form.Group>
                </div>
                <div className='col-10 col-md-6'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdFamilyRestroom />
                        </div>
                        <Form.Control
                            type='text'
                            name="family"
                            placeholder='Add Family Member'
                            onChange={handleChange}
                            className="global-inputs"
                        />
                    </Form.Group>
                </div> */}
                {/* <div className='col-10 col-md-6'>
                    <Form.Group>
                        <div className="prepend-icon">
                            <MdOutlinePersonAdd />
                        </div>
                        <Form.Control
                            type='text'
                            name="register"
                            placeholder='Register Patient'
                            onChange={handleChange}
                            className="global-inputs"
                        />
                    </Form.Group>
                </div>
                <div className='text-center my-4'>
                    <input className="form-button" type="submit" value="SUBMIT" />
                </div> */}
                <div className='col-10 col-md-6'>
                    <div className="large-buts" role="button" onClick={() => navigate('/free-opinion')}>
                        <img src={FreeOpinion} alt="im"/>
                        <p>Free Surgical Second <br/> Opinion Within The Country</p>
                    </div>
                </div>
                <div className='col-10 col-md-6'>
                    <div className="large-buts" role="button" onClick={() => navigate('/international-opinion')}>
                        <img src={InternationalOpinion} alt="im"/>
                        <p>International <br/>Expert Opinion</p>
                    </div>
                </div>
                
            </Form>
        </div>
    );
}

export default SecondOpinion;