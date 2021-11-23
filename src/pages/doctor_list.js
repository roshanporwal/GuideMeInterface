import React, { useState, useEffect } from "react";
import 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import { Form } from 'react-bootstrap'
import { doctorSchema } from "../components/Validations/doctorValidation";
import * as auth_service from "../services/auth_service";
import './style.css'
import HospitalNavbar from "../Navbar/hospital_navbar";
import ReactGifLoader from '../components/gif_loader';
import constants from "../constant";

function DOCTOR_LIST(props) {
  
  const [doctor, setDoctor] = useState([])
  const [doctor_avatar, setDoctor_avatar] = useState()
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const [formValues, setFormValue] = useState({
    doctor_name: "",
    speciality: "",
    doctor_bio: "",
    avatar_name: "",
  })
  const [isSubmitting] = useState(false)
  useEffect(() => {

    fetchData().then(() => setLoading(false));
  }, []);

  async function fetchData(props) {

    let data = localStorage.getItem("login")
    data = JSON.parse(data)
    const getdoctor = await auth_service.getdoctorbyhospital(data._id, data.login_id)
    if(getdoctor.payload){
      setDoctor(getdoctor.payload)
    }
    
  }


  const onchange = async (e) => {
    setDoctor_avatar(e.target.files[0])
  }
  const handleChange = e => {
    const { name, value } = e.currentTarget
    setFormValue(prevState => ({
      ...prevState,
      [name]: value
    }))
    validate(formValues);
    // const fileUploaded = e.target.files;
    // props.handleFile(fileUploaded);
  }
  const validate = async (values) => {
    try {

      await doctorSchema.validate(values, { abortEarly: false });
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
    let data = localStorage.getItem("login")
    data = JSON.parse(data)
    const err = await validate(formValues);


    setErrors(err);
    if(Object.keys(err).length === 0){
    const formData = new FormData();
    if (doctor_avatar) {
      formData.append('doctor_avatar', doctor_avatar);
    }

    formData.append('formValues', JSON.stringify(formValues))
    setValidated(true);
    const updatedoctor = await auth_service.updatedoctor(data.login_id, formValues.login_id, formData)
    if (updatedoctor.payload) {
      window.location.reload();
    } else {
      alert("Their is no Changes")
      window.location.reload();
    }
  }
  };

  const handleSubmit_addnew = async (event) => {
    event.preventDefault();
    let data = localStorage.getItem("login")
    data = JSON.parse(data)
    const err = await validate(formValues);
    setErrors(err);
    if(Object.keys(err).length === 0){
    formValues.login_id = formValues.doctor_name.replace(/\s/g, "")
    formValues.hospital_id = data._id
    formValues.password = "admin"
    const formData = new FormData();
    if (doctor_avatar) {
      formData.append('doctor_avatar', doctor_avatar);
    }
    formData.append('formValues', JSON.stringify(formValues))
    setValidated(true);

    const create = await auth_service.createdoctor(formData)
    if (create.payload) {
      window.location.reload();
    } else {
      alert("Something went wrong")
      window.location.reload();
    }
  }

  };


 



  if(loading === true)
  return (
     <>
     <ReactGifLoader />
     </>
   )
   else



  return (
    <>
    <HospitalNavbar/>
      <div>

        <div className="modal fade" id="EditDoctorModel" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Doctor</h5>

              </div>
              <div className="modal-body">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group>

                    <Form.Control
                      style={{ border: "2px solid #164473", borderRadius: 10 }}
                      placeholder="Doctor Name"
                      className="form-control"
                      onChange={handleChange}
                      type="text"
                      name="doctor_name"
                      id="doctor_name"
                      isValid={!!errors.doctor_name}
                      value={formValues.doctor_name}
                    />
                    <Form.Control.Feedback style={{ color: "red" }}>{errors?.doctor_name}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group style={{ marginTop: "2rem" }}>

                    <Form.Control
                      style={{ border: "2px solid #164473", borderRadius: 10 }}
                      placeholder="Doctor Speciality"
                      className="form-control"
                      onChange={handleChange}
                      type="text"
                      name="speciality"
                      id="speciality"
                      isValid={!!errors.speciality}
                      value={formValues.speciality}
                    />
                    <Form.Control.Feedback style={{ color: "red" }}>{errors?.speciality}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group style={{ marginTop: "2rem" }}>

                    <Form.Control as="textarea" rows={4}
                      style={{ border: "2px solid #164473", borderRadius: 10 }}
                      placeholder="Doctor Bio"
                      className="form-control"
                      onChange={handleChange}
                      type="tex"
                      name="doctor_bio"
                      id="doctor_bio"
                      isValid={!errors.doctor_bio}
                      value={formValues.doctor_bio}
                    />
                    <Form.Control.Feedback style={{ color: "red" }}>{errors?.doctor_bio}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group style={{ marginTop: "1rem" }}>

                    <Form.Control
                      style={{ border: "2px solid #164473", borderRadius: 10 }}
                      label="Add Photo"
                      className="form-control"
                      onChange={onchange}
                      type="file"
                      name="doctor_photo"
                      id="doctor_photo"
                      ref={hiddenFileInput}
                      isValid={!errors.doctor_photo}
                    />
                    {/* <button onClick = {handleClick} className = "join_button">Upload a photo<i className="fa fa-upload" aria-hidden="true" style = {{fontSize: 18, paddingLeft: 10}}></i></button> */}
                    <Form.Control.Feedback style={{ color: "red" }}>{errors?.doctor_photo}</Form.Control.Feedback>
                  </Form.Group>
                </Form>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="AddDoctorModel" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add a Doctor</h5>

              </div>
              <div className="modal-body">
                <Form noValidate validated={validated} onSubmit={handleSubmit_addnew}>
                  <Form.Group>

                    <Form.Control
                      style={{ border: "2px solid #164473", borderRadius: 10 }}
                      placeholder="Doctor Name"
                      className="form-control"
                      onChange={handleChange}
                      type="text"
                      name="doctor_name"
                      id="doctor_name"
                      isValid={!!errors.doctor_name}
                      value={formValues.doctor_name}
                    />
                    <Form.Control.Feedback style={{ color: "red" }}>{errors?.doctor_name}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group style={{ marginTop: "2rem" }}>

                    <Form.Control
                      style={{ border: "2px solid #164473", borderRadius: 10 }}
                      placeholder="Doctor Speciality"
                      className="form-control"
                      onChange={handleChange}
                      type="text"
                      name="speciality"
                      id="speciality"
                      isValid={!!errors.speciality}
                      value={formValues.speciality}
                    />
                    <Form.Control.Feedback style={{ color: "red" }}>{errors?.speciality}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group style={{ marginTop: "2rem" }}>

                    <Form.Control as="textarea" rows={4}
                      style={{ border: "2px solid #164473", borderRadius: 10 }}
                      placeholder="Doctor Bio"
                      className="form-control"
                      onChange={handleChange}
                      type="tex"
                      name="doctor_bio"
                      id="doctor_bio"
                    
                      value={formValues.doctor_bio}
                    />
                    
                  </Form.Group>
                  <Form.Group style={{ marginTop: "1rem" }}>

                    <Form.Control
                      style={{ border: "2px solid #164473", borderRadius: 10 }}
                      label="Add Photo"
                      className="form-control"
                      onChange={onchange}
                      type="file"
                      name="doctor_photo"
                      id="doctor_photo"
                      ref={hiddenFileInput}
                      
                    />
                    {/* <button onClick = {handleClick} className = "join_button">Upload a photo<i className="fa fa-upload" aria-hidden="true" style = {{fontSize: 18, paddingLeft: 10}}></i></button> */}
                   
                  </Form.Group>
                </Form>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit_addnew}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
              <h1 className = "dashboardTitle">Our Doctors</h1>
          </div>
        </div> 
      </div>
      <div className="container">
        <div className="row">
            <div className="offset-lg-11 col-md-1">
            <button onClick={() => setFormValue({
              doctor_name: "",
              speciality: "",
              doctor_bio: "",
              avatar_name: "",
            })} data-bs-toggle="modal" data-bs-target="#AddDoctorModel" type="submit" className="AddDoctor"><i className="fa fa-user-plus"></i></button>
            </div>
        </div>
      </div>
      
      <div className="container">
        {
          doctor.map((target, index) => (
            <div key={index}>  
             <div className="DoctorBox">       
                <div className="row">    
                  <div className="col-md-3 text-center">
                    <img className="doctor_image"
                    src={target.avatar ? target.avatar : `${constants.serverBaseUrl}/view?filepath=./tmp/doctor_image.jpg`}
                    alt="" />
                    <h2>{target.doctor_name}</h2>
                    <h3>{target.speciality}</h3>  
                  </div>
                  <div className="col-md-8">
                    <h5> {target.doctor_bio}</h5>
                  </div>
                  <div className="col-md-1">
                    <div className="EditDoctorIcon">
                      <button data-bs-toggle="modal" data-bs-target="#EditDoctorModel" disabled={isSubmitting} onClick={() => { setFormValue({}); setFormValue(target) }} type="submit"><i className="fa fa-pencil"></i></button>
                    </div>
                  </div>
                </div> 
                </div> 
              </div>  
            ))
          }
      </div>  
    </>
  );



}

export default DOCTOR_LIST;