import React, {useState} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import PATIENT_NAVBAR from './patient_navbar';
import { Form } from 'react-bootstrap';

import { hospitalSchema } from '../components/Validations/hospitalValidation';

const res = {
    "medstar":[
        {
            "hospital_name":"MEDSTAR AESTHETICS & MULTI SPECIALITY CENTRE",
            "hospital_location":"Dubai, UAE",
            "hospital_address":"GROUND FLOOR, GULF TOWER, OUD METHA P.O BOX: 117084, DUBAI, UAE",
            "hospital_mobile":"800 22 33",
            "hospital_email":"talktous@medstarhhc.com"
        },
        
    ],
    "hospital_names":[
        {
            "name":"MEDSTAR AESTHETICS & MULTI SPECIALITY CENTRE",
            "location":"Dubai, UAE"
        },
        {
            "name":"Abcd",
            "location":"Abu Dhabi, UAE"
        },
        {
            "name":"Efgh",
            "location":"Reading, UK"
        },
    ],
    "services":[
        {
            "list1":"Breast Clinic",
            "list2":"Fistula",
            "list3":"Face Lift",
            "list4":"Gynecomastia",
            "list5":"Liposuction",
            "list6":"Mommy Makeover",
            "list7":"Tummy Tuck",
            "list8":"Circumsision",
            "list9":"Contipation",
            "list10":"Fistula",
            "list11":"Hemorrhoids(Piles)",
            "list12":"Hernia",
            "list13":"Pilonidal Sinus",
            "list14":"Fillers",
            "list15":"Laser and body contering",
            "list16":"Laser Procedure",
            "list17":"Skin Care",
            "list18":"Gastric Pill Balloon",
            "list19":"Endoscopic Procedures",
            "list20":"Weight loss clinic",
            "list21":"Gastric Pill Balloon",
            "list22":"Endoscopic Procedures",
            "list23":"Weight loss Clinic",
            "list24":"Cosmetic Gynaecology",
            "list25":"Back Pain"

        }
    ],
    "khazna":[
        {
            "company_name":"AL Khazna Insurance Company",
            "basic_build":"yes",
            "general":"yes",
            "premium":"yes"
        }
    ]

}
function ADMIN_HOSPITAL_PROFILE (props){
    
    const [errors, setErrors] = useState({});
   
    const [validated, setValidated] = useState(false);
    const [formValues, setFormValue] = useState({
        hospital_address: "",
        hospital_mobile: "",
        hospital_email: "",
        
    })
    const [isSubmitting] = useState(false)
    const handleChange = e => {
        const { name, value } = e.currentTarget
        setFormValue(prevState => ({
            ...prevState,
            [name]: value
        }))
        validate(formValues);
    }
    const validate = async (values) => {
        try {

            await hospitalSchema.validate(values, { abortEarly: false });
            return {};
        } catch (err) {
            let errObj = {};
             for (let { path, message } of err.inner) {
                errObj[path] = message;
            }
            return errObj;
        }
    }; 
    const handleSubmit = async (event) => {
        event.preventDefault();
        const err = await validate(formValues);
        const formData = new FormData();
       
        setErrors(err);       
        
        formData.append('formValues', JSON.stringify(formValues))
        
        console.log(formValues)
        setValidated(true);

        /* const login = await auth_service.enquries(formData)
         console.log(login)*/
    };
        return(
            
            <>
          
            {/* <Modal show={show} onHide={handleClose} style = {{opacity: 1, marginTop: "10rem"}}>
        <Modal.Header closeButton>
          <Modal.Title>
           Sample Modal Heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form  noValidate validated={validated}  onSubmit = {handleSubmit}>
            <Form.Group>
            
            <Form.Control
            style={{ border: "2px solid #164473", borderRadius: 10 }}
                        placeholder="Hospital Address"
                        className = "form-control"
                        onChange={handleChange} 
                        type="text" 
                        name="hospital_address" 
                        id="hospital_address" 
                        isValid = {!errors.hospital_address}
                        value = {formValues.hospital_address}
                        />
                      <Form.Control.Feedback style = {{color: "red"}}>{errors?.hospital_address}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group style = {{marginTop: "2rem"}}>
            
            <Form.Control
            style={{ border: "2px solid #164473", borderRadius: 10 }}
                        placeholder="Hospital Mobile"
                        className = "form-control"
                        onChange={handleChange} 
                        type="text" 
                        name="hospital_mobile" 
                        id="hospital_mobile" 
                        isValid = {!errors.hospital_mobile}
                        value = {formValues.hospital_mobile}
                        />
                        <Form.Control.Feedback style = {{color: "red"}}>{errors?.hospital_mobile}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group  style = {{marginTop: "2rem"}}>
            
            <Form.Control
            style={{ border: "2px solid #164473", borderRadius: 10 }}
                        placeholder="Hospital Email"
                        className = "form-control"
                        onChange={handleChange} 
                        type="text" 
                        name="hospital_email" 
                        id="hospital_email" 
                        isValid = {!errors.hospital_email}
                        value = {formValues.hospital_email}
                        />
                        <Form.Control.Feedback style = {{color: "red"}}>{errors?.hospital_email}</Form.Control.Feedback>
            </Form.Group>
           
          
            </Form>
           
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick = {handleClose}>
           Close
          </Button>
          <Button variant="primary"  onClick = {handleSubmit}>
           Submit
          </Button>
        </Modal.Footer>
      </Modal> */}
      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Profile</h5>
        
      </div>
      <div className="modal-body">
      <Form  noValidate validated={validated}  onSubmit = {handleSubmit}>
            <Form.Group>
            
            <Form.Control
            style={{ border: "2px solid #164473", borderRadius: 10 }}
                        placeholder="Hospital Address"
                        className = "form-control"
                        onChange={handleChange} 
                        type="text" 
                        name="hospital_address" 
                        id="hospital_address" 
                        isValid = {!errors.hospital_address}
                        value = {formValues.hospital_address}
                        />
                      <Form.Control.Feedback style = {{color: "red"}}>{errors?.hospital_address}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group style = {{marginTop: "2rem"}}>
            
            <Form.Control
            style={{ border: "2px solid #164473", borderRadius: 10 }}
                        placeholder="Hospital Mobile"
                        className = "form-control"
                        onChange={handleChange} 
                        type="text" 
                        name="hospital_mobile" 
                        id="hospital_mobile" 
                        isValid = {!errors.hospital_mobile}
                        value = {formValues.hospital_mobile}
                        />
                        <Form.Control.Feedback style = {{color: "red"}}>{errors?.hospital_mobile}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group  style = {{marginTop: "2rem"}}>
            
            <Form.Control
            style={{ border: "2px solid #164473", borderRadius: 10 }}
                        placeholder="Hospital Email"
                        className = "form-control"
                        onChange={handleChange} 
                        type="text" 
                        name="hospital_email" 
                        id="hospital_email" 
                        isValid = {!errors.hospital_email}
                        value = {formValues.hospital_email}
                        />
                        <Form.Control.Feedback style = {{color: "red"}}>{errors?.hospital_email}</Form.Control.Feedback>
            </Form.Group>
           
          
            </Form>
           
       </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick = {handleSubmit}>Submit</button>
      </div>
    </div>
  </div>
</div>
            <PATIENT_NAVBAR/>
              <div className = "hospital_profile_title">
                    <h1>HOSPITAL PROFILE</h1>
              </div>
                
              
         <div className = "hospital-info col-md-12">
              <div className = "col-md-4">
              { 
                res.medstar.map((target,index) => (
                    <div className = "medstar_container" key = {index} {...target}>
                        <img className = "medstar_image"  src = "assets\images\Medstar-Healthcare-Jobs.png" alt = ""/>  
                        <h5 style = {{textAlign: "center", padding: 5}}>{target.hospital_name}</h5>
                        <h6 style = {{textAlign: "center", padding: 5}}>{target.hospital_location}</h6>
                        <div className = "d-flex p-4">
                            <i style = {{fontSize: 22}} className = "fa fa-map-marker"></i>
                            <h6 style = {{paddingLeft: 4}}>{target.hospital_address}</h6>
                            <button  data-toggle="modal" data-target="#exampleModal" /* onClick= {handleShow} */ disabled={isSubmitting} type = "submit" className = "update_doctor"><i style = {{fontSize: 20}} class = "fa fa-pencil"></i></button>
                        </div>
                        <div className = "d-flex p-4">
                            <i style = {{fontSize: 22}} className = "fa fa-phone"></i>
                            <h6 style = {{paddingLeft: 4}}>{target.hospital_mobile}</h6>
                            

                            
                        </div>
                        <div className = "d-flex p-4">
                            <i style = {{fontSize: 22}} className = "fa fa-map-marker"></i>
                            <h6 style = {{paddingLeft: 4}}>{target.hospital_email}</h6>
                            
                        </div>
                    </div>
                    
                ))
    }
              <div>
              <div className = "row">
                  <div className = "col-sm-3">
                    <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                </div>
                <div className = "col-sm-3">
                    <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                </div>
                <div className = "col-sm-3">
                    <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                </div>
                <div className = "col-sm-3">
                    <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                </div>
                    
                 </div>
                 <div className = "row">
                 <div className = "col-sm-3">
                    <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                </div>
                <div className = "col-sm-3">
                    <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                </div>
                <div className = "col-sm-3">
                    <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                </div>
                <div className = "col-sm-3">
                    <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                </div>
                 </div>
              </div>
              </div>
              <div className = "col-md-7 ">
              { 
                res.services.map((target,index) => (
                  <div style = {{marginTop: 40}} key = {index}{...target}>
                      <h4 style = {{marginLeft: 30}}>Services</h4>
                      <div className = "d-flex">
                          <div style = {{marginLeft: 30, marginTop: 10}}>
                              <ul>
                                    <li>{target.list1}</li>
                                    <li>{target.list2}</li>
                                    <li>{target.list3}</li>
                                    <li>{target.list4}</li>
                                    <li>{target.list5}</li>
                                    <li>{target.list6}</li>
                                    <li>{target.list7}</li>
                                    <li>{target.list8}</li>
                                    <li>{target.list9}</li>
                              </ul>
                          </div>
                          <div style = {{marginLeft: 30, marginTop: 10}}>
                              <ul>
                                    <li>{target.list10}</li>
                                    <li>{target.list11}</li>
                                    <li>{target.list12}</li>
                                    <li>{target.list13}</li>
                                    <li>{target.list14}</li>
                                    <li>{target.list15}</li>
                                    <li>{target.list16}</li>
                                    <li>{target.list17}</li>
                                    <li>{target.list18}</li>
                              </ul>
                          </div>
                      </div>
                      <div style = {{marginLeft: 30,  marginTop: 10}}>
                        <ul>
                            <li>{target.list19}</li>
                            <li>{target.list20}</li>
                            <li>{target.list22}</li>
                            <li>{target.list23}</li>
                            <li>{target.list24}</li>
                            <li>{target.list25}</li>
                        </ul>
                      </div>
                  </div>
                ))
    }
    <div style = {{marginLeft: "20px"}}>
        <div className = "row">
            
                 { 
                res.khazna.map((target,index) => (
                    <div className = "insurance_detail_container col-sm-3" key = {index} {...target}>
                        <h4 style = {{textAlign: "center"}}>{target.company_name}</h4>
                        <h4>Basic Plus: {target.basic_build}</h4>
                        <h4>General   : {target.general}</h4>
                        <h4>Premium   : {target.premium}</h4>
                    </div>
                ))}
                { 
                res.khazna.map((target,index) => (
                    <div className = "insurance_detail_container col-sm-3" key = {index} {...target}>
                        <h4 style = {{textAlign: "center"}}>{target.company_name}</h4>
                        <h4>Basic Plus: {target.basic_build}</h4>
                        <h4>General   : {target.general}</h4>
                        <h4>Premium   : {target.premium}</h4>
                    </div>
                ))}
                { 
                res.khazna.map((target,index) => (
                    <div className = "insurance_detail_container col-sm-3" key = {index} {...target}>
                        <h4 style = {{textAlign: "center"}}>{target.company_name}</h4>
                        <h4>Basic Plus: {target.basic_build}</h4>
                        <h4>General   : {target.general}</h4>
                        <h4>Premium   : {target.premium}</h4>
                    </div>
                ))}
                 </div>
                 <div className = "row">
                 { 
                res.khazna.map((target,index) => (
                    <div className = "insurance_detail_container col-sm-3" key = {index} {...target}>
                        <h4 style = {{textAlign: "center"}}>{target.company_name}</h4>
                        <h4>Basic Plus: {target.basic_build}</h4>
                        <h4>General   : {target.general}</h4>
                        <h4>Premium   : {target.premium}</h4>
                    </div>
                ))}
                { 
                res.khazna.map((target,index) => (
                    <div className = "insurance_detail_container col-sm-3" key = {index} {...target}>
                        <h4 style = {{textAlign: "center"}}>{target.company_name}</h4>
                        <h4>Basic Plus: {target.basic_build}</h4>
                        <h4>General   : {target.general}</h4>
                        <h4>Premium   : {target.premium}</h4>
                    </div>
                ))}
                { 
                res.khazna.map((target,index) => (
                    <div className = "insurance_detail_container col-sm-3" key = {index} {...target}>
                        <h4 style = {{textAlign: "center"}}>{target.company_name}</h4>
                        <h4>Basic Plus: {target.basic_build}</h4>
                        <h4>General   : {target.general}</h4>
                        <h4>Premium   : {target.premium}</h4>
                    </div>
                ))}
                    
                 </div>
              
              </div>
    </div>        
              
              
              </div>
              
            </>
        );
    }


export default ADMIN_HOSPITAL_PROFILE;