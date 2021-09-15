import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
//import Pagination from "react-js-pagination";
import 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';
import  * as auth_service from "../services/auth_service";
import DataTable from "react-data-table-component";
import './style.css';
import HospitalNavbar from "../Navbar/hospital_navbar";


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

const columns = [
    {
      name: 'Patient_Name',
      selector: row => row['patient_name'],
      sortable: true,
     
    },
    {
      name: 'Diagnosis',
      selector: row => row['current_diagnosis'],
      sortable: true,
    },
    {
      name: 'Insurance/TPA',
      selector: row => row['insurance_name'],
      sortable: true,
    },
    {
      name: 'From',
      selector: row => row['from_date'],
    },
    {
        name: 'To',
        selector: row => row['to_date'],
    },
    {
        name: 'Status',
        selector: row => row['status'],
    },
  ];




function HOSPITAL_DASHBOARD(props) {

    const history = useHistory();
    const [enquries, setEnquries] = useState([])
    const [enquriesstatus,setEnquriesstatus] = useState([ ])
    const [pie,setPie] = useState()



    useEffect(() => {

        fetchData();
    }, []);


    async function fetchData() {
        let data=localStorage.getItem("login")
        data= JSON.parse(data)
        const gethospitalstaus = await auth_service.gethospitalstaus(data._id)
        setEnquriesstatus(gethospitalstaus.payload)
        console.log(gethospitalstaus.payload)
        let data_pie=[]
        data_pie.push(gethospitalstaus.payload[0].awaiting)
        data_pie.push(gethospitalstaus.payload[0].won)
        data_pie.push(gethospitalstaus.payload[0].lost)
        data_pie.push(gethospitalstaus.payload[0].new)
        setPie( {
            labels: ['Awaiting Enquiries', 'Won Enquiries', 'Lost Enquiries',
                'New Enquiries'],
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
                    data: data_pie
                }
            ]
        })
      
        const getenquries = await auth_service.getenquriesbyhospitals(data.login_id,data._id);
        console.log(getenquries)
        
        //console.log(getenquries.payload,"hospitals")
        for(const st of getenquries.payload){
            const hospital =st.hospitals.find(item => item.hospital_id === data._id) 
            st.status= hospital.status
        }
        setEnquries(getenquries.payload);

        
    }
   
    const handleSubmit = async (event) => {  
        history.push({
             pathname:'/hospital/sendquota',
             state:event._id
           });  
     };

    return (
        <>
        <HospitalNavbar/>
            <div className="text-center">
                <h1>Hospital Dashboard</h1>
            </div>
            {
                enquriesstatus.map((target, index) => (

                    <div key={index}{...target}>
                        {/* <div style={{ justifyContent: "center", paddingTop: "2rem" }} className="enquiries  d-flex">
                            <div style={{ paddingLeft: "3rem" }} className="total_enquiries">
                                <div className="d-flex">
                                    <i style={{ fontSize: 32, paddingLeft: "1rem", marginTop: "25px" }} className="fa fa-file"></i>
                                    <h1 style={{ paddingLeft: "1rem" }}>{target.total}</h1>
                                </div>
                                <h3>Total Enquiries</h3>
                            </div>
                            <div style={{ paddingLeft: "2rem" }} className="new_enquiries">
                                <div className="d-flex">
                                    <i style={{ fontSize: 32, paddingLeft: "5rem", marginTop: "25px" }} className="fa fa-plus"></i>
                                    <h1 style={{ paddingLeft: "1rem" }}>{target.new}</h1>
                                </div>
                                <h3 style={{ paddingLeft: "5rem" }}>New Enquiries</h3>
                            </div>
                            <div style={{ paddingLeft: "2rem" }} className="awaiting_enquiries">
                                <div className="d-flex">
                                    <i style={{ fontSize: 32, paddingLeft: "5rem", marginTop: "25px" }} className="fa fa-pause"></i>
                                    <h1 style={{ paddingLeft: "1rem" }}>{target.awaiting}</h1>
                                </div>
                                <h3 style={{ paddingLeft: "5rem" }}>Awaiting Enquiries</h3>
                            </div>
                            <div style={{ paddingLeft: "2rem" }} className="won_enquiries">
                                <div className="d-flex">
                                    <i style={{ fontSize: 32, paddingLeft: "5rem", marginTop: "25px" }} className=" fa fa-smile-o "></i>
                                    <h1 style={{ paddingLeft: "1rem" }}>{target.won}</h1>
                                </div>
                                <h3 style={{ paddingLeft: "5rem" }}>Won Enquiries</h3>
                            </div>
                            <div style={{ paddingLeft: "2rem" }} className="lost_enquiries">
                                <div className="d-flex">
                                    <i style={{ fontSize: 32, paddingLeft: "5rem", marginTop: "25px" }} className="fa fa-frown-o"></i>
                                    <h1 style={{ paddingLeft: "1rem" }}>{target.lost}</h1>
                                </div>
                                <h3 style={{ paddingLeft: "5rem" }}>Lost Enquiries</h3>
                            </div>
                        </div> */}
                        <div  className="enquiries offset-1">
                            <div className="col-md-2 col-sm-6 total_enquiries text-center">
                                <div className="text-center" >
                                    <i style={{ fontSize: 32, marginTop: "25px" }} className="fa fa-file"></i>
                                    <h1 style={{ paddingLeft: "1rem" }}>{target.total}</h1>
                                </div>
                                <h3>Total Enquiries</h3>
                            </div>
                            <div  className="col-md-2 col-sm-6 new_enquiries text-center">
                                <div className=" text-center"  >
                                    <i style={{ fontSize: 32, marginTop: "25px" }} className="fa fa-plus"></i>
                                    <h1 style={{ paddingLeft: "1rem" }}>{target.new}</h1>
                                </div>
                                <h3 >New Enquiries</h3>
                            </div>
                            <div  className="col-md-3 col-sm-6 awaiting_enquiries text-center">
                                <div className="text-center" >
                                    <i style={{ fontSize: 32, marginTop: "25px" }} className="fa fa-pause"></i>
                                    <h1 style={{ paddingLeft: "1rem" }}>{target.awaiting}</h1>
                                </div>
                                <h3>Awaiting Enquiries</h3>
                            </div>
                            <div  className="col-md-2 col-sm-6 won_enquiries text-center">
                                <div className="text-center">
                                    <i style={{ fontSize: 32, marginTop: "25px" }} className=" fa fa-smile-o "></i>
                                    <h1 style={{ paddingLeft: "1rem" }}>{target.won}</h1>
                                </div>
                                <h3>Won Enquiries</h3>
                            </div>
                            <div  className="col-md-2 col-sm-6 lost_enquiries text-center">
                                <div className="text-center" >
                                    <i style={{ fontSize: 32, marginTop: "25px" }} className="fa fa-frown-o"></i>
                                    <h1 style={{ paddingLeft: "1rem" }}>{target.lost}</h1>
                                </div>
                                <h3>Lost Enquiries</h3>
                            </div>
                            
                        </div>
                    </div>
                ))}
            <div className="chart_content offset-1">
                <div className="chart_container col-sm-5 mt-5 mb-5">
                    <div className = "row">
                        <div className = "col-sm-7 ">
                        <Pie
                            data={pie}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Patients',
                                    fontSize: 20
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom'
                                }
                            }}
                        />
                        </div>
                        <div className = "col-sm-5 ">
                        <ul style={{ fontSize: 20 }}>
                            <li>Awaiting Patients</li>
                            <li>Won Patients</li>
                            <li>Lost Patients</li>
                            <li>New Patients</li>
                        </ul>
                        </div>
                    </div>
                    
                    
                    
                </div>
                 {
                    res.alert.map((target, index) => (


                        <div style = {{marginLeft: "30px"}} className="alert_container col-sm-6 mt-5" key={index}{...target}>
                        <div className="row">
                            <div className = "col-sm-6 text-center">
                                <h1 style={{ fontSize: 42, color: "white", marginTop: "8rem"}}>{target.pending}</h1>
                                <button className="view_patients_button">View Now</button>
                            </div>
                            <div className="alert col-sm-6 text-center" style = {{paddingTop: "60px"}}>
                                <h1>Alert</h1><br />
                                <h4>You have following enquiries<br />
                                    {target.pending} unattended new enquiries
                                    since {target.hours} hours and {target.minutes} minutes</h4>
                            </div>
                        </div>
                        
                        </div>

                    ))}
                
            </div><div className="patient_table_container">
                  {/* <table>
                    <thead style={{ height: "5rem" }}>
                        <tr>
                        <th style={{ paddingLeft: "2rem" }}>Patient Name</th>
                        <th>Query</th>
                        <th>Insurance/TPA</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Speciality</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            enquries.map((target, index) => (
                                <tr key={index} {...target} onClick={() => handleSubmit(target)}>
                                    <td style={{ paddingLeft: "2rem" }}>{target.patient_name}</td>
                                    <td style={{ width: "50rem" }}>{target.current_diagnosis}</td>
                                    <td>{target.insurance_name}</td>
                                    <td>{target.from_date}</td>
                                    <td>{target.to_date}</td>
                                    <td>-</td>
                                    <td>{target.status}</td>
                                </tr>
                            ))}
                    </tbody>
                            </table> 
                   */}        
                            
    <div className = "data_table">
    <DataTable
       
        onRowClicked = {(target) => handleSubmit(target)}                      
        columns={columns}
        data={enquries}
        highlightOnHover
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[3, 5, 15, 25, 50]}
        paginationComponentOptions={{
          rowsPerPageText: 'Records per page:',
          rangeSeparatorText: 'out of',
        }}
      />
       </div>
                           
                           
             </div>

        </>
    );

}

export default HOSPITAL_DASHBOARD;