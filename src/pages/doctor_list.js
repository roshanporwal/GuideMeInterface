import React, { useState, useEffect } from "react";
import 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import * as auth_service from "../services/auth_service";







function DOCTOR_LIST() {
  const [doctor, setDoctor] = useState([])
  

  useEffect(() => {

    fetchData();
  }, []);


  async function fetchData(props) {

    let data = localStorage.getItem("login")
    data = JSON.parse(data)
    const getdoctor = await auth_service.getdoctorbyhospital(data._id, data.login_id)
    setDoctor(getdoctor.payload)
    console.log(getdoctor.payload)

  }




  return (
    <>
      <div className="doctor_list_title">
        <h1>Our Doctors</h1>

      </div>
      <button style={{ marginLeft: "120rem" }} className="new_doctor" ><i style={{ fontSize: 32 }} className="fa fa-user-plus"></i></button>

      {
        doctor.map((target, index) => (

          <div key={index}{...target}>





            <div className="doctor_container d-flex col-md-10">

              <div className="doctor_image_container">
                <img className="doctor_image" src="assets\images\doctor_image.jpg" alt="" />
                <h5>{target.doctor_name}</h5>
                <h6>{target.speciality}</h6>
              </div>
              <div className="doctor_detail_container  col-md-10">
                <h5 style={{ padding: 10, marginTop: "2rem" }}>
                  {target.desc}
                </h5>
               
              </div>
            </div>
           
          </div>

        ))
      }






    </>
  );



}

export default DOCTOR_LIST;