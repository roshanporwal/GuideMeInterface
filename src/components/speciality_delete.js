import React, { useState, useEffect } from 'react';
import { MultiSelect } from "react-multi-select-component";
import 'font-awesome/css/font-awesome.min.css';
import * as auth_service from "../services/auth_service";




function SPECIALITY_DELETE() {
  const [selected, setSelected] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [formValues, setFormValue] = useState({
    speciality: "",


  })
  useEffect(() => {

    fetchData();
  }, []);
  async function fetchData() {

    let data = localStorage.getItem("login")
    data = JSON.parse(data)
    let temp = []
    for (const sp of data.speciality) {
      temp.push({
        label: sp,
        value: sp
      })
    }
    setSpeciality(temp)
  }
  async function remove() {
    let data = localStorage.getItem("login")
    data = JSON.parse(data)

    for (const se of selected) {
      if (speciality.find(item => item.value === se.value)) {
        setSpeciality(speciality.filter(item => item.value !== se.value));
        data.speciality = data.speciality.filter(item => item !== se.value)

      }
    }
    const values = {
      speciality: data.speciality
    }
    const updatehospital = await auth_service.updatehospital(data.login_id, values)
    if (updatehospital.payload) {
      localStorage.setItem('login', JSON.stringify(updatehospital.payload));
      window.location.reload();
    } else if (!updatehospital.payload) {
      window.location.reload();
    }
  }

  async function addspeciality() {
    let data = localStorage.getItem("login")
    data = JSON.parse(data)
    if(formValues.speciality===''){
       
      window.location.reload();
      return
    }
    data.speciality.push(formValues.speciality)
    data.speciality = [...new Set(data.speciality)]


    const values = {
      speciality: data.speciality
    }
    const updatehospital = await auth_service.updatehospital(data.login_id, values)
    if (updatehospital.payload) {
      localStorage.setItem('login', JSON.stringify(updatehospital.payload));
      window.location.reload();
    } else if (!updatehospital.payload) {
      window.location.reload();
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
            <h4 class="modal-title">Add a Speciality</h4>
            </div>
            <div className="modal-body">
              <div className="pt-5 pb-5">
                <form>
                  <input
                    className="form-control"
                    name="speciality"
                    id="speciality"
                    onChange={handleChange}
                    value={formValues.speciality}
                  />
                  <button className="JoinButton mt-3" type='button' onClick={addspeciality} >Add</button>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 class="modal-title">Select Speciality to delete</h4>
            </div>
            <div className="modal-body">
              <div className="pt-5 pb-5">
                <MultiSelect
                  options={speciality}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                />
                <button className="JoinButton  mt-3" type="submit" onClick={remove} ><i className="fa fa-trash"></i></button>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SPECIALITY_DELETE;