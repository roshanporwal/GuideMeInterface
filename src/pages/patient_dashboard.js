import React, {useState, useEffect} from "react";
import 'font-awesome/css/font-awesome.min.css';
import {quoteSchema} from '../components/Validations/quoteValidation';
import InputField from '../components/input';


const res = {
    "patient_details":[
        {
          "id":1,
          "patient_name": "Bessie Cooper",
          "patient_phone": "(316) 555 0116",
          "patient_email": "bessie.c@gmail.com",
          "patient_age": "31",
          "patient_gender": "female",
          "patient_nationality": "USA",
          "patient_language": "English"
        },
        
      ],

      "patient_preferences":[
         {
            "id":1,
            "patient_requirements": "International Expert Opinion",
            "patient_location": "USA",
            "Proposed_date": "23/02/2021",
            "transport_support_needed": "yes",
            "accomodation_other_logistic": "yes",
            "preferred_hospital_visit_type": "multiple visits",
            "food_preferrences": "non-veg, allergic"
         },
      ],

      "queries":[
        {
            "query": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ligula turpis, dapibus sed enim id, pulvinar pharetra turpis. Vivamus condimentum mauris nec nunc feugiat sagittis. Praesent leo ex, ultrices at euismod quis, consequat id mauris. Aenean id lacinia lorem, at pellentesque arcu. Donec imperdiet erat malesuada tellus volutpat ultricies. Quisque urna enim, luctus quis placerat at, venenatis ultricies sapien. In sed tellus non leo interdum faucibus. Sed congue, felis vitae elementum interdum, mi neque faucibus tellus, venenatis varius dolor erat ut eros. Donec non maximus ante, vitae volutpat mi. Suspendisse potenti. Suspendisse lobortis, sapien vel accumsan fermentum, turpis enim consectetur risus, at porta turpis turpis ut urna. Nam ligula orci, tincidunt vitae ante sit amet, mattis volutpat sem. Phasellus interdum rhoncus nulla vitae aliquet. Pellentesque nunc sem, mollis quis lacus eu, malesuada eleifend urna. Morbi et ipsum sit amet tellus ultrices ullamcorper. Cras bibendum a dolor vel sodales. Quisque porttitor sed dolor in commodo. Integer id placerat libero. In posuere blandit nunc, at vehicula enim facilisis sit amet. Nulla justo libero, egestas et magna vel, commodo egestas mauris. Aenean et lacus ultrices enim laoreet fringilla. Etiam porttitor vehicula odio, quis mattis risus posuere quis. Nam accumsan, leo venenatis tincidunt lacinia, mauris arcu ultrices eros, in volutpat neque magna sed augue.",
        }
      ],

      "medical_history": [
        {
            "med1": "Diabetes",
            "med2": "Hypertension",
            "med3": "Bloodpressure",
            "status": "New"
        }
      ],
      "diagnosis":[
        {
            "current_diagnosis": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ligula turpis, dapibus sed enim id, pulvinar pharetra turpis. Vivamus condimentum mauris nec nunc feugiat sagittis. Praesent leo ex, ultrices at euismod quis, consequat id mauris. Aenean id lacinia lorem, at pellentesque arcu. Donec imperdiet erat malesuada tellus volutpat ultricies. Quisque urna enim, luctus quis placerat at, venenatis ultricies sapien. In sed tellus non leo interdum faucibus. Sed congue, felis vitae elementum interdum, mi neque faucibus tellus, venenatis varius dolor erat ut eros. Donec non maximus ante, vitae volutpat mi. Suspendisse potenti. Suspendisse lobortis, sapien vel accumsan fermentum, turpis enim consectetur risus, at porta turpis turpis ut urna. Nam ligula orci, tincidunt vitae ante sit amet, mattis volutpat sem. Phasellus interdum rhoncus nulla vitae aliquet. Pellentesque nunc sem, mollis quis lacus eu, malesuada eleifend urna. Morbi et ipsum sit amet tellus ultrices ullamcorper. Cras bibendum a dolor vel sodales. Quisque porttitor sed dolor in commodo. Integer id placerat libero. In posuere blandit nunc, at vehicula enim facilisis sit amet. Nulla justo libero, egestas et magna vel, commodo egestas mauris. Aenean et lacus ultrices enim laoreet fringilla. Etiam porttitor vehicula odio, quis mattis risus posuere quis. Nam accumsan, leo venenatis tincidunt lacinia, mauris arcu ultrices eros, in volutpat neque magna sed augue.",
        }
      ],
      "doctor_checkbox": [
        {
            "doc1": "Dr Ashiya Leo",
            "doc2": "Dr Badami Sheetal",
            "doc3": "Dr Chatterji Manas",
            "doc4": "Dr abcd",
            "doc5": "Dr pqrs",
            "doc6": "Dr pqrs",
            "doc7": "Dr pqrs",
            "doc8": "Dr pqrs",
            "doc9": "Dr pqrs",
        }
    ],
    "anesthesiologist": [
      {
          "anes1": "Dr Ashiya Leo",
          "anes2": "Dr Badami Sheetal",
          "anes3": "Dr Chatterji Manas",
          "anes4": "Dr Chatterji Manas",
          "anes5": "Dr Chatterji Manas",
          "anes6": "Dr Chatterji Manas",
          "anes7": "Dr Chatterji Manas",
          "anes8": "Dr Chatterji Manas",
          "anes9": "Dr Chatterji Manas",
          "anes10": "Dr Chatterji Manas",
      }
  ],
}





