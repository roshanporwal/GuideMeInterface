import React, {useState,useEffect} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import SPECIALITY_DELETE from '../components/speciality_delete';
import INSURANCE_UPDATE from '../components/insurance_update';
import * as auth_service from "../services/auth_service";

import { Form } from 'react-bootstrap';
import './style.css'

import { hospitalSchema } from '../components/Validations/hospitalValidation';
import HospitalNavbar from "../Navbar/hospital_navbar";
import ReactGifLoader from '../components/gif_loader';
import constants from '../constant';
import ImageUpload from '../components/image_upload';


function ADMIN_HOSPITAL_PROFILE (props){
    
    const [errors, /*setErrors*/] = useState({});
    const [hospital_data, setHospital_data] = useState([]);
    const [speciality, setSpeciality] = useState([]);
    const [insurance, setInsurance] = useState([]);
    const [validated, /*setValidated*/] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hospital_avatar, setHospital_avatar] = useState();
    const [formValues, setFormValue] = useState({
        address: "",
        phno: "",
        hospital_email: "",
        hospital_image: ""
        
    })
    
    const [isSubmitting] = useState(false)

    useEffect(() => {

        fetchData().then(() => setLoading(false));
    }, []);
    async function fetchData(props) {
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
        setHospital_data([data])
        setFormValue(data)
        setSpeciality(data.speciality)
        if(data.insurance){
        setInsurance(data.insurance)
        }
       
    }

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
    const onchange = e => {
        

        
            setHospital_avatar(e.target.files[0])
    }
    async function edithospital() {
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
        if(formValues.address===''){
           
          window.location.reload();
          return
        }
        const formData = new FormData();
      
        formData.append('hospital_avatar', hospital_avatar);
        formData.append('formValues', JSON.stringify(formValues))
    
        const updatehospital = await auth_service.updatehospital(data.login_id, formData)
        if (updatehospital.payload) {
          localStorage.setItem('login', JSON.stringify(updatehospital.payload));
          window.location.reload();
        } else if (!updatehospital.payload) {
          //window.location.reload();
        }
      }
      if(loading === true)
     return (
        <>
        <ReactGifLoader />
        </>
      )
      else
        return(
            
            <>
            <HospitalNavbar/>
            <SPECIALITY_DELETE />
          <INSURANCE_UPDATE />
          
    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Update Profile</h5>
                </div>
                <div className="modal-body">
                    <Form  noValidate validated={validated}  onSubmit = {edithospital}>
                        <Form.Group>
                            <Form.Control
                            style={{ border: "2px solid #164473", borderRadius: 10 }}
                                placeholder="Hospital Address"
                                className = "form-control"
                                onChange={handleChange} 
                                type="text" 
                                name="address" 
                                id="address" 
                                isValid = {!errors.address}
                                value = {formValues.address}
                            />
                            <Form.Control.Feedback style = {{color: "red"}}>{errors?.address}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group style = {{marginTop: "2rem"}}>
                        <Form.Control
                            style={{ border: "2px solid #164473", borderRadius: 10 }}
                            placeholder="Hospital Mobile"
                            className = "form-control"
                            onChange={handleChange} 
                            type="text" 
                            name="phno" 
                            id="phno" 
                            isValid = {!errors.phno}
                            value = {formValues.phno}
                            />
                            <Form.Control.Feedback style = {{color: "red"}}>{errors?.phno}</Form.Control.Feedback>
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
                        <Form.Group  style = {{marginTop: "2rem"}}>
                
                        <Form.Control
                            style={{ border: "2px solid #164473", borderRadius: 10 }}
                            placeholder="Hospital Email"
                            className = "form-control"
                            onChange={onchange} 
                            type="file" 
                            name="hospital_image" 
                            id="hospital_image" 
                            isValid = {!errors.hospital_image}  
                        />
                        <Form.Control.Feedback style = {{color: "red"}}>{errors?.hospital_image}</Form.Control.Feedback>
                    </Form.Group>
                </Form>  
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick = {edithospital}>Submit</button>
            </div>
            </div>
      </div>
    </div>
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h1 className = "dashboardTitle">Hospital Profile</h1>
            </div>
        </div> 
    </div>
    <div className="container">
        <div className = "HospitalInfo mb-5">
        <div className = "row">
            <div className = "col-md-4">
                { 
                    hospital_data.map((target,index) => (
                        <div className = "HospitalDetails" key = {index}>
                            <img style={{margin:"0px 65px"}} src = {target.avatar[0]?target.avatar:`${constants.serverBaseUrl}/view?filepath=./tmp/pngegg.png`} alt = ""/>                             
                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" disabled={isSubmitting} type = "submit"><i style = {{fontSize: 14}} className= "fa fa-pencil"></i></button> 
                            <h2>{target.hospital_name}</h2>
                            <h6>{target.google_location}</h6><br/>
                            <div className= "d-flex text-left">
                                <i className = "fa fa-map-marker pr-3"></i>&nbsp;&nbsp;
                                <h3>{target.address}</h3>
                            </div>
                            <div className= "d-flex text-left">
                                <i className = "fa fa-phone"></i>&nbsp;&nbsp;
                                <h3>{target.phno}</h3>
                            </div>
                            <div className= "d-flex text-left">
                                <i className = "fa fa-map-marker"></i>&nbsp;&nbsp;
                                <h3>{target.hospital_email}</h3> 
                            </div>
                        </div>
                    ))
                }
                <div className = "HospitalGallary mt-3">
                    <h4>Gallery</h4> 
                    <ImageUpload/>  
                </div>
            </div>
            <div className = "col-md-8 ">
                <div className = "HospitalServices">
                    <div className = "row">
                        <div className = "col-md-10">
                            <h4>Our Specialities</h4>
                        </div>
                        <div className = "col-md-1 text-center">
                            <button data-bs-toggle="modal" data-bs-target="#exampleModal1"><i className = "fa fa-trash"></i></button>
                         </div>
                         <div className = "col-md-1 text-center">
                            <button data-bs-toggle="modal" data-bs-target="#exampleModal2"><i className = "fa fa-pencil"></i></button>
                        </div>
                    </div>
                    <ul className="ServicesAlign">
                        { 
                            speciality.map((item,index) => (
                            <li key = {index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className = "HospitalInsurance mt-3">
                    <div className = "row">
                        <div className = "col-md-10">
                            <h4>Insurance</h4>
                        </div>
                        <div className = "col-md-1 text-center">
                            <button data-bs-toggle="modal" data-bs-target="#exampleModal3"><i className = "fa fa-trash"></i></button>
                         </div>
                         <div className = "col-md-1 text-center">
                            <button data-bs-toggle="modal" data-bs-target="#exampleModal4"><i className = "fa fa-pencil"></i></button>
                        </div>
                    </div>
                    <div className = "row justify-content-center align-items-center">
                        { 
                            insurance.map((target,index) => (
                            <div className="col-md-4" key = {index} >    
                                <div className = "HospitalInsuranceDetail">
                                    <h6>{target.insurance_company_name}</h6>
                                    <h6>Type : {target.type}</h6>
                                </div>
                            </div>
                            ))}
                    </div>
                </div>                    
            </div>        
        </div>
        </div>  
    </div>  
    </>
        );
    }


export default ADMIN_HOSPITAL_PROFILE;