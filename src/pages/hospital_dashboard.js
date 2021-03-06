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
import ReactGifLoader from '../components/gif_loader';



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
      sortable: true,
    },
    {
        name: 'To',
        selector: row => row['to_date'],
        sortable: true,
    },
    {
        name: 'Status',
        selector: row => row['status'],
        sortable: true,
    },
  ];
  const customStyles = {
    rows: {
        style: {
            cursor: "pointer"// override the row height
        },
    },
}



function HOSPITAL_DASHBOARD(props) {
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [search, setSearch] = useState('');
    const [enquries, setEnquries] = useState([])
    const [enquriesstatus,setEnquriesstatus] = useState([ ])
    const [pie,setPie] = useState()



    useEffect(() => {

        fetchData().then(() => setLoading(false));
    }, []);
    const handleSearch = (event) => {
        setSearch(event.target.value);
      };


    async function fetchData() {
        let data=localStorage.getItem("login")
        data= JSON.parse(data)
        const gethospitalstaus = await auth_service.gethospitalstaus(data.login_id,data._id)
        setEnquriesstatus(gethospitalstaus.payload)
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
            <div className="text-center">
                <h1 className = "mt-0 p-5" style = {{color: "#000"}}>Hospital Dashboard</h1>
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
                                    <i style={{ fontSize: 26, marginTop: "25px", color: "#164473" }} className="fa fa-file"></i>
                                    <h1 style={{ paddingLeft: "1rem", color: "#3f9efd" }}>{target.total}</h1>
                                </div>
                                <h3 className = "mt-0 pb-5" style = {{color: "#3f9efd"}}>Total Enquiries</h3>
                            </div>
                            <div  className="col-md-2 col-sm-6 new_enquiries text-center">
                                <div className=" text-center"  >
                                    <i style={{ fontSize: 26, marginTop: "25px", color: "#164473" }} className="fa fa-plus"></i>
                                    <h1 style={{ paddingLeft: "1rem", color: "#3f9efd" }}>{target.new}</h1>
                                </div>
                                <h3  className = "mt-0  pb-5"  style = {{color: "#3f9efd"}}>New Enquiries</h3>
                            </div>
                            <div  className="col-md-3 col-sm-6 awaiting_enquiries text-center">
                                <div className="text-center" >
                                    <i style={{ fontSize: 26, marginTop: "25px", color: "#164473" }} className="fa fa-pause"></i>
                                    <h1 style={{ paddingLeft: "1rem", color: "#3f9efd" }}>{target.awaiting}</h1>
                                </div>
                                <h3  className = "mt-0  pb-5" style = {{color: "#3f9efd"}}>Awaiting Enquiries</h3>
                            </div>
                            <div  className="col-md-2 col-sm-6 won_enquiries text-center">
                                <div className="text-center">
                                    <i style={{ fontSize: 26, marginTop: "25px", color: "#164473" }} className=" fa fa-smile-o "></i>
                                    <h1 style={{ paddingLeft: "1rem", color: "#3f9efd" }}>{target.won}</h1>
                                </div>
                                <h3  className = "mt-0  pb-5" style = {{color: "#3f9efd"}}>Won Enquiries</h3>
                            </div>
                            <div  className="col-md-2 col-sm-6 lost_enquiries text-center">
                                <div className="text-center" >
                                    <i style={{ fontSize: 26, marginTop: "25px", color: "#164473" }} className="fa fa-frown-o"></i>
                                    <h1 style={{ paddingLeft: "1rem", color: "#3f9efd" }}>{target.lost}</h1>
                                </div>
                                <h3  className = "mt-0  pb-5" style = {{color: "#3f9efd"}}>Lost Enquiries</h3>
                            </div>
                            
                        </div>
                    </div>
                ))}
            <div className="">
                <div className=" col-md-offset-1 col-md-5 mt-5 mb-5" >
                    <div className = "chart_container">
                    <div className = "row">
                        <div className = "col-md-offset-2 col-md-8 p-5  ">
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
                        {/* <div className = "col-sm-5 ">
                        <ul style={{ fontSize: 20 }}>
                            <li>Awaiting Patients</li>
                            <li>Won Patients</li>
                            <li>Lost Patients</li>
                            <li>New Patients</li>
                        </ul>
                        </div> */}
                    </div>
                 </div>   
                    
                    
                </div>
                 {
                    enquriesstatus.map((target, index) => (


                        <div style = {{margin: "0px 5px"}} className="alert_container col-sm-5 mt-5" key={index}{...target}>
                        <div className="row">
                            <div className = "col-sm-6 text-center">
                                <h1 style={{ fontSize: 42, color: "white", marginTop: "8rem"}}>{target.new}</h1>
                                <button className="view_patients_button">View Now</button>
                            </div>
                            <div className="alert col-sm-6 text-center" style = {{paddingTop: "60px"}}>
                                <h1>Alert</h1><br />
                                <h4>You have following enquiries.<br />
                                    {target.new} unattended new enquiries.
                                    </h4>
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
    <div className = "col-md-12">
                    <label htmlFor="search">
                    Search by Patient Name:<br/>
                    <input id="search" type="text" onChange={handleSearch} />
                </label>
                </div>
    <DataTable
       
        onRowClicked = {(target) => handleSubmit(target)}                      
        columns={columns}
        data={enquries.filter((item) =>
            item.patient_name.toLowerCase().includes(search.toLowerCase())
          )}
        highlightOnHover
        pagination
        paginationPerPage={5}
        customStyles = {customStyles}
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