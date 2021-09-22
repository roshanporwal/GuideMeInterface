import React, {useState} from 'react';
import {Form, Card} from 'react-bootstrap';
import ADMIN_NAVBAR from '../Navbar/admin_navbar';


function SMART_SEARCH(){
    const [formValues, setFormValue] = useState({
       
        search_insurance: "",
        search_location: "",
        search_speciality: ""
    })
   

    const handleChange = e => {
       
        const { name, value } = e.currentTarget
        setFormValue(prevState => ({
            ...prevState,
            [name]: value
        }))
    
        
    } 
   /* const handleSubmit = async (event) => {
        event.preventDefault();
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
       
    
    
      
        
        const formData = new FormData();
        
        formData.append('formValues', JSON.stringify(formValues))
        
       
      
      };*/
    return (
        <>
        <ADMIN_NAVBAR />
        <div className = "container ">
            <div className = "row">
                <h1>SMART SEARCH</h1>
                <Form>
                    
                    
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
                            <button style = {{backgroundColor: "#164473", border: "1px solid #164473", borderRadius: "5px", color: "white", height: "3rem"}} className = "search_button col-md-12" >Search</button>
                        </div>
                    
                </Form>
                </div>
                <div className = "row">
                <div className = "col-md-12">
                <Card className = "mt-4" style = {{borderRadius: "10px"}}>
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