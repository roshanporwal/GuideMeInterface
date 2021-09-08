import React, {useState,useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import * as auth_service from "../services/auth_service";
import { MultiSelect } from "react-multi-select-component";




/*const res = {
    "patient_details": [
        {
            "id": 1,
            "patient_name": "Bessie Cooper",
            "patient_phone": "(316) 555 0116",
            "patient_email": "bessie.c@gmail.com",
            "patient_age": "31",
            "patient_gender": "female",
            "patient_nationality": "USA",
            "patient_language": "English"
        },

    ],

    "patient_preferences": [
        {
            "id": 1,
            "patient_requirements": "International Expert Opinion",
            "patient_location": "USA",
            "Proposed_date": "23/02/2021",
            "transport_support_needed": "yes",
            "accomodation/other_logistic": "yes",
            "preferred_hospital_visit_type": "multiple visits",
            "food_preferrences": "non-veg, allergic"
        },
    ],

    "queries": [
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
    "diagnosis": [
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
}*/




export default function ADMIN_PATIENT_DASHBOARD(props) {
    const [enqurie_data, setEnqurie_data] = useState([])
    const [hospitals, setHospitals] = useState([])
    const [selected, setSelected] = useState([]);
    const [hopital_enq, setHopital_enq] = useState([]);
    const [show_quota, setShow_quota] = useState(false); 
    useEffect(() => {
       
        fetchData(props);
      }, [props]);


    async function fetchData(props) {

        //  const getenquries = await auth_service.getenquries()
        // setEnquries(getenquries.payload)
        console.log(props)
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
        setEnqurie_data([props.location.state])
        const enq=props.location.state.hospitals
        setHopital_enq(enq)
        if(enq.length !== 0){
            setShow_quota(true)

        }
        const getenquries = await auth_service.gethospitals(data.login_id)
        console.log(getenquries)
        setHospitals(getenquries.payload)
        /*const getenquries1 = await auth_service.getenquriesbyhospitals()
       
        console.log(getenquries1.payload)*/

    }
    /* const handleSubmit = event => {
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
     
       }; */
    const handleSubmit = async (event) => {
        //event.preventDefault();
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
        if(event==="before"){
        console.log(selected.length)
        if(selected.length>3){
           return alert(" Patient details can be shared only with three Hospitals.")
        }else{
            const getenquries = await auth_service.updateenquries(enqurie_data[0]._id, selected, data.login_id)
            if(getenquries.payload){
                setShow_quota(true)

            }
    console.log(getenquries.payload)
        }
    }else{
        console.log(enqurie_data[0])
        const url={
            url:"http://e57a-103-217-84-134.ngrok.io/patient_view?id="+enqurie_data[0]._id,
            email:enqurie_data[0].patient_email   
        }
        console.log(url)
        const getenquries = await auth_service.sendmail( data.login_id,url)
        
        console.log(getenquries)
            if(getenquries.payload){
                alert(getenquries.payload)
                console.log(getenquries)
                

            }
    }
        //const getenquries = await auth_service.updateenquries(enqurie_data[0]._id, selected, data.login_id)
       // console.log(getenquries.payload)

       /*  const login = await auth_service.enquries(formData)
         console.log(login)*/
    };


    /*function checkBox(value) {

        console.log(value)
        if (selecthospital.find(item => item === value)) {
            setSelecthospital(selecthospital.filter(item => item !== value));
        } else {
            setSelecthospital(prevArray => [...prevArray, value]);
        }
    }*/



    return (
        <>

            <div className="d-flex">
                <div className="col-3 column_small">
                    {
                        enqurie_data.map((target, index) => (
                            <div key={index} {...target}>
                                <div className="container_patient_details">
                                    <div className="patient_name">
                                        <h5><b>{target.patient_name}</b></h5>
                                    </div>
                                    <div className="patient_details">
                                        <p className="card-text">Phone Number: {target.patient_mobile}</p>
                                        <p className="card-text">Email: {target.patient_email}</p>
                                        <p className="card-text">Age: {target.patient_age}</p>
                                        <p className="card-text">Gender: {target.patient_gender}</p>
                                        <p className="card-text">Nationality: {target.patient_nationality}</p>
                                        <p className="card-text">Language: {target.languages_spoken}</p>
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                    {
                        enqurie_data.map((target, index) => (
                            <div key={index} {...target}>
                                <div className="container_patient_preferences">
                                    <div className="patient_name">
                                        <h5><b>Patient Preferences</b></h5>
                                    </div>

                                    <div className="patient_prefernces_details">
                                        <p className="card-text"><b>Patient Requirement:</b><br />{target.proposed_treatment_plan}</p>
                                        <p className="card-text"><b>Patient Location:</b><br />{target.patient_nationality}</p>
                                        <p className="card-text"><b>Proposed Date:</b><br />{target.proposal_date}</p>
                                        <p className="card-text"><b>Transport Support Needed:</b><br />{target.transport_support_needed}</p>
                                        <p className="card-text"><b>Accomodation / Other Logistic:</b><br />{target.accomodation}</p>
                                        <p className="card-text"><b>Preferred Hospital Visit Type:</b><br />{target.preferred_hospital_visit}</p>
                                        <p className="card-text"><b>Food Preferences:</b><br />{target.food_preferences}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                <div className="col-9 column_big">
                    {
                        enqurie_data.map((target, index) => (
                            <div key={index} {...target}>
                                <div className="d-flex mt-5">
                                    <p><b>Speciality: </b></p>
                                    <p style={{ paddingLeft: 10 }}>{target.speciality}</p>
                                </div>
                                <div className="d-flex">
                                    <p style={{ marginBottom: 5 }}><b>Medical History</b></p>
                                    <p style={{ paddingLeft: 20 }}>{target.medical_history}</p>
                                    <p style={{ paddingLeft: 20 }}>{target.med2}</p>
                                    <p style={{ paddingLeft: 20 }}>{target.med3}</p>
                                </div>
                                <div className="d-flex">
                                    <p style={{ marginBottom: 5 }}><b>Status:</b></p>
                                    <p style={{ paddingLeft: 20 }}>{target.status}</p>
                                </div>
                            </div>
                        ))}
                    {
                        enqurie_data.map((target, index) => (
                            <div key={index} {...target}>
                                <div className="query_container">
                                    <div className="query_title">
                                        <h2>Query</h2>
                                    </div>
                                    <div className="query_content">
                                        <p>{target.current_diagnosis}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="buttons d-flex">
                        <div>
                            <button className="download_button" type="submit" onClick={() => { window.location.href = enqurie_data[0].reports[1] }} >Download Reports<i style={{ fontSize: 16, marginLeft: "40%" }} className="fa fa-download "></i></button>
                        </div>
                        <div>
                            <button className="view_button" type="submit" onClick={() => { window.location.href = enqurie_data[0].insurance_card_copy[0] }}>View Insurance<i style={{ fontSize: 16, marginLeft: "40%" }} className="fa fa-eye "></i></button>
                        </div>
                    </div>
                    {
                        enqurie_data.map((target, index) => (
                            <div key={index} {...target}>
                                <div className="query_container">
                                    <div className="query_title">
                                        <h2>Current Diagnosis</h2>
                                    </div>
                                    <div className="query_content">
                                        <p>{target.current_diagnosis}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        { show_quota ? null:
                            <div className="pt-5 pb-5">
                        <label>Select Hospital(Please Select any 3)</label>
                        <MultiSelect
                            options={hospitals}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                        />
                        <button style={{ marginTop: 2, marginLeft: 600 }} className="join_button" type="submit" onClick={()=>handleSubmit("before")}>{"Submit"}</button>
                    </div>}
                </div>
            </div>
            {show_quota?
            <div>
            <div className="col-md-12" style={{ marginTop: 20 }}>
                
                <div className="col-md-3">

                </div>
                {
                    hopital_enq.map((target, index) => (
                <div className="col-md-3" key={index} {...target}>
                    <p><b>{target.hospital_name}</b></p>
                </div>
               
                 ))}
                
            </div>
            <div className="col-md-12" >
                <div className="col-md-3" style={{ textAlign: "center" }}>
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
                    hopital_enq.map((target, index) => (
                        <div className="col-md-3" key={index} {...target}>
                            {target.estimate_price ?
                                
                                <div>
                            <p>{target.estimate_price}</p>
                            <p>{target.treatment_plan}</p>
                            <p>{target.inclusion}</p>
                            <p>{target.exclusion}</p>
                            <p>{target.estimate_copay}</p>
                            <p>{target.type_of_anesthesia}</p>
                            <p>{target.type_of_room}</p>
                            <p>{target.free_room_upgrade}</p>
                            <p>{target.free_physiotherapy}</p>
                            <p>{target.pickup_and_drop}</p>
                            <p>{target.free_other_speciality_consultant}</p>
                            <p>{target.free_other_speciality_consultant}</p>
                            <p>{target.free_other_speciality_consultant}</p>
                            </div>

                            :<div className="col-md-3">
                                <p>AWAITING FOR QUOTATION</p>
                            
                        </div>
}

                        </div>
                    ))}
               
            </div>
            <div>
                <button style={{ width: "100%", marginBottom: 30 }} className="join_button" onClick={()=>handleSubmit("after")}>Forward to Patient</button>
            </div>
            </div>:null}



        </>
    );
}




