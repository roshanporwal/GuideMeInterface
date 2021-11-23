import React, {useState,useEffect} from 'react';
import {Form} from 'react-bootstrap';
import ADMIN_NAVBAR from '../Navbar/admin_navbar';
import * as auth_service from "../services/auth_service";
import ReactGifLoader from '../components/gif_loader';
import DataTable from 'react-data-table-component';
/* const customStyles = {
    rows: {
        style: {
            cursor: "pointer"// override the row height
        },
    },
} */

function SMART_SEARCH(){
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValue] = useState({
        search_insurance: "",
        search_location: "",
        search_speciality: ""
    })
    const [search_results,setSearchResults] = useState([]);
    const [ideal, setIdeal] = useState();
    const columns = [{
            name: 'Hospital Name',
            selector: row => row['hospital_name'],
            sortable: true,
        },
        {
            name: 'Phone Number',
            selector: row => row['phno'],
            sortable: true,
        },
        {
            name: 'Address',
            selector: row => row['address'],
            sortable: true,
        },
        {
            name: 'Location',
            cell: row => {
                return <a href = {row['google_location']} > 
                        {row['google_location'].length > 35 ? row['google_location'].substring(0, 35) + "..." : row['google_location']} 
                        </a>
            },
            sortable: true,
        },
    ];

    const handleChange = e => {
        const { name, value } = e.currentTarget
        setFormValue(prevState => ({
            ...prevState,
            [name]: value
        })) 
    }
    useEffect(() => {
        fetchData().then(()=>{
            setLoading(false)
        });
    }, []);
   

    async function fetchData() {
       
        const idealdata = await auth_service.idealdata()
        setIdeal(idealdata.payload)
        
    }



    const handleSubmit = async (event) => {
        event.preventDefault();
        if(formValues.search_insurance.length === 0 && formValues.search_speciality.length === 0){
            alert('Please Select Insurance or Speciality value');
            return null;
        }
        const idealdata = await auth_service.smartsearch(formValues.search_insurance,formValues.search_speciality)
        //const idealdata = await auth_service.smartsearch('Adnic',formValues.search_speciality)
        setSearchResults(idealdata.payload);
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
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className = "dashboardTitle">Smart Search</h1>
                        </div>
                    </div> 
                    <Form>
                        <div className = "row">
                            <div className = " offset-lg-1 col-md-5 my-3">
                            <Form.Group>
                                <Form.Select 
                                size = "lg"
                                onChange = {handleChange}
                                style={{ border: "2px solid #164473", borderRadius: 10}}
                                value = {formValues.search_insurance}
                                name = "search_insurance"
                                >
                                <option value="">Select Insurance</option>

                                {ideal.insurance.map((item,index)=>{
                                    return <option key={index}>{item}</option>;
                                })}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div   className = "col-md-5 my-3">
                            <Form.Group>
                                <Form.Select 
                                onChange = {handleChange}
                                size = "lg"
                                style={{ border: "2px solid #164473", borderRadius: 10}}
                                value = {formValues.search_location}
                                name = "search_location"
                                >
                                    <option>Select Location</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div  className = "offset-lg-1 col-md-5 my-3">
                            <Form.Group>
                                <Form.Select 
                                size = "lg"
                                onChange = {handleChange}
                                style={{ border: "2px solid #164473", borderRadius: 10}}
                                value = {formValues.search_speciality}
                                name = "search_speciality"
                                >
                                <option value="">Select Speciality</option>
                                {ideal.speciality.map((item,index)=>{
                                    return <option key={index}>{item}</option>;
                                })}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div   className = "col-md-5 my-3">
                            <button style = {{backgroundColor: "#164473", border: "1px solid #164473", borderRadius: "5px", color: "white", height: "3rem"}} onClick={handleSubmit} className = "search_button col-md-12" >Search</button>
                        </div>   
                    </div> 
                    </Form>

                    <div className = "row mt-2">
                        <div className = "offset-lg-1 col-md-10">
                            <DataTable
                                className = "react_table"
                                style={{ paddingTop: "30px" }}
                                columns={columns}
                                data={search_results}
                                highlightOnHover
                                pagination
                                paginationPerPage={5}
                                defaultSortField="name"
                                /* onRowClicked={(target) => handleRowClick(target)} */
                                paginationRowsPerPageOptions={[3, 5, 15, 25, 50]}
                                /* customStyles = {customStyles} */
                                paginationComponentOptions={{
                                    rowsPerPageText: 'Records per page:',
                                    rangeSeparatorText: 'out of',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
}

export default SMART_SEARCH;