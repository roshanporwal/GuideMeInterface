import React, {useState, useEffect} from 'react';
import { MultiSelect } from "react-multi-select-component";
import 'font-awesome/css/font-awesome.min.css';
import {Form} from "react-bootstrap";
import * as auth_service from "../services/auth_service";




 function INSURANCE_UPDATE(){
    const [selected, setSelected] = useState([]);
    const [insurance, setInsurance] = useState([]);
    const [type, setType] = useState([])
    const [formValues, setFormValue] = useState({
        insurance_company_name: "",
        type: [],
        network: "",
       
        
    })
    useEffect(() => {

        fetchData();
    }, []);
    async function fetchData(props) {


       
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
        let temp = []
        if(data.insurance){
            for (const sp of data.insurance) {
                temp.push({
                  label: sp.insurance_company_name,
                  value: sp.insurance_company_name
                })
              }
        setInsurance(temp)
        }
       
    }
    async function remove() {
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
    
        for (const se of selected) {
          if (insurance.find(item => item.value === se.value)) {
            setInsurance(insurance.filter(item => item.value !== se.value));
            data.insurance = data.insurance.filter(item => item.insurance_company_name !== se.value)
    
          }
        }
        const values = {
            insurance: data.insurance
        }
        const updatehospital = await auth_service.updatehospital(data.login_id, values)
        if (updatehospital.payload) {
          localStorage.setItem('login', JSON.stringify(updatehospital.payload));
          window.location.reload();
        } else if (!updatehospital.payload) {
          window.location.reload();
        }
      }
    
      async function addinsurence() {
          formValues.type=type.toString()
         
          
          
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
        if(!data.insurance){
            data.insurance=[]
        }
        if(formValues.insurance_company_name === ''){
           
          window.location.reload();
          return
        }
        data.insurance.push(formValues)
        
    
        const values = {
            insurance: data.insurance
        }
        
        const updatehospital = await auth_service.updatehospital(data.login_id, values)
        if (updatehospital.payload) {
          localStorage.setItem('login', JSON.stringify(updatehospital.payload));
          window.location.reload();
        } else if (!updatehospital.payload) {
          window.location.reload();
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
                <h4 className="modal-title">Add an Insurance</h4>
              </div>
             <div className="modal-body">
                <div>
                    <Form>
                        <Form.Group> 
                    <Form.Label>Insurance Name</Form.Label>
                    <Form.Control
                        type = "text"
                        name = "insurance_company_name"
                        id = "insurance_company_name"
                        onChange={handleChange}
                        value = {formValues.insurance_company_name}
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
                    <button className="JoinButton mt-2" type="button" onClick={addinsurence}>Add</button> 
                    </Form>         
                </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> 
          </div>
    </div>
  </div>
</div>

    <div className="modal fade" id="exampleModal3" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
             <h4 className="modal-title">Select Insurance to delete</h4>
          </div>
          <div className="modal-body">
                <div className="pt-5 pb-5">             
                  <MultiSelect
                      
                      options={insurance}
                      value={selected}
                      onChange={setSelected}
                      labelledBy="Select"
                  />
                  <button className="JoinButton mt-3" type="button"  onClick={remove}><i className = "fa fa-trash"></i></button>
               </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
          </div>
        </div>
      </div>
    </div>
         </>
     )
 }

 export default INSURANCE_UPDATE;