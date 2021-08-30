import React from "react";
import 'font-awesome/css/font-awesome.min.css';

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
            "accomodation/other_logistic": "yes",
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
            "status": "New",
            "speciality": "Gasteroenterology",
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
          }
      ],
      "anesthesiologist": [
        {
            "anes1": "Dr Ashiya Leo",
            "anes2": "Dr Badami Sheetal",
            "anes3": "Dr Chatterji Manas",
        }
    ],
}



class ADMIN_PATIENT_DASHBOARD extends React.Component{
    constructor() {
        super();
        this.state = {
            name: 'React',
            
        };
      }
      handleSubmit = event => {
        event.preventDefault();
        this.setState({ isSubmitting: true });
        const { formValues, formValidity } = this.state;
        if (Object.values(formValidity).every(Boolean)) {
          alert("Form is validated! Submitting the form...");
          this.setState({ isSubmitting: false });
        } else {
          for (let key in formValues) {
            let target = {
              name: key,
              value: formValues[key]
            };
            this.handleValidation(target);
          }
          this.setState({ isSubmitting: false });
        }
        console.log({formValues});
    
      }; 
    
    render(){
        
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
                            <p className="card-text"><b>Accomodation / Other Logistic:</b><br />{target["accomodation/other_logistic"]}</p>
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
                ))}<div className = "pt-5 pb-5">
                    <label>Select Hospital</label>
                    <select  style = {{borderColor: "rgb(56, 56, 121)"}} className = "form-control" name="hospital" id="hospital">
                        <option value="hospital_1">Hospital 1</option>
                        <option value="hospital_2">Hospital 2</option>
                        
                    </select>
                    </div>                   
                </div>
                
                </div>
                    
                  
            </>
        );
    } 
}

export default ADMIN_PATIENT_DASHBOARD;


