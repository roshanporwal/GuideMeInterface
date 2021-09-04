import React, { useState } from "react";
import 'font-awesome/css/font-awesome.min.css';
import {MultiSelect} from "react-multi-select-component";

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

    "quotations": [
        {
            "vital_estimate": "$10000",
            "vital_treatment": "some text",
            "vital_inclusions": "some text",
            "vital_exclusions": "some text",
            "vital_copay": "$1000",
            "vital_anesthesia": "Local",
            "vital_room": "super deluxe",
            "vital_length": "5 days",
            "vital_free_upgrade": "yes",
            "vital_physiotherapy": "no",
            "vital_pickup_drop": "can be arranged",
            "vital_other_fees": "gynacology",
            "vital_annual": "for patient"
        },

        {
            "meodor_estimate": "$10000",
            "meodor_treatment": "some text",
            "meodor_inclusions": "some text",
            "meodor_exclusions": "some text",
            "meodor_copay": "$1000",
            "meodor_anesthesia": "Local",
            "meodor_room": "super deluxe",
            "meodor_length": "5 days",
            "meodor_free_upgrade": "yes",
            "meodor_physiotherapy": "no",
            "meodor_pickup_drop": "can be arranged",
            "meodor_other_fees": "gynacology",
            "meodor_annual": "for patient"
        }
    ]
}





function ADMIN_PATIENT_DASHBOARD(props){
    
    
        const options = [
          { label: "Hospital 1", value: "hospital1" },
          { label: "Hospital 2", value: "hospital2" },
          { label: "Hospital 3", value: "hospital3" },
         
        ];
      
        const [selected, setSelected] = useState([]);  
    
   
        
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
                ))}<div>
                <h4>Select Hospitals</h4>
                {/* <pre>{JSON.stringify(selected)}</pre> */}
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                />
              </div>         
                </div>
                
                </div>
                <div className = "col-md-12" style = {{marginTop: 20}}>
                    <div className = "col-md-3">
                        
                    </div>
                    <div className = "col-md-3">
                        <p><b>Hospital 1</b></p>
                    </div>
                    <div className = "col-md-3">
                        <p><b>Hospital 2</b></p>
                    </div>
                    <div className = "col-md-3">
                        <p><b>Hospital 3</b></p>   
                    </div>
                </div>
                 <div className = "col-md-12" >
                    <div className = "col-md-3" style = {{textAlign: "center"}}>
                        <p><b>Estimate Price</b></p>
                        <p><b>Treatment Plan</b></p>
                        <p><b>Inclusions</b></p>
                        <p><b>Exclusions</b></p>
                        <p><b>Copay Required</b></p>
                        <p><b>Types of Anesthesia</b></p>
                        <p><b>Type of room</b></p>
                        <p><b>Length of stay</b></p>
                        <p><b>Free room upgrade</b></p>
                        <p><b>Free Physiotherapy</b></p>
                        <p><b>Pickup and drop</b></p>
                        <p><b>Other free consultation</b></p>
                        <p><b>Free Annual checkup</b></p>
                    </div>
                    { 
                res.quotations.map((target,index) => (
                    <div className = "col-md-3" key = {index} {...target}>
                        <p>{target.vital_estimate}</p>
                        <p>{target.vital_treatment}</p>
                        <p>{target.vital_inclusions}</p>
                        <p>{target.vital_exclusions}</p>
                        <p>{target.vital_copay}</p>
                        <p>{target.vital_anesthesia}</p>
                        <p>{target.vital_room}</p>
                        <p>{target.vital_length}</p>
                        <p>{target.vital_free_upgrade}</p>
                        <p>{target.vital_physiotherapy}</p>
                        <p>{target.vital_pickup_drop}</p>
                        <p>{target.vital_other_fees}</p>
                        <p>{target.vital_annual}</p>
                    </div>
                ))}
{ 
                res.quotations.map((target,index) => (
                    <div className = "col-md-3" key = {index} {...target}>
                        <p>{target.meodor_estimate}</p>
                        <p>{target.meodor_treatment}</p>
                        <p>{target.meodor_inclusions}</p>
                        <p>{target.meodor_exclusions}</p>
                        <p>{target.meodor_copay}</p>
                        <p>{target.meodor_anesthesia}</p>
                        <p>{target.meodor_room}</p>
                        <p>{target.meodor_length}</p>
                        <p>{target.meodor_free_upgrade}</p>
                        <p>{target.meodor_physiotherapy}</p>
                        <p>{target.meodor_pickup_drop}</p>
                        <p>{target.meodor_other_fees}</p>
                        <p>{target.meodor_annual}</p>
                    </div>
                ))}
                <div className = "col-md-3">
                    AWAITING FOR QUOTATION
                </div>
                </div>   
                <div>
                <button style={{ width: "100%", marginBottom: 30 }} className="join_button">Forward to Patient</button>
                </div>  
            </>
        );
    
}

export default ADMIN_PATIENT_DASHBOARD;


