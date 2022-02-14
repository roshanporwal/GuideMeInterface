import React, { forwardRef } from "react";
import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Logo from "../../assets/guidemedoc-logo.png";
import HeroImage from "../../assets/login-hero.png";
import { FaUserAlt, FaShieldAlt } from "react-icons/fa";
import {
  MdCall,
  MdUploadFile,
  MdEmail,
  MdTransgender,
  MdFlag,
  MdOutlineCalendarToday
} from "react-icons/md";
import DatePicker from "react-datepicker";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import * as auth_service from "../../service/auth_service";
import { signupvalidationSchema } from "./authValidation";
import { Country } from "country-state-city";

function SignUpScreen() {
  const navigate = useNavigate();
  // const [patient_document, setPatient_document] = useState()
  const hiddenFileInputReports = React.useRef(null);
  const [errors, setErrors] = useState();
  const [dateerrors, setDateErrors] = useState({
    dateOne: "",
  });
  const [fileerrors, setFileErrors] = useState({
    insurance: "",
    document: "",
    terms: "",
  });
  const [terms, setTerms] = useState(false);
  const [insurance, setInsurance] = useState();
  const [formValues, setFormValues] = useState({
    mobile: "",
    name: "",
    email: "",
    age: "",
    gender: "",
    referredby: "",
    nationality: "",
    insurance_name: "",
    first_name: "",
    family_name: ""
  });
  const [DateOne, setDateOne] = useState();
  const handleFileReportsClick = (event) => {
    hiddenFileInputReports.current.click();
  };
  
  const handleTermsCheckBox = (e) => {
    setTerms(e.target.checked);
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const countries = Country.getAllCountries();
  const validate = async (values) => {
    try {
      setDateErrors({
        dateOne: DateOne === undefined ? "required" : "",
      });
      setFileErrors({
        terms: terms === false ? "CheckBox is Required" : "",
        // insurance: insurance === undefined ? "Insurance File is Required" : "",
      });
      await signupvalidationSchema.validate(values, { abortEarly: false });
      return {};
    } catch (err) {
      let errObj = {};
      for (let { path, message } of err.inner) {
        errObj[path] = message;
      }

      return errObj;
    }
  };
  const DatePickerInput = forwardRef(({ value, onClick, text }, ref) => (
    <input
      readOnly
      placeholder={text}
      className="form-control signup-inputs"
      onClick={onClick}
      ref={ref}
      value={value}
    />
  ));
  const handleFiles = (e) => {
    const { name } = e.currentTarget;
    if (name === "document") {
      // setPatient_document(e.target.files[0])
    } else {
      setInsurance(e.target.files[0]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = await validate(formValues);
    setErrors(err);
    if (
      Object.keys(err).length === 0 &&
      terms === true
    ) {
      formValues.name = formValues.first_name + " " + formValues.family_name
      formValues.dob = DateOne
      const formData = new FormData();
      formData.append("insurance_card_copy", insurance);
      formData.append("formValues", JSON.stringify(formValues));
      const createaccount = await auth_service.createaccount(formData);
      // console.log(createaccount)
      if (createaccount.payload) {
        navigate("/log-in");
      } else {
        alert(createaccount.message);
      }
    }
    console.log(err)
  };
  return (
    <>
      <div className="container-fluid">
        <Row className="header-row">
          <Col
            role="button"
            lg={{ span: 2, offset: 1 }}
            xs={6}
            onClick={() => navigate("/")}
          >
            <img src={Logo} width={166} alt="company-logo" />
          </Col>
        </Row>
      </div>
      <Container>
        <div className="content-container">
          <div className="row  align-items-center justify-content-center">
            <div className="col-md-4 mt-5 mt-lg-0">
              <div className="login-form-container d-flex flex-column align-items-center">
                <div className="sub-heading mt-3 mb-2">
                  <h5>Create An Account</h5>
                </div>
                <Form onSubmit={(e) => handleSubmit(e)} className="login-form">
                  <div className="row  align-items-center justify-content-center">
                    <div className="col-md-6 mt-5 mt-lg-0">
                      <Form.Group className="my-3">
                        <div className="prepend-icon-auth">
                          <FaUserAlt />
                        </div>
                        <Form.Control
                          type="text"
                          name="first_name"
                          placeholder="First Name"
                          onChange={handleChange}
                          value={formValues.first_name}
                          className="signup-inputs"
                          isInvalid={errors?.first_name}
                        />
                        <Form.Control.Feedback
                          style={{ color: "red" }}
                          type="invalid"
                        >
                          {errors?.first_name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className="col-md-6 mt-5 mt-lg-0">
                      <Form.Group className="my-3">
                        <div className="prepend-icon-auth">
                          <FaUserAlt />
                        </div>
                        <Form.Control
                          type="text"
                          name="family_name"
                          placeholder="Family Name"
                          onChange={handleChange}
                          value={formValues.family_name}
                          className="signup-inputs"
                          isInvalid={errors?.family_name}
                        />
                        <Form.Control.Feedback
                          style={{ color: "red" }}
                          type="invalid"
                        >
                          {errors?.family_name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className="col-md-6 mt-5 mt-lg-0">
                      <Form.Group className="my-3">
                        <div className="prepend-icon-auth">
                          <MdCall />
                        </div>
                        <Form.Control
                          type="text"
                          name="mobile"
                          placeholder="Mobile Number"
                          onChange={handleChange}
                          value={formValues.mobile}
                          className="signup-inputs"
                          isInvalid={errors?.mobile}
                        />
                        <Form.Control.Feedback
                          style={{ color: "red" }}
                          type="invalid"
                        >
                          {errors?.mobile}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className="col-md-6 mt-5 mt-lg-0">
                      <Form.Group className="my-3">
                        <div className="prepend-icon-auth">
                          <MdEmail />
                        </div>
                        <Form.Control
                          type="text"
                          name="email"
                          placeholder="Email Id"
                          onChange={handleChange}
                          value={formValues.email}
                          className="signup-inputs"
                          isInvalid={errors?.email}
                        />
                        <Form.Control.Feedback
                          style={{ color: "red" }}
                          type="invalid"
                        >
                          {errors?.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    
                    <div className="col-md-6 mt-5 mt-lg-0">
                      <Form.Group className="my-3">
                        <div className="prepend-icon-auth">
                          <MdTransgender />
                        </div>
                        <Form.Control
                          as="select"
                          name="gender"
                          placeholder="Gender"
                          onChange={handleChange}
                          value={formValues.gender}
                          className="signup-inputs"
                          isInvalid={errors?.gender}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Form.Control>
                        <Form.Control.Feedback
                          style={{ color: "red" }}
                          type="invalid"
                        >
                          {errors?.gender}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className="col-md-6 mt-5 mt-lg-0">
                    <Form.Group className="my-3">
                        <div className="prepend-icon-auth">
                          <MdOutlineCalendarToday />
                        </div>
                          <DatePicker
                            selected={DateOne}
                            onChange={(date) => {
                              setDateOne(date);
                            }}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dateFormat="dd/MM/yyyy"
                            dropdownMode="select"
                            customInput={<DatePickerInput text="Date of Birth" />}
                          />
                        {dateerrors?.dateOne ? (
                          <Form.Label style={{ color: "red" }} type="valid">
                            Date of Birth is required
                          </Form.Label>
                        ) : null}
                      </Form.Group>
                    </div>
                    <div className="col-md-6 mt-5 mt-lg-0">
                      <Form.Group className="my-3">
                        <div className="prepend-icon-auth">
                          <FaShieldAlt />
                        </div>
                        <Form.Control
                          type="text"
                          name="insurance_name"
                          placeholder="Insurance Name"
                          onChange={handleChange}
                          value={formValues.insurance_name}
                          className="signup-inputs"
                          isInvalid={errors?.insurance_name}
                        />
                        <Form.Control.Feedback
                          style={{ color: "red" }}
                          type="invalid"
                        >
                          {errors?.insurance_name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className="col-md-6 mt-5 mt-lg-0">
                      <Form.Group className="my-3">
                        <div className="prepend-icon-auth">
                          <FaUserAlt />
                        </div>
                        <Form.Control
                          as="select"
                          name="referredby"
                          placeholder="Pt referred by"
                          onChange={handleChange}
                          value={formValues.referredby}
                          className="signup-inputs"
                          isInvalid={errors?.referredby}
                        >
                          <option value="">Select an option</option>
                          <option key="Internal reference" value="Internal reference">Internal reference</option>
                          <option key="Patient reference" value="Patient reference">Patient reference</option>
                          <option key="Social media" value="Social media">Social media</option>
                          <option key="Insurance" value="Insurance">Insurance</option>
                          <option key="TPA" value="TPA">TPA</option>
                        </Form.Control>
                        <Form.Control.Feedback
                          style={{ color: "red" }}
                          type="invalid"
                        >
                          {errors?.referredby}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className="col-md-6 mt-5 mt-lg-0">
                      <Form.Group className="my-3">
                        <div className="prepend-icon-auth">
                          <MdFlag />
                        </div>
                        <Form.Control
                          as="select"
                          name="nationality"
                          placeholder="Nationality"
                          onChange={handleChange}
                          value={formValues.nationality}
                          className="signup-inputs"
                          isInvalid={errors?.nationality}
                        >
                          <option key={1} value = "">Nationality</option>
                          {

                            // console.log(countries)
                            countries.map((e) => 
                              <option key = {e.name} value = {e.name}>{e.name} {e.flag}</option>)
                          }
                        </Form.Control>
                        <Form.Control.Feedback
                          style={{ color: "red" }}
                          type="invalid"
                        >
                          {errors?.nationality}
                        </Form.Control.Feedback>
                        
                      </Form.Group>
                    </div>
                    <div className="col-md-6 mt-5 mt-lg-0">
                      <Form.Group className="my-3">
                        <div className="prepend-icon-auth">
                          <MdUploadFile />
                        </div>
                        <div
                          role="button"
                          onClick={handleFileReportsClick}
                          className="global-file-input"
                        >
                          <p>Upload Insurance</p>
                        </div>
                        <Form.Control
                          type="file"
                          name="insurance"
                          ref={hiddenFileInputReports}
                          accept="image/*,application/pdf"
                          style={{ display: "none" }}
                          onChange={handleFiles}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className="my-3">
                    <div className = "row">
                      <div className="col-1">
                      <Form.Check
                        id = "terms-condition"
                        name="terms-condition"
                        value={formValues.mobile}
                        type="checkbox"
                        // label="I agree to terms & conditions."
                        onChange={handleTermsCheckBox}
                        isInvalid={fileerrors?.terms}
                      />
                      </div>
                      <div className="col-10">
                        <Form.Label for="terms-condition">I agree to <a href="/terms-and-conditions" target="_blank">terms & conditions.</a></Form.Label>
                      </div>
                    </div>
                    <Form.Control.Feedback
                      style={{ color: "red" }}
                      type="invalid"
                    >
                      {fileerrors?.terms}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="text-center mt-4">
                    <button className="sign-up-button">SIGN UP</button>
                  </div>
                </Form>
              </div>
            </div>
            <div className="col-md-4 col-11 offset-md-2">
              <div className="text-center">
                <h1 className="heading">Welcome!</h1>
              </div>
              <img src={HeroImage} width="100%" alt="company-logo" />
            </div>
          </div>
        </div>
      </Container>
      <div className="footer-row"></div>
    </>
  );
}

export default SignUpScreen;
