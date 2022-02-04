import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
// import ReactDatePicker from "react-datepicker";
import * as auth_service from "../../service/auth_service";

import { MdPerson, MdUploadFile } from "react-icons/md";
import { validationSchema } from "./addfamilyValidation";
function AddFamily(props) {
    const hiddenFileInputInsurance = React.useRef(null);
    const [formValues, setFormValues] = useState();
    const [errors, setErrors] = useState();
    const [insurance, setInsurance] = useState();
    //   const [dateerrors,setDateErrors] = useState({
    //         dateOne:"",
    //     });
    const handleFileInsuranceClick = (event) => {
        hiddenFileInputInsurance.current.click();
    };
    //   const DatePickerInput = forwardRef(({ value, onClick, text }, ref) => (
    //       <input readOnly placeholder={text} className="form-control global-inputs" onClick={onClick} ref={ref} value={value} />
    //   ));
    //   const [DateOne, setDateOne] = useState();
    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = await validate(formValues);
        setErrors(err);

        if (Object.keys(err).length === 0) {
            const formData = new FormData();
            let data = localStorage.getItem("login_patient");
            data = JSON.parse(data);

            //   formValues.patient_id = data._id;
            //   formValues.patient_name = data.name;

            formData.append("insurance_card_copy", insurance);
            formData.append("first_name", formValues.first_name);
            formData.append("last_name", formValues.last_name);

            const add_family = await auth_service.addFamilyMember(
                data._id,
                formData
            );
            if (add_family.payload) {
                props.handleFamilyClose();
            } else {
                alert(add_family.message);
            }
        }
    };
    const validate = async (values) => {
        try {
            // setDateErrors({dateOne:DateOne === undefined ? "required" : ""});
            await validationSchema.validate(values, { abortEarly: false });
            return {};
        } catch (err) {
            let errObj = {};
            for (let { path, message } of err.inner) {
                errObj[path] = message;
            }

            return errObj;
        }
    };
    const handleFiles = (e) => {
        const { name } = e.currentTarget;
        if (name === "reports") {
            // setReports(e.target.files)
        } else {
            setInsurance(e.target.files[0]);
        }
    };

    return (
        <>
            <Modal
                show={props.modalshow}
                onHide={props.handleFamilyClose}
                centered
            >
                <div className="form-container m-5">
                    <h2 className="p-1 card-title text-center">Add Family</h2>
                    <Form
                        className="row justify-content-center"
                    >
                        <div className="row justify-content-center">
                            <div className="col-10">
                                <Form.Group>
                                    <div className="prepend-icon">
                                        <MdPerson />
                                    </div>
                                    <Form.Control
                                        type="text"
                                        name="first_name"
                                        placeholder="First Name"
                                        onChange={handleChange}
                                        className="global-inputs"
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
                            <div className="col-10">
                                <Form.Group>
                                    <div className="prepend-icon">
                                        <MdPerson />
                                    </div>
                                    <Form.Control
                                        type="text"
                                        name="last_name"
                                        placeholder="Last Name"
                                        onChange={handleChange}
                                        className="global-inputs"
                                        isInvalid={errors?.last_name}
                                    />
                                    <Form.Control.Feedback
                                        style={{ color: "red" }}
                                        type="invalid"
                                    >
                                        {errors?.last_name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-10 col-md-7">
                                <Form.Group>
                                    <div className="prepend-icon">
                                        <MdUploadFile />
                                    </div>

                                    <div
                                        role="button"
                                        onClick={handleFileInsuranceClick}
                                        className="global-file-input"
                                    >
                                        <p>
                                            {insurance === undefined
                                                ? "Upload Insurance Details"
                                                : insurance.name}
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        name="insurance"
                                        ref={hiddenFileInputInsurance}
                                        accept="image/*,application/pdf"
                                        style={{ display: "none" }}
                                        onChange={handleFiles}
                                    />
                                </Form.Group>
                            </div>
                            <div className="text-center mt-4">
                                <input
                                    className="form-button"
                                    type="button"
                                    onClick={(e) => handleSubmit(e)}
                                    value="SUBMIT"
                                />
                            </div>
                        </div>
                    </Form>
                </div>
                <div className="modal-footer"></div>
            </Modal>
        </>
    );
}
export default AddFamily;
