import React,{useState,useEffect} from "react";
import 'font-awesome/css/font-awesome.min.css';
/* import Pagination from "react-js-pagination"; */
import 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import  * as auth_service from "../services/auth_service";
import { useHistory } from 'react-router-dom';
import DataTable from "react-data-table-component";
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

const state = {
    labels: ['Awaiting Patients', 'Won Patients', 'Lost Patients',
        'New Patients'],
    datasets: [
        {
            label: 'Patients',
            backgroundColor: [
                '#EAF2F6',
                '#42B3CE',
                '#164473',
                '#5899BD'
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

export default function ADMIN_HOSPITAL_DASHBOARD(props) {
    const history = useHistory();
    
    const [enquriesstatus,setEnquriesstatus] = useState([ ])
   
    const [enquries, setEnquries] = useState([])

    useEffect(() => {
       
        fetchData();
      }, []);


      async function fetchData() {
        let data=localStorage.getItem("login")
        data= JSON.parse(data)
        console.log(data.token)
        const getadminstaus = await auth_service.getadminstaus()
        setEnquriesstatus(getadminstaus.payload)
        const getenquries = await auth_service.getenquries(data.login_id)
        setEnquries(getenquries.payload)
        
      }

      const handleSubmit = async (event) => {
        
       // history.push(,{params:event});
        history.push({
            pathname:'/ADMIN_PATIENT_DASHBOARD',
            state:event._id
          });

       
        console.log("formValues")
        console.log(enquries);

        /* const login = await auth_service.enquries(formData)
         console.log(login)*/
    };

  



 

    return (
        <>
            <div className="text-center">
                <h1>Admin Dashboard</h1>
            </div>
            {
                enquriesstatus.map((target, index) => (

                    <div key={index}{...target}>
                        <div  className="enquiries">
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
                            <div  className="col-md-2 col-sm-6 awaiting_enquiries text-center">
                                <div className="text-center" >
                                    <i style={{ fontSize: 32, marginTop: "25px" }} className="fa fa-pause"></i>
                                    <h1 style={{ paddingLeft: "1rem" }}>{target.lost}</h1>
                                </div>
                                <h3>Lost Enquiries</h3>
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
                                    <h1 style={{ paddingLeft: "1rem" }}>{target.inprogress}</h1>
                                </div>
                                <h3>In Progress</h3>
                            </div>
                            <div  className="col-md-2 col-sm-6 sent_quote text-center">
                                <div className="text-center">
                                    <i style={{ fontSize: 32, marginTop: "25px" }} className="fa fa-frown-o"></i>
                                    <h1 style={{ paddingLeft: "1rem" }}>{target.sentquote}</h1>
                                </div>
                                <h3>Sent Quote</h3>
                            </div>
                        </div>
                    </div>
                ))}
             <div className="chart_content ">
                <div className="chart_container col-sm-5 mt-5 mb-5">
                    <div className = "row">
                        <div className = "col-sm-7 ">
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


                        <div style = {{marginLeft: "15px"}} className="alert_container col-sm-5 mt-5" key={index}{...target}>
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
                <div style={{ marginLeft: 20 }} className = "col-sm-1 mt-5">
                    <button style = {{backgroundColor: "#164473",color: "white", borderRadius: 10, boxShadow: "5px 10px 8px #888888", width: "14rem", height: "3rem", marginLeft: "-2rem"}} onClick={()=>history.push('/PATIENT_FORM')}>ADD PATIENT</button>
                </div> 
            </div>
            <div className="patient_table_container" style = {{marginTop: 40}}>
               
              
    <div className = "data_table mt-5">
    {
                            enquries.map((target) => (
  <DataTable
        
        style = {{paddingTop: "30px"}}
        columns={columns}
        data={enquries}
        highlightOnHover
        pagination
        paginationPerPage={5}
        onRowClicked = {() => handleSubmit(target)}
        paginationRowsPerPageOptions={[3, 5, 15, 25, 50]}
        paginationComponentOptions={{
        rowsPerPageText: 'Records per page:',
        rangeSeparatorText: 'out of',
 
        }}
        />
        
        ))}
         
        </div>
                              
      </div>
            
        </>
    );
}


