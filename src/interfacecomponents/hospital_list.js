import React, { useState, useRef, useEffect } from 'react';
import * as auth_service from "../services/auth_service";
import constants from '../constant';

export default function HOSPITAL_LIST({ hospitals, showInfo }) {
  const fileInputRef = useRef();
  const [fileprocess, setFileProcess] = useState(false);
  const [/*loading*/, setLoading] = useState(true);
  const [hospital, setHospital] = useState([])
  useEffect(() => {

    setHospital(hospitals)
  }, [hospitals]);

  async function search(char) {
    if (char === "Reset") {
      setHospital(hospitals)
      return
    }
    const hp = hospitals.filter((data) => data.hospital_name.charAt(0) === char)
    setHospital(hp)
  }
  const handleChange = async (e) => {

    const formData = new FormData();
    if (e.target.files.length === 0) {
      setLoading(false)
      return    
    }
    for (const fi of e.target.files) {
     /* if (e.target.files.length === 1) {
        formData.append('blogimage', fi);

      }*/
      formData.append('blogimage', fi);

    }
    formData.append('blogimage1', "file");
    
    const uploadexcelfile= await auth_service.uploadexcelfile(formData)
    if(uploadexcelfile.payload){
      alert(uploadexcelfile.payload)
      window.location.reload();
    }else{
      alert("something went wrong pls check the file is in correct format?")
      window.location.reload();
    }
    
  }

  const file_upload_loading=()=>{
    setFileProcess(!fileprocess)
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
              <h1 className = "dashboardTitle">Hospital Profile</h1>
          </div>
        </div> 
      </div>
      <div className="container">
        <div className="row">
            <div className="col-md-10 text-center">
              <div className="d-flex alphabetsFilters align-items-center">
                <button className="alphabets" onClick={() => search("A")}>A</button>
                <button className="alphabets" onClick={() => search("B")}>B</button>
                <button className="alphabets" onClick={() => search("C")}>C</button>
                <button className="alphabets" onClick={() => search("D")}>D</button>
                <button className="alphabets" onClick={() => search("E")}>E</button>
                <button className="alphabets" onClick={() => search("F")}>F</button>
                <button className="alphabets" onClick={() => search("G")}>G</button>
                <button className="alphabets" onClick={() => search("H")}>H</button>
                <button className="alphabets" onClick={() => search("I")}>I</button>
                <button className="alphabets" onClick={() => search("J")}>J</button>
                <button className="alphabets" onClick={() => search("K")}>K</button>
                <button className="alphabets" onClick={() => search("L")}>L</button>
                <button className="alphabets" onClick={() => search("M")}>M</button>
                <button className="alphabets" onClick={() => search("N")}>N</button>
                <button className="alphabets" onClick={() => search("O")}>O</button>
                <button className="alphabets" onClick={() => search("P")}>P</button>
                <button className="alphabets" onClick={() => search("Q")}>Q</button>
                <button className="alphabets" onClick={() => search("R")}>R</button>
                <button className="alphabets" onClick={() => search("S")}>S</button>
                <button className="alphabets" onClick={() => search("T")}>T</button>
                <button className="alphabets" onClick={() => search("U")}>U</button>
                <button className="alphabets" onClick={() => search("V")}>V</button>
                <button className="alphabets" onClick={() => search("W")}>W</button>
                <button className="alphabets" onClick={() => search("X")}>X</button>
                <button className="alphabets" onClick={() => search("Y")}>Y</button>
                <button className="alphabets" onClick={() => search("Z")}>Z</button>
                <button style = {{width: "8rem",letterSpacing:1,fontWeight:600}} className="alphabets" onClick={() => search("Reset")}>RESET</button>
              </div>
            </div>
            <div className="add_hospital col-md-2">
                <div className="AddHospital" 
                onClick={() => { fileInputRef.current.click(); file_upload_loading()}} 
                onBlur = {() => file_upload_loading()} >Add Hospital
                 {fileprocess?<i style={{ fontSize: 18, marginLeft: 10 }} className="fa fa-refresh fa-spin"></i>: <i className="fa fa-upload" aria-hidden="true" style={{ fontSize: 18, paddingLeft: 10 }}></i>}</div>
                <input onChange={(e)=>{handleChange(e); file_upload_loading()}}  accept=" .xlsx" multiple={false} ref={fileInputRef} type='file' hidden />
            </div>
        </div>
      </div>  
      <div className="hospital_list offset-lg-1 col-md-3 my-5" >
          {
            hospital.map((target, index) => (
            <div className="row mb-3" key={index} onClick={() => showInfo(target)}>
              <div className="col-md-3 text-center">
                  <img src={target.avatar[0]?target.avatar:`${constants.serverBaseUrl}/view?filepath=./tmp/pngegg.png`} alt="" />
                </div>
                <div className="col-md-9 py-2">
                  <h4>{target.hospital_name}</h4>
                  <p>{target.google_location}</p>
              </div>
            </div>
          ))
          }
      </div>
              
    </>
  )
}