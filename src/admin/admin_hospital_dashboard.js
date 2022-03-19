/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
/* import Pagination from "react-js-pagination"; */
import 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import * as auth_service from "../services/auth_service";
import { useNavigate } from 'react-router-dom';
import DataTable from "react-data-table-component";
/* import DataTable from "react-data-components";   */
import ADMIN_NAVBAR from "../Navbar/admin_navbar";
import ReactGifLoader from '../interfacecomponents/gif_loader';
import "react-data-components/css/table-twbs.css";
/* import FilterTableComponent from "../components/data_table"; */

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
    const navigate = useNavigate();
    const [enquriesstatus, setEnquriesstatus] = useState([])
    const [search, setSearch] = useState('');
    const [enquries, setEnquries] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [pie, setPie] = useState();

    const columns = [
        {
            name: 'Patient Name',
            selector: row => row['patient_name'],
            sortable: true,

        },
        {
            name: 'Diagnosis',
            selector: row => row['current_diagnosis'],
            sortable: true,
        },
        {
            name: 'Insurance / TPA',
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
        {
            name: 'Action',
            cell: row => {
                return (<div className="delete-box" onClick={() => DeletePatient(row.id)}>
                    <i className="fa fa-trash"></i>
                </div>);
            },
            sortable: false,

        },
    ];
    const columns_feedback = [
        {
            name: 'Patient Name',
            selector: row => row['patient_name'],
            sortable: true,

        },
        {
            name: 'Diagnosis',
            selector: row => row['current_diagnosis'],
            sortable: true,
        },
        {
            name: 'Rating',
            selector: row => row['feedbackrating'],
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
            name: 'Message',
            selector: row => row['feedbackmessage'],
            sortable: true,

        },

    ];
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    useEffect(() => {
        fetchData().then(() => setLoading(false));
        fetchData1().then(() => setLoading1(false));
        fetchData2().then(() => setLoading2(false));
    }, []);
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    async function DeletePatient(row) {
        var r = window.confirm("Sure you want to delete ?");
        if (r === true) {
            let data = localStorage.getItem("login")
            data = JSON.parse(data)
            const getadminstaus = await auth_service.deleteenquries(data.login_id, row)
            if (getadminstaus.payload) {
                fetchData1()
            }
        }
        else {
            return null;
        }
    }

    // const [data,setData] = useState();
    async function fetchData1() {
        setLoading1(true)
        let data = localStorage.getItem("login")
        data = (JSON.parse(data))
        const getenquries = await auth_service.getenquries(data.login_id)
        setEnquries(getenquries.payload.reverse())
        setLoading1(false)
    }
    async function fetchData2(){
        let data = localStorage.getItem("login")
        data = (JSON.parse(data))
        const getfeeback = await auth_service.getfeedback(data.login_id)
        setFeedback(getfeeback.payload)
    }
    async function fetchData() {
        let data = localStorage.getItem("login")
        data = (JSON.parse(data))
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
    }


    const handleSubmit = async (event) => {
        navigate('/admin/sendquota',{ state:{id : event._id}})
    };


    // if (loading === true)
    //     return (
    //         <>
    //             <ReactGifLoader />
    //         </>
    //     )
    // else
        return (
            <>
                <ADMIN_NAVBAR />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="dashboardTitle">Admin Dashboard</h1>
                        </div>
                    </div>
                </div>
                { loading ? <ReactGifLoader /> :
                    enquriesstatus.map((target, index) => (
                        <div className="container pb-5" key={index}{...target}>
                            <div className="row">
                                <div className="col-md-2 col-sm-6 total_enquiries text-center">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <img src="/assets/images/icons/total_enquiries.png" className="IconFont" alt="" />
                                        <h2>{target.total}</h2>
                                    </div>
                                    <h3>Total Enquiries</h3>
                                </div>
                                <div className="col-md-2 col-sm-6 new_enquiries text-center">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <img src="/assets/images/icons/new_enquiries.png" className="IconFont" alt="" />
                                        <h2>{target.new}</h2>
                                    </div>
                                    <h3>New Enquiries</h3>
                                </div>
                                <div className="col-md-2 col-sm-6 awaiting_enquiries text-center">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <img src="/assets/images/icons/lost_enquiries.png" className="IconFont" alt="" />
                                        <h2>{target.lost}</h2>
                                    </div>
                                    <h3>Lost Enquiries</h3>
                                </div>
                                <div className="col-md-2 col-sm-6 won_enquiries text-center">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <img src="/assets/images/icons/won_enquiries.png" className="IconFont" alt="" />
                                        <h2>{target.won}</h2>
                                    </div>
                                    <h3>Won Enquiries</h3>
                                </div>
                                <div className="col-md-2 col-sm-6 lost_enquiries text-center">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <img src="/assets/images/icons/in_progress.png" className="IconFont" alt="" />
                                        <h2>{target.inprogress}</h2>
                                    </div>
                                    <h3>In Progress</h3>
                                </div>
                                <div className="col-md-2 col-sm-6 sent_quote text-center">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <img src="/assets/images/icons/sent_quote.png" className="IconFont" alt="" />
                                        <h2>{target.sentquote}</h2>
                                    </div>
                                    <h3>Sent Quote</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="PieChart">
                                <Pie
                                    data={pie}
                                    options={{
                                        title: {
                                            display: true,
                                            text: 'Patients',
                                            fontSize: 10,
                                        },
                                        plugins: {
                                            legend: {
                                                display: true,
                                                position: 'bottom',
                                                align: 'center',
                                                labels: {
                                                    boxWidth: 20,
                                                    font: {
                                                        size: 16
                                                    }
                                                }
                                            }
                                        }

                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="">
                                {
                                    enquriesstatus.map((target, index) => (
                                        <div className="AlertBox" key={index}{...target}>
                                            <div className="d-flex flex-column flex-lg-row align-items-center">
                                                <div className="col-md-5 text-center">
                                                    <h2>{target.new}</h2>
                                                    <button className="ViewButton Hover">View Now</button>
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
                        <div className="col-md-2 AddPatient">
                            <button onClick={() => navigate('/admin/enqurie_form')} className="Hover">ADD PATIENT</button>
                        </div>
                    </div>
                </div>
                <div className="container my-5">
                    <div className="row">
                        <div className="offset-lg-9 col-md-3 pb-2">
                            <label htmlFor="search" style={{ width: "100%" }}> Search by Patient Name: </label>
                            <input id="search" className="form-control mt-2" type="text" onChange={handleSearch} />
                        </div>
                        { loading1 ? <ReactGifLoader /> :
                            <div className="col-md-12">
                                <DataTable
                                    className="react_table"
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
                                    customStyles={customStyles}
                                    paginationComponentOptions={{
                                        rowsPerPageText: 'Records per page:',
                                        rangeSeparatorText: 'out of',

                                    }}
                                />
                            </div>
                        }
                    </div>
                </div>
                <div className="container my-5">
                    <div className="row">
                        <div className="offset-lg-9 col-md-3 pb-2">
                            <label htmlFor="search" style={{ width: "100%" }}> Search by Patient Name: </label>
                            <input id="search" className="form-control mt-2" type="text" onChange={handleSearch} />
                        </div>
                        { loading2 ? <ReactGifLoader /> :
                            <div className="col-md-12">
                                <DataTable
                                    className="react_table"
                                    style={{ paddingTop: "30px" }}
                                    columns={columns_feedback}
                                    data={feedback.filter((item) =>
                                        item.patient_name.toLowerCase().includes(search.toLowerCase())
                                    )}
                                    highlightOnHover
                                    pagination
                                    paginationPerPage={5}
                                    defaultSortField="patient_name"
                                    paginationRowsPerPageOptions={[3, 5, 15, 25, 50]}
                                    customStyles={customStyles}
                                    paginationComponentOptions={{
                                        rowsPerPageText: 'Records per page:',
                                        rangeSeparatorText: 'out of',

                                    }}
                                />
                            </div>
                        }
                    </div>
                </div>
            </>
        );
}


