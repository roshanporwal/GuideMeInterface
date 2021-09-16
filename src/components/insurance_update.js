import React, {useState, useEffect} from 'react';
import { MultiSelect } from "react-multi-select-component";
import 'font-awesome/css/font-awesome.min.css';
import {Form} from "react-bootstrap";




 function INSURANCE_UPDATE(){
    const [selected, setSelected] = useState([]);
    const [speciality, setSpeciality] = useState([]);
    const [insurance, setInsurance] = useState([]);
    const [type, setType] = useState()
    const [hospital_data, setHospital_data] = useState([]);
    const [formValues, setFormValue] = useState({
        insurance: "",
        type: [],
        network: "",
       
        
    })
    useEffect(() => {

        fetchData();
    }, []);
    async function fetchData(props) {


        console.log(props)
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
        console.log(data.insurance)
        setHospital_data([data])
        setSpeciality(data.speciality)
        if(data.insurance){
        setInsurance(data.insurance)
        console.log(speciality)
        }
       
    }
    function checkBox(name, value) {

        if (name === "type") {
            if (type.find(item => item === value)) {
                setType(type.filter(item => item !== value));

            } else {
                setType(prevArray => [...prevArray, value]);
            }
        } 
    }

    const handleChange = e => {
        const { name, value } = e.currentTarget
        setFormValue(prevState => ({
            ...prevState,
            [name]: value
        }))
       
    }

     return (
         <>
         <div className="modal fade" id="exampleModal4" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
      <label>Add an Insurance</label>
        
      </div>
      <div className="modal-body">
             <div className="pt-5 pb-5">
                           <Form>
                               <Form.Group> 
                            <Form.Label>Insurance Name</Form.Label>
                            <Form.Control
                                type = "text"
                                name = "insurance"
                                id = "speciality"
                                onChange={handleChange}
                                value = {formValues.insurance}
                                
                            />
                            </Form.Group>
                            <Form.Group> 
                            <Form.Label>Insurance Type</Form.Label>
                            <Form.Check
                                type = "checkbox"
                                name = "type"
                                id = "IP"
                                onChange={() => checkBox("type", "IP")}
                                label = "IP"
                                value = {formValues.type}
                                
                            />
                            <Form.Check
                                type = "checkbox"
                                label = "OP"
                                name = "type"
                                id = "OP"
                                onChange={() => checkBox("type", "OP")}
                                value = {formValues.type}
                                
                            />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Network</Form.Label> 
                            <Form.Control
                                type = "text"
                                name = "network"
                                id = "network"
                                onChange={handleChange}
                                value = {formValues.network}
                                
                            />
                            </Form.Group>
                            <button style={{ marginTop: 100 }} className="join_button" type="submit" >Add</button>
                           
                            </Form>
                            
            </div>
       </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="exampleModal3" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
      <label>Select Insurance to delete</label>
        
      </div>
      <div className="modal-body">
             <div className="pt-5 pb-5">
                            
                            <MultiSelect
                                
                                options={insurance}
                                value={selected}
                                onChange={setSelected}
                                labelledBy="Select"
                            />
                            <button style={{ marginTop: 100 }} className="join_button" type="submit" ><i className = "fa fa-trash"></i></button>
            </div>
       </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
         </>
     )
 }

 export default INSURANCE_UPDATE;