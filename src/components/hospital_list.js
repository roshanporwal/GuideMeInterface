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
      <div className="hospital_profile_title">
        <h1>HOSPITAL PROFILE</h1>
      </div>
      <div className="d-flex">
        <div className="d-flex col-md-10 alphabets_container">
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
          <button style = {{width: "10rem"}} className="alphabets" onClick={() => search("Reset")}>Reset</button>
        </div>
        <div className="add_hospital col-md-2">
          

            <button className="add_hospital_button" onClick={() => { fileInputRef.current.click(); file_upload_loading()}} onBlur = {() => file_upload_loading()} >Add Hospital
            {fileprocess?<i style={{ fontSize: 18, marginLeft: 10 }} className="fa fa-refresh fa-spin"></i>: <i className="fa fa-upload" aria-hidden="true" style={{ fontSize: 18, paddingLeft: 10 }}></i>}</button>
          <input onChange={(e)=>{handleChange(e); file_upload_loading()}}  accept=" .xlsx" multiple={false} ref={fileInputRef} type='file' hidden />


        </div>
      </div>

      <div style = {{overflow: "hidden", overflowY: "scroll", height: "90rem"}} className="hospital_list col-md-3" >
        {
          hospital.map((target, index) => (
            <div className="hospital_list_container d-flex" key={index} {...target} onClick={() => showInfo(target)}>
             <img className="hospital_image" src={target.avatar[0]?target.avatar:`${constants.serverBaseUrl}/view?filepath=./tmp/pngegg.png`} alt="" />
              <h4 style={{ marginTop: 30, paddingLeft: 5 }}>{target.hospital_name}<br /><p>{target.google_location}</p></h4>
            </div>
          ))
        }

      </div>

    </>
  )
}