import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
/* import Pagination from "react-js-pagination"; */
import 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import * as auth_service from "../services/auth_service";
import { useHistory } from 'react-router-dom';
import DataTable from "react-data-table-component"; 
/* import DataTable from "react-data-components";   */
import './style.css'
import ADMIN_NAVBAR from "../Navbar/admin_navbar";
import ReactGifLoader from '../components/gif_loader';
import "react-data-components/css/table-twbs.css";
/* import FilterTableComponent from "../components/data_table"; */




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
 /* 
  const columns = [
    { title: 'Patient Name', prop: 'patient_name'  },
    { title: 'Diagnosis', prop: 'diagnosis' },
    { title: 'Insurance/TPA', prop: 'insurance_name' },
    { title: 'From', prop: 'from_date' },
    { title: 'To', prop: 'to_date' },
    { title: 'Status', prop: 'status' }
  ];
 */

  const customStyles = {
    rows: {
        style: {
            cursor: "pointer"// override the row height
        },
    },
}

  
export default function ADMIN_HOSPITAL_DASHBOARD(props) {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [enquriesstatus, setEnquriesstatus] = useState([])
    const [search, setSearch] = useState('');
    const [enquries, setEnquries] = useState([])
    const [pie, setPie] = useState()

    useEffect(() => {

        fetchData().then(() => setLoading(false));
    }, []);
    const handleSearch = (event) => {
        setSearch(event.target.value);
      };
    

    async function fetchData() {
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
        const getadminstaus = await auth_service.getadminstaus(data.login_id)
        setEnquriesstatus(getadminstaus.payload)
        let data_pie = []
        data_pie.push(getadminstaus.payload[0].awaiting)
        data_pie.push(getadminstaus.payload[0].won)
        data_pie.push(getadminstaus.payload[0].lost)
        data_pie.push(getadminstaus.payload[0].new)
        setPie({
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
        const getenquries = await auth_service.getenquries(data.login_id)
        setEnquries(getenquries.payload)

    }

   
    const handleSubmit = async (event) => {
        history.push({
            pathname: '/admin/sendquota',
            state: event._id
        })
    };


    if (loading === true)
        return (
            <>
                <ReactGifLoader />
            </>
        )
    else




        return (
            <>
                <ADMIN_NAVBAR />
                <div className="text-center">
                    <h1 className = "mt-0 p-4 " style = {{color: "black"}}>Admin Dashboard</h1>
                </div>
                {
                    enquriesstatus.map((target, index) => (

                        <div key={index}{...target}>
                            <div className="enquiries">
                                <div className="col-md-2 col-sm-6 total_enquiries text-center">
                                    <div className="text-center" >
                                        <i style={{ fontSize: 26, marginTop: "25px", color: "#164473" }} className="fa fa-file"></i>
                                        <h1 style={{ paddingLeft: "1rem", color: "#3f9efd" }}>{target.total}</h1>
                                    </div>
                                    <h3 className = "mt-0 pb-3" style = {{color: "#3f9efd"}}>Total Enquiries</h3>
                                </div>
                                <div className="col-md-2 col-sm-6 new_enquiries text-center">
                                    <div className=" text-center"  >
                                        <i style={{ fontSize: 26, marginTop: "25px", color: "#164473" }} className="fa fa-plus"></i>
                                        <h1 style={{ paddingLeft: "1rem", color: "#3f9efd" }}>{target.new}</h1>
                                    </div>
                                    <h3  className = "mt-0 pb-3"  style = {{color: "#3f9efd"}}>New Enquiries</h3>
                                </div>
                                <div className="col-md-2 col-sm-6 awaiting_enquiries text-center">
                                    <div className="text-center" >
                                        <i style={{ fontSize: 26, marginTop: "25px", color: "#164473" }} className="fa fa-pause"></i>
                                        <h1 style={{ paddingLeft: "1rem", color: "#3f9efd" }}>{target.lost}</h1>
                                    </div>
                                    <h3  className = "mt-0 pb-3"  style = {{color: "#3f9efd"}}>Lost Enquiries</h3>
                                </div>
                                <div className="col-md-2 col-sm-6 won_enquiries text-center">
                                    <div className="text-center">
                                        <i style={{ fontSize: 26, marginTop: "25px", color: "#164473" }} className=" fa fa-smile-o "></i>
                                        <h1 style={{ paddingLeft: "1rem", color: "#3f9efd" }}>{target.won}</h1>
                                    </div>
                                    <h3  className = "mt-0 pb-3"  style = {{color: "#3f9efd"}}>Won Enquiries</h3>
                                </div>
                                <div className="col-md-2 col-sm-6 lost_enquiries text-center">
                                    <div className="text-center" >
                                        <i style={{ fontSize: 26, marginTop: "25px", color: "#164473" }} className="fa fa-tasks"></i>
                                        <h1 style={{ paddingLeft: "1rem", color: "#3f9efd" }}>{target.inprogress}</h1>
                                    </div>
                                    <h3  className = "mt-0 pb-3"  style = {{color: "#3f9efd"}}>In Progress</h3>
                                </div>
                                <div className="col-md-2 col-sm-6 sent_quote text-center">
                                    <div className="text-center">
                                        <i style={{ fontSize: 26, marginTop: "25px", color: "#164473" }} className="fa fa-share"></i>
                                        <h1 style={{ paddingLeft: "1rem", color: "#3f9efd" }}>{target.sentquote}</h1>
                                    </div>
                                    <h3  className = "mt-0 pb-3"  style = {{color: "#3f9efd"}}>Sent Quote</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                <div className="chart_content">
                    
                    <div className="chart_container col-sm-5 mt-5 mb-5 p-5">
                        <div className="row">
                            <div className="col-md-offset-2 col-md-8">
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
                            
                           {/*  <div className="col-sm-5 ">
                                <ul style={{ fontSize: 20 }}>
                                    <li>Awaiting Patients</li>
                                    <li>Won Patients</li>
                                    <li>Lost Patients</li>
                                    <li>New Patients</li>
                                </ul>
                            </div> */}
                        </div>
                       


                    </div>
                   
                    {
                        enquriesstatus.map((target, index) => (


                            <div style={{ marginLeft: "15px" }} className="alert_container col-sm-5 mt-5" key={index}{...target}>
                                <div className="row">
                                    <div className="col-sm-6 text-center">
                                        <h1 style={{ fontSize: 42, color: "white", marginTop: "8rem" }}>{target.new}</h1>
                                        <button className="view_patients_button">View Now</button>
                                    </div>
                                    <div className="alert col-sm-6 text-center" style={{ paddingTop: "60px" }}>
                                        <h1>Alert</h1><br />
                                        <h4>You have following enquiries.<br />
                                            {target.new} unattended new enquiries.
                                        </h4>
                                    </div>
                                </div>

                            </div>

                        ))}
                    <div style={{ marginLeft: 20 }} className="col-sm-1 mt-5">
                        <button style={{ backgroundColor: "#164473", color: "white", borderRadius: 10, boxShadow: "5px 10px 8px #888888", width: "14rem", height: "3rem", marginLeft: "-2rem" }} onClick={() => history.push('/admin/enqurie_form')}>ADD PATIENT</button>
                    </div>
                </div>
                <div className="patient_table_container" style={{ marginTop: 40 }}>
                

                    <div className="data_table mt-5">
                <div className = "col-md-12">
                    <label htmlFor="search">
                    Search by Patient Name:<br/>
                    <input id="search" type="text" onChange={handleSearch} />
                </label>
                </div>
                     {/* <DataTable
      keys="name"
      columns={columns}
      initialData={enquries}
      onRowClicked={(target) => handleSubmit(target)}
      initialPageLength={5}
      initialSortBy={{ prop: 'city', order: 'descending' }}
    /> */}
 
 
                         <DataTable
                            className = "react_table"
                            style={{ paddingTop: "30px" }}
                            columns={columns}
                            data={enquries.filter((item) =>
                                item.patient_name.toLowerCase().includes(search.toLowerCase())
                              )}
                            highlightOnHover
                            pagination
                            paginationPerPage={5}
                            defaultSortField="patient_name"
                            onRowClicked={(target) => handleSubmit(target)}
                            paginationRowsPerPageOptions={[3, 5, 15, 25, 50]}
                            customStyles = {customStyles}
                            paginationComponentOptions={{
                                rowsPerPageText: 'Records per page:',
                                rangeSeparatorText: 'out of',

                            }}
                        />   
                       {/*  <FilterTableComponent /> */}


                    
                    </div>

                </div>

            </>
        );
}