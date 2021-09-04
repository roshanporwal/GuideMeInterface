import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import Pagination from "react-js-pagination";
import 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';
import  * as auth_service from "../services/auth_service";


const res = {
    "enquiries": [
        {
            "total": "153",
            "new": "20",
            "awaiting": "34",
            "lost": "12",
            "won": "56"
        }
    ],
    "alert": [
        {
            "pending": "13",
            "hours": "1",
            "minutes": "44"
        }
    ],

    "patient_table": [
        {
            "id": 1,
            "name": "Monica Latte",
            "query": "I was having abdominal pain and indigestion which was making me nauseous when i looked at food",
            "insurance/tpa": "Afiya",
            "date": "17/08/21",
            "time": "03:48 AM",
            "speciality": "Gastreoenterology",
            "status": "New"
        },
        {
            "id": 2,
            "name": "Wade Warren",
            "query": "I have painless bleeding during bowel movements.I have noticed small amount of bright red color blood on your toilet tissue",
            "insurance/tpa": "Allianz",
            "date": "15/08/21",
            "time": "05:45 AM",
            "speciality": "Proctology",
            "status": "Awaiting"
        },
        {
            "id": 3,
            "name": "Mukesh Kumar",
            "query": "Not able to taste food, feeling dizzy all the time",
            "insurance/tpa": "Petersons",
            "date": "12/05/21",
            "time": "03:43 AM",
            "speciality": "physiology",
            "status": "New"
        }
    ]
}

const state = {
    labels: ['Awaiting Patients', 'Won Patients', 'Lost Patients',
        'New Patients'],
    datasets: [
        {
            label: 'Patients',
            backgroundColor: [
                'rgb(119, 136, 153)',
                'rgb(65, 105, 625)',
                'rgb(0, 0, 225)',
                'rgb(56, 56, 121)'
            ],
            hoverBackgroundColor: [
                '#501800',
                '#4B5000',
                '#175000',
                '#003350',
            ],
            data: [65, 59, 80, 81]
        }
    ]
}

function HOSPITAL_DASHBOARD(props) {

    const history = useHistory();
    const [enquries, setEnquries] = useState([])


    useEffect(() => {

        fetchData();
    }, []);


    async function fetchData() {
        let data=localStorage.getItem("login")
        data= JSON.parse(data)
        //console.log("data",data)
        const getenquries = await auth_service.getenquriesbyhospitals(data.login_id);
        console.log(getenquries)
        
        //console.log(getenquries.payload,"hospitals")
        for(const st of getenquries.payload){
            const hospital =st.hospitals.find(item => item.hospital_login === data.login_id) 
            st.status= hospital.status
        }
        setEnquries(getenquries.payload);

        
    }
   
    const handleSubmit = async (event) => {
        
        // history.push(,{params:event});
      
       
         history.push({
             pathname:'/patient',
             state:event
           });
 
        
         console.log("formValues")
 
         /* const login = await auth_service.enquries(formData)
          console.log(login)*/
     };

    return (
        <>
            <div className="hospital_dashboard_title">
                <h1>Hospital Dashboard</h1>
            </div>
            {
                res.enquiries.map((target, index) => (

                    <div key={index}{...target}>
                        <div style={{ justifyContent: "center", paddingTop: "2rem" }} className="enquiries  d-flex">
                            <div className="total_enquiries">
                                <div className="d-flex">
                                    <i style={{ fontSize: 32, paddingLeft: "1rem", marginTop: "25px" }} className="fa fa-file"></i>
                                    <h1 style={{ paddingLeft: "1rem" }}>{target.total}</h1>
                                </div>
                                <h3>Total Enquiries</h3>
                            </div>
                            <div style={{ paddingLeft: "3rem" }} className="new_enquiries">
                                <div className="d-flex">
                                    <i style={{ fontSize: 32, paddingLeft: "5rem", marginTop: "25px" }} className="fa fa-plus"></i>
                                    <h1 style={{ paddingLeft: "1rem" }}>{target.new}</h1>
                                </div>
                                <h3 style={{ paddingLeft: "5rem" }}>New Enquiries</h3>
                            </div>
                            <div style={{ paddingLeft: "3rem" }} className="new_enquiries">
                                <div className="d-flex">
                                    <i style={{ fontSize: 32, paddingLeft: "5rem", marginTop: "25px" }} className="fa fa-pause"></i>
                                    <h1 style={{ paddingLeft: "1rem" }}>{target.awaiting}</h1>
                                </div>
                                <h3 style={{ paddingLeft: "5rem" }}>Awaiting Enquiries</h3>
                            </div>
                            <div style={{ paddingLeft: "3rem" }} className="new_enquiries">
                                <div className="d-flex">
                                    <i style={{ fontSize: 32, paddingLeft: "5rem", marginTop: "25px" }} className=" fa fa-smile-o "></i>
                                    <h1 style={{ paddingLeft: "1rem" }}>{target.won}</h1>
                                </div>
                                <h3 style={{ paddingLeft: "5rem" }}>Won Enquiries</h3>
                            </div>
                            <div style={{ paddingLeft: "3rem" }} className="new_enquiries">
                                <div className="d-flex">
                                    <i style={{ fontSize: 32, paddingLeft: "5rem", marginTop: "25px" }} className="fa fa-frown-o"></i>
                                    <h1 style={{ paddingLeft: "1rem" }}>{target.lost}</h1>
                                </div>
                                <h3 style={{ paddingLeft: "5rem" }}>Lost Enquiries</h3>
                            </div>
                        </div>
                    </div>
                ))}
            <div className="chart_content d-flex pl-5">
                <div className="chart_container d-flex">
                    <div>
                        <Pie
                            data={state}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Patients',
                                    fontSize: 20
                                },
                                legend: {
                                    display: true,
                                    position: 'right'
                                }
                            }}
                        />
                    </div>
                    <div className="pie_list">
                        <ul>
                            <li>Awaiting Patients</li>
                            <li>Won Patients</li>
                            <li>Lost Patients</li>
                            <li>New Patients</li>
                        </ul>
                    </div>
                </div>
                {
                    res.alert.map((target, index) => (


                        <div className="alert_container d-flex" key={index}{...target}>
                            <div>
                                <h1 style={{ fontSize: 54, color: "white", marginTop: "8rem", marginLeft: "12rem" }}>{target.pending}</h1>
                                <button className="view_patients_button">View Now</button>
                            </div>
                            <div className="alert">
                                <h1>Alert</h1><br />
                                <h3>You have following enquiries<br />
                                    {target.pending} unattended new enquiries
                                    since {target.hours} hours and {target.minutes} minutes</h3>
                            </div>
                        </div>

                    ))}

            </div>
            <div className="patient_table_container">
                <table>
                    <thead style={{ height: "5rem" }}>
                        <th style={{ paddingLeft: "2rem" }}>Patient Name</th>
                        <th>Query</th>
                        <th>Insurance/TPA</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Speciality</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {
                            enquries.map((target, index) => (
                                <tr key={index} {...target}>
                                    <td style={{ paddingLeft: "2rem" }}><button type="submit" onClick={() => handleSubmit(target)} >{target.patient_name}</button></td>
                                    <td style={{ width: "50rem" }}>{target.current_diagnosis}</td>
                                    <td>{"insurance/tpa"}</td>
                                    <td>{target.from_date}</td>
                                    <td>{target.to_date}</td>
                                    <td>-</td>
                                    <td>{target.status}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

        </>
    );

}

export default HOSPITAL_DASHBOARD;