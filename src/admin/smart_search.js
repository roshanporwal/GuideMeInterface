import React, {useState,useEffect} from 'react';
import {Form, Card} from 'react-bootstrap';
import ADMIN_NAVBAR from '../Navbar/admin_navbar';
import * as auth_service from "../services/auth_service";


function SMART_SEARCH(){
    const [formValues, setFormValue] = useState({
       
        search_insurance: "",
        search_location: "",
        search_speciality: ""
    })
    const [ideal, setIdeal] = useState();

    const handleChange = e => {
       
        const { name, value } = e.currentTarget
        setFormValue(prevState => ({
            ...prevState,
            [name]: value
        }))
    
        
    } 
    useEffect(() => {

        fetchData()
    }, []);
   

    async function fetchData() {
       
        const idealdata = await auth_service.idealdata()
        console.log(idealdata.payload)
        setIdeal(idealdata.payload)

    }



    const handleSubmit = async (event) => {
        event.preventDefault();
        const idealdata = await auth_service.smartsearch(formValues.search_insurance,formValues.search_speciality)
        console.log(idealdata)
      };
    return (
        <>
        <ADMIN_NAVBAR />
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1 className = "dashboardTitle">Smart Serach</h1>
                    </div>
                </div> 
            </div>
            <div className = "container">
                <Form>
                    <div className = "row">
                        <div style = {{marginTop: "2rem"}} className = "col-md-6">
                        <Form.Group>
                                    <Form.Select 
                                    size = "lg"
                                    onChange = {handleChange}
                                    style={{ border: "2px solid #164473", borderRadius: 10}}
                                    value = {formValues.search_query}
                                    name = "search_query"
                                    >
                                        <option>Insurance 1</option>
                                    </Form.Select>
                        </Form.Group>
                    </div>
                    <div  style = {{marginTop: "2rem"}} className = "col-md-6">
                                <Form.Group>
                                    <Form.Select 
                                    onChange = {handleChange}
                                    size = "lg"
                                    style={{ border: "2px solid #164473", borderRadius: 10}}
                                    value = {formValues.search_query}
                                    name = "search_query"
                                    >
                                        <option>Location 1</option>
                                    </Form.Select>
                                </Form.Group>
                    </div>
                    <div style = {{marginTop: "2rem"}} className = "col-md-6">
                                <Form.Group>
                                    <Form.Select 
                                    size = "lg"
                                    onChange = {handleChange}
                                    style={{ border: "2px solid #164473", borderRadius: 10}}
                                    value = {formValues.search_query}
                                    name = "search_query"
                                    >
                                        <option>Speciality 1</option>
                                    </Form.Select>
                                </Form.Group>
                    </div>
                    <div  style = {{marginTop: "2rem"}} className = "col-md-6">
                        <button style = {{backgroundColor: "#164473", border: "1px solid #164473", borderRadius: "5px", color: "white", height: "3rem"}} onClick={handleSubmit} className = "search_button col-md-12" >Search</button>
                    </div>   
                </div> 
                </Form>

                <div className = "row mt-4">
                    <div className = "col-md-12">
                        <Card style = {{borderRadius: "10px"}}>
                            <Card.Header style = {{background: "#164473", borderRadius: "10px", color: "white"}}>Information</Card.Header>
                            <Card.Body>Information</Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SMART_SEARCH;