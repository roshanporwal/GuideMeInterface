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
    /* {
      name: 'From',
      selector: row => row['from_date'],
      sortable: true,
    },
    {
        name: 'To',
        selector: row => row['to_date'],
        sortable: true,
    }, */
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
            <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                             <h1 className = "dashboardTitle">Hospital Dashboard</h1>
                        </div>
                    </div> 
                </div>
                {
                    enquriesstatus.map((target, index) => (
                            <div className="container pb-5" key={index}{...target}>
                                <div className="row justify-content-center">
                                    <div className="col-md-2 col-sm-6 total_enquiries text-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <img src="/assets/images/icons/total_enquiries.png" className="IconFont" alt=""/>
                                            <h2>{target.total}</h2>
                                        </div>
                                        <h3>Total Enquiries</h3>
                                    </div>
                                    <div className="col-md-2 col-sm-6 new_enquiries text-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <img src="/assets/images/icons/new_enquiries.png" className="IconFont" alt=""/>
                                            <h2>{target.new}</h2>
                                        </div>
                                        <h3>New Enquiries</h3>
                                    </div>
                                    <div className="col-md-3 col-sm-6 lost_enquiries text-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <img src="/assets/images/icons/in_progress.png" className="IconFont" alt=""/>
                                            <h2>{target.awaiting}</h2>
                                        </div>
                                        <h3>Awaiting Enquiries</h3>
                                    </div>
                                    <div className="col-md-2 col-sm-6 won_enquiries text-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <img src="/assets/images/icons/won_enquiries.png" className="IconFont" alt=""/>
                                            <h2>{target.won}</h2>
                                        </div>
                                        <h3>Won Enquiries</h3>
                                    </div>
                                    <div className="col-md-2 col-sm-6 awaiting_enquiries text-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <img src="/assets/images/icons/lost_enquiries.png" className="IconFont" alt=""/>
                                            <h2>{target.lost}</h2>
                                        </div>
                                        <h3>Lost Enquiries</h3>
                                    </div>
                                   
                                </div>
                            </div>
                    ))}
            
                <div className = "container">
                    <div className = "row">
                        <div className = "col-md-6">
                            <div className="PieChart">
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
                        </div>
                        <div className="col-md-6">
                            <div className=""> 
                                {
                                 enquriesstatus.map((target, index) => (
                                    <div className="AlertBox" key={index}{...target}>
                                        <div className="d-flex flex-column flex-lg-row align-items-center">
                                            <div className="col-md-5 text-center">
                                                <h2>{target.new}</h2>
                                                 <button className="ViewButton">View Now</button>
                                            </div>
                                             <div className="col-md-7">
                                                <h3>Alert</h3>
                                                <p>You have following enquiries.<br />
                                                    {target.new} unattended new enquiries.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    ))}        
                                </div>
                            </div> 
                     </div>
                 </div>   
                 <div className="container my-5">
                    <div className = "row">
                        <div className = "offset-lg-9 col-md-3 pb-2">
                            <label htmlFor="search" style={{width:"100%"}}>
                            Search by Patient Name:<br/>
                            <input id="search" type="text" className="form-control mt-2"  onChange={handleSearch} />
                            </label>
                        </div>
                        <div className = "col-md-12">    
                            <DataTable
                                style={{ paddingTop: "30px" }}
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
                </div>
        </>
    );

}

export default HOSPITAL_DASHBOARD;