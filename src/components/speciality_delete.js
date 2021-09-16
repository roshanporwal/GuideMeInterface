import React, {useState, useEffect} from 'react';
import { MultiSelect } from "react-multi-select-component";
import 'font-awesome/css/font-awesome.min.css';




 function SPECIALITY_DELETE(){
    const [selected, setSelected] = useState([]);
    const [speciality, setSpeciality] = useState([]);
    const [insurance, setInsurance] = useState([]);
    const [hospital_data, setHospital_data] = useState([]);
    const [formValues, setFormValue] = useState({
        speciality: "",
       
        
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

    const handleChange = e => {
        const { name, value } = e.currentTarget
        setFormValue(prevState => ({
            ...prevState,
            [name]: value
        }))
       
    }

     return (
         <>
         <div className="modal fade" id="exampleModal2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
      <label>Add a Speciality</label>
        
      </div>
      <div className="modal-body">
             <div className="pt-5 pb-5">
                           <form> 
                            <input
                                className = "form-control"
                                name = "speciality"
                                id = "speciality"
                                onChange={handleChange}
                                value = {formValues.speciality}
                                
                            />
                            <button style={{ marginTop: 100 }} className="join_button" type="submit" >Add</button>
                            </form>
            </div>
       </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
     
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id="exampleModal1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
      <label>Select Speciality to delete</label>
        
      </div>
      <div className="modal-body">
             <div className="pt-5 pb-5">
                            
                            <MultiSelect
                                
                                options={speciality}
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

 export default SPECIALITY_DELETE;