function PATIENT_DASHBOARD() {
    


    const [formValues, setFormValue] = useState({
        select_doctor: "",
        select_anesthesiologist: "",
        treatment_plan: "",
        estimate_price: "",
        inclusion: "",
        exclusion: "",
        expected_length: "",
        estimate_copay: "",
        type_of_anesthesia: "",
        type_of_room: "",
        free_room_upgrade: "",
        free_physiotherapy: "",
        free_other_speciality_consultant: "",
        free_telephonic_feedback: "",
        free_annual_checkup: "",
        pickup_and_drop: "",
        free_patient_dedicated_relationship: "",
        benefits_for_patient: "",
        benefits_for_attendent: "",
        food_menu: "",
        confirmation: "",
        general_disclaimer: "",
        
    })
    /* const [isSubmitting, setIsSubmitting] = useState(false) */
    const [treatment_plan/* , setTreatment_plan */] = useState()
    const [estimate_price/* , setEstimate_price */] = useState()
    /* const [inclusion] = useState()
    const [exclusion] = useState()
    const [expected_length] = useState()
    const [estimate_copay] = useState()
    const [type_of_anesthesia] = useState()
    const [type_of_room] = useState()
    const [free_room_upgrade] = useState()
    const [free_physiotherapy] = useState()
    const [free_other_speciality_consultant] = useState()
    const [free_telephonic_feedback] = useState()
    const [free_annual_checkup] = useState()
    const [pickup_and_drop] = useState()
    const [free_patient_dedicated_relationship] = useState()
    const [benefits_for_patient] = useState()
    const [benefits_for_attendent] = useState()
    const [food_menu] = useState()
    const [confirmation] = useState()
    const [general_disclaimer] = useState()*/
    const [select_doctor, setSelect_doctor] = useState([]);
    const [select_anesthesiologist, setSelect_anesthesiologist] = useState([]);
    const [errors, setErrors] = useState({});


    const [formErrors/* , setFormErrors */] = useState({
        select_doctor: "",
        select_anesthesiologist: "",
        treatment_plan: "",
        estimate_price: "",
        inclusion: "",
        exclusion: "",
        expected_length: "",
        estimate_copay: "",
        type_of_anesthesia: "",
        type_of_room: "",
        free_room_upgrade: "",
        free_physiotherapy: "",
        free_other_speciality_consultant: "",
        free_telephonic_feedback: "",
        free_annual_checkup: "",
        pickup_and_drop: "",
        free_patient_dedicated_relationship: "",
        benefits_for_patient: "",
        benefits_for_attendent: "",
        food_menu: "",
        confirmation: "",
        general_disclaimer: "",
    })

   



    function checkBox(name, value) {

        if (name === "select_doctor") {
            if (select_doctor.find(item => item === value)) {
                setSelect_doctor(select_doctor.filter(item => item !== value));

            } else {
                setSelect_doctor(prevArray => [...prevArray, value]);
            }
        } else if (name === "select_anesthesiologist") {
            if (select_anesthesiologist.find(item => item === value)) {
                setSelect_anesthesiologist(select_anesthesiologist.filter(item => item !== value));

            } else {
                setSelect_anesthesiologist(prevArray => [...prevArray, value]);
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const err = await validate(formValues);
        console.log(err)
        setErrors(err); 

        
        const formData = new FormData();
        formValues.select_doctor = select_doctor;
        formValues.select_anesthesiologist = select_anesthesiologist;
      
        formData.append('treatment_plan', treatment_plan);
        formData.append('estimate_price', estimate_price);
        formData.append('formValues', JSON.stringify(formValues))
        
        console.log(formValues)

      

        /* const login = await auth_service.enquries(formData)
         console.log(login)*/
    };

  



    const handleChange = e => {
        const { name, value } = e.currentTarget
        setFormValue(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    /* const onchange = e => {
        const { name } = e.currentTarget

        if (name === 'treatment_plan') {
            setTreatment_plan(e.target.files[0])
        } else if(name === 'estimate_price') {
            setEstimate_price(e.target.files[0])
        } 

    } */
    const validate = async (values) => {
        try {

            await quoteSchema.validate(values, { abortEarly: false });
            return {};
        } catch (err) {
            let errObj = {};
             for (let { path, message } of err.inner) {
                errObj[path] = message;
            }
            return errObj;
        }
    }; 
   
    
        return (
            <>
           
            <div className = "d-flex">
                <div className = "col-3 column_small">
                { 
                res.patient_details.map((target,index) => (
            <div key = {index} {...target}>
                    <div className="container_patient_details">
                        <div className="patient_name">
                            <h5><b>{target.patient_name}</b></h5>
                        </div>
                        <div className = "patient_details">
                            <p className="card-text">Phone Number: {target.patient_phone}</p>
                            <p className="card-text">Email: {target.patient_email}</p>
                            <p className="card-text">Age: {target.patient_age}</p>
                            <p className="card-text">Gender: {target.patient_gender}</p>
                            <p className="card-text">Nationality: {target.patient_nationality}</p>
                            <p className="card-text">Language: {target.patient_language}</p>
                        </div>
                    </div>

                    </div>
                ))
    }
                     { 
                res.patient_preferences.map((target,index) => (
            <div key = {index} {...target}>
                    <div className="container_patient_preferences">
                        <div className="patient_name">
                            <h5><b>Patient Preferences</b></h5>
                        </div>
                        
                        <div className = "patient_prefernces_details">
                            <p className="card-text"><b>Patient Requirement:</b><br />{target.patient_requirements}</p>
                            <p className="card-text"><b>Patient Location:</b><br />{target.patient_location}</p>
                            <p className="card-text"><b>Proposed Date:</b><br />{target.Proposed_date}</p>
                            <p className="card-text"><b>Transport Support Needed:</b><br />{target.transport_support_needed}</p>
                            <p className="card-text"><b>Accomodation / Other Logistic:</b><br />{target.accomodation_other_logistic}</p>
                            <p className="card-text"><b>Preferred Hospital Visit Type:</b><br />{target.preferred_hospital_visit_type}</p>
                            <p className="card-text"><b>Food Preferences:</b><br />{target.food_preferrences}</p>
                        </div>
                    </div>
                    </div>
                ))}
                </div>

                <div className = "col-9 column_big">
                { 
                res.medical_history.map((target,index) => (
            <div key = {index} {...target}>
                <div className = "d-flex mt-5">
                    <p><b>Speciality: </b></p>
                    <p style = {{paddingLeft: 10}}>{target.speciality}</p>
                </div>
                    <div className = "d-flex">
                        <p style = {{marginBottom: 5}}><b>Medical History</b></p>
                        <p style = {{paddingLeft: 20}}>{target.med1}</p>
                        <p  style = {{paddingLeft: 20}}>{target.med2}</p>
                        <p  style = {{paddingLeft: 20}}>{target.med3}</p>
                    </div>
                    <div className = "d-flex">
                        <p style = {{marginBottom: 5}}><b>Status:</b></p>
                        <p style = {{paddingLeft: 20}}>{target.status}</p>
                    </div>
                    </div>
                ))}
                    { 
                res.queries.map((target,index) => (
            <div key = {index} {...target}>
                    <div className = "query_container">
                        <div className = "query_title">
                            <h2>Query</h2>
                        </div>
                        <div className = "query_content">
                            <p>{target.query}</p>
                        </div>
                    </div>
                    </div>
                ))
    }
                    <div className = "buttons d-flex">
                        <div>
                            <button className = "download_button" type = "submit">Download Reports<i style = {{fontSize: 16, marginLeft: "40%"}} className="fa fa-download "></i></button>
                        </div>
                        <div>
                        <button className = "view_button" type = "submit">View Insurance<i style = {{fontSize: 16, marginLeft: "40%"}} className="fa fa-eye "></i></button>
                        </div>
                    </div>
                    { 
                res.diagnosis.map((target,index) => (
            <div key = {index} {...target}>
                    <div className = "query_container">
                        <div className = "query_title">
                            <h2>Current Diagnosis</h2>
                        </div>
                        <div className = "query_content">
                            <p>{target.current_diagnosis}</p>
                        </div>
                    </div>
            </div>
                ))}
                    <div style = {{marginLeft: "40%", marginTop: "3%", marginBottom: "4%"}}>
                    <button className = "join_button" type = "submit" onClick={handleSubmit}>Send Quote<i style = {{fontSize: 12, marginLeft: "20%"}} className="fa fa-share"></i></button>
                    </div>
                    <div>
                        <form style = {{border: "2px",borderColor: "#164473", borderRadius: "15px"}} onSubmit={handleSubmit}>
                            <div className = "d-flex">
                            <div>
                            <h5>Select Doctors</h5>
                        { 
            
                res.doctor_checkbox.map((target,index) => (
                    
                        <div  key = {index} {...target} style = {{border: "2px solid #164473", borderRadius: 10, height: "14rem"}} className = "select_doctor">
                            
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_doctor", "Dr Ashiya Leo")} name = {formValues.select_doctor} />
                                <label className="form-check-label">
                                {target.doc1}
                                </label>
                            </div>
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_doctor", "Dr Badami Sheetal")} name = {formValues.select_doctor}/>
                                <label className="form-check-label">
                                {target.doc2}
                                </label>
                            </div>
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_doctor", "Dr Chatterji Manas")} name = {formValues.select_doctor}/>
                                <label className="form-check-label">
                                {target.doc3}
                                </label>

                            </div>
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_doctor", "Dr Chatterji Manas")} name = {formValues.select_doctor}/>
                                <label className="form-check-label">
                                {target.doc4}
                                </label>

                            </div>
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_doctor", "Dr Chatterji Manas")} name = {formValues.select_doctor}/>
                                <label className="form-check-label" >
                                {target.doc5}
                                </label>

                            </div>
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_doctor", "Dr Chatterji Manas")} name = {formValues.select_doctor}/>
                                <label className="form-check-label">
                                {target.doc6}
                                </label>

                            </div>
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_doctor", "Dr Chatterji Manas")} name = {formValues.select_doctor}/>
                                <label className="form-check-label">
                                {target.doc7}
                                </label>

                            </div>
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_doctor", "Dr Chatterji Manas")} name = {formValues.select_doctor}/>
                                <label className="form-check-label">
                                {target.doc8}
                                </label>

                            </div>
                            
                        </div>    
                        
                            
                ))}
                <span style= {{color:"red"}}>{errors?.select_doctor}</span>
            </div>
            <div>
                <h5 style = {{marginLeft: "20rem"}}>Select Anesthesiologist</h5>
                 { 
                res.anesthesiologist.map((target,index) => (
                <div  key = {index} {...target} style = {{border: "2px solid #164473", borderRadius: 10, marginLeft: "20rem", height: "14rem"}} className = "select_doctor">
                
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_anesthesiologist", "Dr Ashiya Leo")} name = {formValues.select_anesthesiologist} />
                                <label className="form-check-label">
                                {target.anes1}
                                </label>
                            </div>
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_anesthesiologist", "Dr Badami Sheetal")} name = {formValues.select_anesthesiologist} />
                                <label className="form-check-label">
                                {target.anes2}
                                </label>
                            </div>
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_anesthesiologist", "Dr Chatterji Manas")} name = {formValues.select_anesthesiologist} />
                                <label className="form-check-label">
                               {target.anes3}
                                </label>
                            </div>
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_anesthesiologist", "Dr Chatterji Manas")} name = {formValues.select_anesthesiologist} />
                                <label className="form-check-label">
                               {target.anes4}
                                </label>
                            </div>
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_anesthesiologist", "Dr Chatterji Manas")} name = {formValues.select_anesthesiologist} />
                                <label className="form-check-label">
                               {target.anes5}
                                </label>
                            </div>
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_anesthesiologist", "Dr Chatterji Manas")} name = {formValues.select_anesthesiologist} />
                                <label className="form-check-label">
                               {target.anes5}
                                </label>
                            </div>
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_anesthesiologist", "Dr Chatterji Manas")} name = {formValues.select_anesthesiologist} />
                                <label className="form-check-label">
                               {target.anes6}
                                </label>
                            </div>
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_anesthesiologist", "Dr Chatterji Manas")} name = {formValues.select_anesthesiologist} />
                                <label className="form-check-label">
                               {target.anes7}
                                </label>
                            </div>
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_anesthesiologist", "Dr Chatterji Manas")} name = {formValues.select_anesthesiologist} />
                                <label className="form-check-label">
                               {target.anes8}
                                </label>
                            </div>
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_anesthesiologist", "Dr Chatterji Manas")} name = {formValues.select_anesthesiologist} />
                                <label className="form-check-label">
                               {target.anes8}
                                </label>
                            </div>
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_anesthesiologist", "Dr Chatterji Manas")} name = {formValues.select_anesthesiologist} />
                                <label className="form-check-label">
                               {target.anes9}
                                </label>
                            </div>
                            <div className = "form-check">
                                <input type = "checkbox" className = "form-check-input" onChange={() => checkBox("select_anesthesiologist", "Dr Chatterji Manas")} name = {formValues.select_anesthesiologist} />
                                <label className="form-check-label">
                               {target.anes10}
                                </label>
                            </div>
                        </div> 
                ))}  
                <span style= {{color:"red", marginLeft: "20rem"}}>{errors?.select_anesthesiologist}</span>
                
                </div> 
                </div>
                <div className = "form-group pt-4">
                <InputField
                        label="Treatment Plan"
                        className ={`form-control ${formErrors.treatment_plan ? "is-invalid" : ""}`}
                        onChange={handleChange} 
                        type="text" 
                        name="treatment_plan" 
                        id="treatment_plan" 
                        value={formValues.treatment_plan}/>
                </div>
                <span style= {{color:"red"}}>{errors?.treatment_plan}</span>
               
                <div className = "form-group pt-4">
                <InputField
                        label="Estimate price"
                        className ={`form-control ${formErrors.estimate_price ? "is-invalid" : ""}`}
                        onChange={handleChange} 
                        type="text" 
                        name="estimate_price" 
                        id="estimate_price" 
                        value={formValues.estimate_price}/>     
                </div>
                <span style= {{color:"red"}}>{errors?.estimate_price}</span>
                
                <div className = "form-group pt-4">
                <InputField
                        label="Inclusions"
                        className ={`form-control ${formErrors.inclusion ? "is-invalid" : ""}`}
                        onChange={handleChange} 
                        type="text" 
                        name="inclusion" 
                        id="inclusion" 
                        value={formValues.inclusion}/>
                </div>
                <span style= {{color:"red"}}>{errors?.inclusion}</span>
               
                <div className = "form-group pt-4">
                <InputField
                        label="Exclusions"
                        className ={`form-control ${formErrors.exclusion ? "is-invalid" : ""}`}
                        onChange={handleChange} 
                        type="text" 
                        name="exclusion" 
                        id="exclusion" 
                        value={formValues.exclusion}/>
                </div>
                <span style= {{color:"red"}}>{errors?.exclusion}</span>
                
                <div className = "form-group pt-4">
                <InputField
                        label="Estimated Co-Pay"
                        className ={`form-control ${formErrors.estimate_copay ? "is-invalid" : ""}`}
                        onChange={handleChange} 
                        type="text" 
                        name="estimate_copay" 
                        id="estimate_copay" 
                        value={formValues.estimate_copay}/>
                </div>
                <span style= {{color:"red"}}>{errors?.estimate_copay}</span>
                
                <div className = "pt-4" style = {{marginLeft: 15}}>
                        <label style = {{marginLeft: 10}}>Types of Anesthesia</label>
                        <div className = "d-flex" style = {{border: "2px solid #164473", borderRadius: 10, height: "5rem", marginRight: 15}}>
                            <div className="form-check">
                            <input
                                style = {{paddingLeft: 4}}
                                
                                className ={`form-check-input ${formErrors.type_of_anesthesia ? "is-invalid" : ""}`}
                                onChange={handleChange} 
                                type="radio" 
                                name="types_of_anesthesia" 
                                id="local" 
                                value="local" /><label>Local</label>
                            </div>
                            <div className="form-check" style = {{paddingLeft: 300}}>
                            <input
                                style = {{paddingLeft: 4}}
                                
                                className ={`form-check-input ${formErrors.type_of_anesthesia ? "is-invalid" : ""}`}
                                onChange={handleChange} 
                                type="radio" 
                                name="types_of_anesthesia" 
                                id="general" 
                                value="general" /><label>General</label>
                            </div>
                            <div className="form-check"  style = {{paddingLeft: 300}}>
                            <input
                                style = {{paddingLeft: 4}}
                        
                                className ={`form-check-input ${formErrors.type_of_anesthesia ? "is-invalid" : ""}`}
                                onChange={handleChange} 
                                type="radio" 
                                name="types_of_anesthesia" 
                                id="epidural" 
                                value="epidural" /><label>Epidural</label>
                            </div>
                    </div>
                    <span style= {{color:"red"}}>{errors?.type_of_anesthesia}</span>
                    </div>
                        <div className = "form-group pt-4">
                        <InputField
                        label="Type of Room"
                        className ={`form-control ${formErrors.type_of_room ? "is-invalid" : ""}`}
                        onChange={handleChange} 
                        type="text" 
                        name="type_of_room" 
                        id="type_of_room" 
                        value={formValues.type_of_room}/> 
                        </div>
                        <span style= {{color:"red"}}>{errors?.type_of_room}</span>
                        
                        <div className = "form-group pt-4">
                        <InputField
                        label="Expected Length of Stay"
                        className ={`form-control ${formErrors.expected_length ? "is-invalid" : ""}`}
                        onChange={handleChange} 
                        type="text" 
                        name="expected_length" 
                        id="expected_length" 
                        value={formValues.expected_length}/>
                        </div>
                        <span style= {{color:"red"}}>{errors?.expected_length}</span>
                
                
                    <div style = {{marginLeft: 20}}>
                        <label>Free Room Upgrade</label>
                    <div className = "d-flex" style = {{border: "2px solid #164473", width: 360,  borderRadius: 10, height: "5rem"}}>
                            <div className="form-check">
                                <input style = {{borderColor: "rgb(56, 56, 121)"}} className="form-check-input" onChange={handleChange} type="radio" name="free_room_upgrade" id="yes"/>
                                <label className="form-check-label">
                                Yes
                                </label>
                            </div>
                            <div className="form-check" style = {{paddingLeft: 100}}>
                                <input style = {{borderColor: "rgb(56, 56, 121)"}} className="form-check-input" onChange={handleChange} type="radio" name="free_room_upgrade" id="no"/>
                                <label className="form-check-label">
                                No
                                </label>
                            </div>
                            <div className="form-check"  style = {{paddingLeft: 100}}>
                                <input style = {{borderColor: "rgb(56, 56, 121)"}} className="form-check-input" onChange={handleChange} type="radio" name="free_room_upgrade" id="at discount"/>
                                <label className="form-check-label">
                                At Discount
                                </label>
                            </div>
                    </div>
                    <span style= {{color:"red"}}>{errors?.free_room_upgrade}</span>
                    
                    </div>
                    <div  style = {{marginLeft: 600, marginTop: -70, marginRight: 20}}>
                        <label>Free Physiotherapy</label>
                        <div className = "d-flex" style = {{border: "2px solid #164473", borderRadius: 10, height: "5rem"}}>
                        
                            <div className="form-check">
                                <input style = {{borderColor: "rgb(56, 56, 121)"}} className="form-check-input" onChange={handleChange} type="radio" name="patient_gender" id="male"/>
                                <label className="form-check-label">
                                Yes
                                </label>
                            </div>
                            <div className="form-check" style = {{paddingLeft: 100}}>
                                <input style = {{borderColor: "rgb(56, 56, 121)"}} className="form-check-input" onChange={handleChange} type="radio" name="patient_gender" id="female"/>
                                <label className="form-check-label">
                                No
                                </label>
                            </div>
                            <div className="form-check"  style = {{paddingLeft: 100}}>
                                <input style = {{borderColor: "rgb(56, 56, 121)"}} className="form-check-input" onChange={handleChange} type="radio" name="patient_gender" id="neutral"/>
                                <label className="form-check-label">
                                At Discount
                                </label>
                            </div>
                        </div>
                        <span style= {{color:"red"}}>{errors?.free_physiotherapy}</span>
                    </div>
                    
                    
               
                <div className = "form-group pt-4">
                <InputField
                        label="For Other speciality Consultation"
                        className ={`form-control ${formErrors.free_other_speciality_consultant ? "is-invalid" : ""}`}
                        onChange={handleChange} 
                        type="text" 
                        name="free_other_speciality_consultant" 
                        id="free_other_speciality_consultant" 
                        value={formValues.free_other_speciality_consultant}/> 
                </div>
                <span style= {{color:"red"}}>{errors?.free_other_speciality_consultant}</span>
                
                        
                    <div className = "pt-4" style = {{marginLeft: 15}}>
                        <label style = {{marginLeft: 10}}>Free Telephonic Feedback from other patients / attendants who have undergone similar treatment</label>
                        <div className = "d-flex" style = {{border: "2px solid #164473", borderRadius: 10, height: "5rem", marginRight: 15}}>
                            <div className="form-check">
                            <input
                                style = {{paddingLeft: 4}}
                                
                                className ={`form-check-input ${formErrors.free_telephonic_feedback ? "is-invalid" : ""}`}
                                onChange={handleChange} 
                                type="radio" 
                                name="free_telephonic_feedback" 
                                id="yes" 
                                value="yes" /><label>Yes</label>
                            </div>
                            <div className="form-check" style = {{paddingLeft: 350}}>
                            <input
                                style = {{paddingLeft: 4}}
                               
                                className ={`form-check-input ${formErrors.free_telephonic_feedback ? "is-invalid" : ""}`}
                                onChange={handleChange} 
                                type="radio" 
                                name="free_telephonic_feedback" 
                                id="no" 
                                value="no" /><label>No</label>
                            </div>
                            <div className="form-check"  style = {{paddingLeft: 350}}>
                            <input
                            
                                
                                className ={`form-check-input ${formErrors.free_telephonic_feedback ? "is-invalid" : ""}`}
                                onChange={handleChange} 
                                type="radio" 
                                name="free_telephonic_feedback" 
                                id="at_discount" 
                                value="at_discount" /><label>At discount</label>
                            </div>
                        </div>
                        <span style= {{color:"red"}}>{errors?.free_telephonic_feedback}</span>
                    </div>
                    
                <div className = "pt-4" style = {{marginLeft: 15}}>
                        <label>Free Annual Checkup</label>
                        <div className = "d-flex" style = {{border: "2px solid #164473", borderRadius: 10, height: "5rem", marginRight: 15}}>
                            <div className="form-check">
                                <input style = {{borderColor: "rgb(56, 56, 121)"}} className="form-check-input" onChange={() => checkBox("free_annual_checkup", "patient")} type="checkbox" name="free_annual_checkup" id="male" value = {formValues.free_annual_checkup}/>
                                <label className="form-check-label">
                                Patient
                                </label>
                            </div>
                            <div className="form-check" style = {{paddingLeft: 350}}>
                                <input style = {{borderColor: "rgb(56, 56, 121)"}} className="form-check-input" onChange={() => checkBox("free_annual_checkup", "family_members")} type="checkbox" name="free_annual_checkup" id="female" value = {formValues.free_annual_checkup}/>
                                <label className="form-check-label">
                                Family Members
                                </label>
                            </div>
                            <div className="form-check"  style = {{paddingLeft: 350}}>
                                <input style = {{borderColor: "rgb(56, 56, 121)"}} className="form-check-input" onChange={() => checkBox("free_annual_checkup", "discounted")} type="checkbox" name="free_annual_checkup" id="neutral" value = {formValues.free_annual_checkup}/>
                                <label className="form-check-label">
                                Discounted
                                </label>
                            </div>
                    </div>
                    <span style= {{color:"red"}}>{errors?.free_annual_checkup}</span>
                </div>
                <div className = "d-flex pt-4" style = {{marginLeft: 15}}>
                    <div>
                        <label>Pickup And Drop</label>
                    <div className = "d-flex" style = {{border: "2px solid #164473", borderRadius: 10}}>
                    <div className="form-check">
                                <input style = {{borderColor: "rgb(56, 56, 121)"}} className="form-check-input" onChange={handleChange} type="radio" name="pickup_and_drop" id="yes" value = "yes" />
                                <label className="form-check-label">
                                Yes
                                </label>
                            </div>
                            <div className="form-check" style = {{paddingLeft: 100}}>
                                <input style = {{borderColor: "rgb(56, 56, 121)"}} className="form-check-input" onChange={handleChange} type="radio" name="pickup_and_drop" id="no" value = "no" />
                                <label className="form-check-label">
                                No
                                </label>
                            </div>
                            <div className="form-check"  style = {{paddingLeft: 100}}>
                                <input style = {{borderColor: "rgb(56, 56, 121)"}} className="form-check-input" onChange={handleChange} type="radio" name="pickup_and_drop" id="could_be_planned" value = "could_be_planned" />
                                <label className="form-check-label">
                                Could be Planned
                                </label>
                            </div>
                    </div>
                    <span style= {{color:"red"}}>{errors?.pickup_and_drop}</span>
                    </div>
                    <div  style = {{paddingLeft: 250, marginRight: 15}}>
                        <label>Dedicated Patient Relationship Executive</label>
                        <div className = "d-flex" style = {{border: "2px solid #164473", borderRadius: 10}}x>
                        
                            <div className="form-check">
                                <input style = {{borderColor: "rgb(56, 56, 121)"}} className="form-check-input" onChange={handleChange} type="radio" name="free_patient_dedicated_relationship" id="yes" value = "yes"/>
                                <label className="form-check-label">
                                Yes
                                </label>
                            </div>
                            <div className="form-check" style = {{paddingLeft: 100}}>
                                <input style = {{borderColor: "rgb(56, 56, 121)"}} className="form-check-input" onChange={handleChange} type="radio" name="free_patient_dedicated_relationship" id="no" value = "no" />
                                <label className="form-check-label">
                                No
                                </label>
                            </div>
                            <div className="form-check"  style = {{paddingLeft: 100}}>
                                <input style = {{borderColor: "rgb(56, 56, 121)"}} className="form-check-input" onChange={handleChange} type="radio" name="free_patient_dedicated_relationship" id="available" value = "available" />
                                <label className="form-check-label">
                                Available to handle issues
                                </label>
                            </div>
                        </div>
                        <span style= {{color:"red"}}>{errors?.free_patient_dedicated_relationship}</span>
                    
                    </div>
                    
                </div>  
                <div className = "form-group pt-4">
                <InputField
                        label="Other Benefits of Patients"
                        className ={`form-control ${formErrors.benefits_for_patient ? "is-invalid" : ""}`}
                        onChange={handleChange} 
                        type="text" 
                        name="benefits_for_patient" 
                        id="benefits_for_patient" 
                        value={formValues.benefits_for_patient}/> 
                        </div>
                        <span style= {{color:"red"}}>{errors?.benefits_for_patient}</span>
                          <div className = "form-group pt-4">
                        <InputField
                        label="Other Benefits of Attendants"
                        className ={`form-control ${formErrors.benefits_for_attendent ? "is-invalid" : ""}`}
                        onChange={handleChange} 
                        type="text" 
                        name="benefits_for_attendent" 
                        id="benefits_for_attendent" 
                        value={formValues.benefits_for_attendent}/> 
                        </div>
                        <span style= {{color:"red"}}>{errors?.benefits_for_attendent}</span>
                        <div className = "form-group pt-4">
                        <InputField
                        label="Other Benefits of Patients"
                        className ={`form-control ${formErrors.food_menu ? "is-invalid" : ""}`}
                        onChange={handleChange} 
                        type="text" 
                        name="food_menu" 
                        id="food_menu" 
                        value={formValues.food_menu}/> 
                        </div>
                        <span style= {{color:"red"}}>{errors?.food_menu}</span>
                        <div className = "form-group pt-4">
                        <InputField
                        label="Confirmed Appointment"
                        className ={`form-control ${formErrors.confirmaion ? "is-invalid" : ""}`}
                        onChange={handleChange} 
                        type="text" 
                        name="confirmation" 
                        id="confirmation" 
                        value={formValues.confirmation}/> 
                        </div>
                        <span style= {{color:"red"}}>{errors?.confirmation}</span>
                       <div className = "form-group pt-4">
                        <InputField
                        label="General Disclaimer"
                        className ={`form-control ${formErrors.general_disclaimer ? "is-invalid" : ""}`}
                        onChange={handleChange} 
                        type="text" 
                        name="general_disclaimer" 
                        id="general_disclaimer" 
                        value={formValues.general_disclaimer}/> 
                        </div>
                        <span style= {{color:"red"}}>{errors?.general_disclaimer}</span>
                        
            </form>
             </div>

                </div>
            </div>
            
                  
            </>
        );
    } 


export default PATIENT_DASHBOARD;


