import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import * as auth_service from "../services/auth_service";

const res = {
    "medstar": [
        {
            "hospital_name": "MEDSTAR AESTHETICS & MULTI SPECIALITY CENTRE",
            "hospital_location": "Dubai, UAE",
            "hospital_address": "GROUND FLOOR, GULF TOWER, OUD METHA P.O BOX: 117084, DUBAI, UAE",
            "hospital_mobile": "800 22 33",
            "hospital_email": "talktous@medstarhhc.com"
        },

    ],
    "hospital_names": [
        {
            "name": "MEDSTAR AESTHETICS & MULTI SPECIALITY CENTRE",
            "location": "Dubai, UAE"
        },
        {
            "name": "Abcd",
            "location": "Abu Dhabi, UAE"
        },
        {
            "name": "Efgh",
            "location": "Reading, UK"
        },
    ],
    "services": [
        {
            "list1": "Breast Clinic",
            "list2": "Fistula",
            "list3": "Face Lift",
            "list4": "Gynecomastia",
            "list5": "Liposuction",
            "list6": "Mommy Makeover",
            "list7": "Tummy Tuck",
            "list8": "Circumsision",
            "list9": "Contipation",
            "list10": "Fistula",
            "list11": "Hemorrhoids(Piles)",
            "list12": "Hernia",
            "list13": "Pilonidal Sinus",
            "list14": "Fillers",
            "list15": "Laser and body contering",
            "list16": "Laser Procedure",
            "list17": "Skin Care",
            "list18": "Gastric Pill Balloon",
            "list19": "Endoscopic Procedures",
            "list20": "Weight loss clinic",
            "list21": "Gastric Pill Balloon",
            "list22": "Endoscopic Procedures",
            "list23": "Weight loss Clinic",
            "list24": "Cosmetic Gynaecology",
            "list25": "Back Pain"

        }
    ],
    "khazna": [
        {
            "company_name": "AL Khazna Insurance Company",
            "basic_build": "yes",
            "general": "yes",
            "premium": "yes"
        }
    ]

}

function HOSPITAL_PROFILE() {


    const [enquries, setEnquries] = useState([])


    useEffect(() => {

        fetchData();
    }, []);


    async function fetchData() {
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
        //console.log("data",data)
        const getenquries = await auth_service.specility(data.login_id);
        console.log(getenquries.payload)

        //console.log(getenquries.payload,"hospitals")

        setEnquries(getenquries.payload);


    }


    return (
        <>
            <div className="hospital_profile_title">
                <h1>HOSPITAL PROFILE</h1>
            </div>
            <div className="d-flex">
                <div className="d-flex alphabets_container">
                    <div className="alphabets">A</div>
                    <div className="alphabets">B</div>
                    <div className="alphabets">C</div>
                    <div className="alphabets">D</div>
                    <div className="alphabets">E</div>
                    <div className="alphabets">F</div>
                    <div className="alphabets">G</div>
                    <div className="alphabets">H</div>
                    <div className="alphabets">I</div>
                    <div className="alphabets">J</div>
                    <div className="alphabets">K</div>
                    <div className="alphabets">L</div>
                    <div className="alphabets">M</div>
                    <div className="alphabets">N</div>
                    <div className="alphabets">O</div>
                    <div className="alphabets">P</div>
                    <div className="alphabets">Q</div>
                    <div className="alphabets">R</div>
                    <div className="alphabets">S</div>
                    <div className="alphabets">T</div>
                    <div className="alphabets">U</div>
                    <div className="alphabets">V</div>
                    <div className="alphabets">W</div>
                    <div className="alphabets">X</div>
                    <div className="alphabets">Y</div>
                    <div className="alphabets">Z</div>
                </div>
                <div className="add_hospital">
                    <button className="add_hospital_button">Add Hospital+</button>
                </div>
            </div>

            <div className="hospital_list col-md-4">
                {
                    res.hospital_names.map((target, index) => (
                        <div className="hospital_list_container d-flex" key={index} {...target}>
                            <img className="hospital_image" src="assets\images\Medstar-Healthcare-Jobs.png" alt="" />
                            <h4 style={{ marginTop: 30, paddingLeft: 5 }}>{target.name}<br /><p>{target.location}</p></h4>
                        </div>
                    ))
                }

            </div>
            <div className="hospital-info col-md-8">
                <div className="col-md-5">
                    {
                        res.medstar.map((target, index) => (
                            <div className="medstar_container" key={index} {...target}>
                                <img className="medstar_image" src="assets\images\Medstar-Healthcare-Jobs.png" alt="" />
                                <h5 style={{ textAlign: "center", padding: 5 }}>{target.hospital_name}</h5>
                                <h6 style={{ textAlign: "center", padding: 5 }}>{target.hospital_location}</h6>
                                <div className="d-flex p-4">
                                    <i style={{ fontSize: 22 }} className="fa fa-map-marker"></i>
                                    <h6 style={{ paddingLeft: 4 }}>{target.hospital_address}</h6>

                                </div>
                                <div className="d-flex p-4">
                                    <i style={{ fontSize: 22 }} className="fa fa-phone"></i>
                                    <h6 style={{ paddingLeft: 4 }}>{target.hospital_mobile}</h6>

                                </div>
                                <div className="d-flex p-4">
                                    <i style={{ fontSize: 22 }} className="fa fa-map-marker"></i>
                                    <h6 style={{ paddingLeft: 4 }}>{target.hospital_email}</h6>

                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="col-md-7">


                    <div className="hospital_services_container" >
                        <h4 style={{ marginLeft: 30 }}>Services</h4>
                        <div className="d-flex">
                            { enquries.map((target, index) => (
                                <div key={index} {...target}>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input"  />
                                        <label className="form-check-label" >
                                            {target.Hospital_Name}
                                        </label>
                                    </div>

                                </div>

                            ))}

                        </div>
                    </div>
                </div>





                <div className="col-md-5 hospital_photos_container">
                    <h5>Gallery</h5>
                    <div className="d-flex">
                        <img className="hospital_photos" src="assets\images\doctor_image.jpg" alt="" />
                        <img className="hospital_photos" src="assets\images\doctor_image.jpg" alt="" />
                        <img className="hospital_photos" src="assets\images\doctor_image.jpg" alt="" />

                    </div>
                    <div className="d-flex">
                        <img className="hospital_photos" src="assets\images\doctor_image.jpg" alt="" />
                        <img className="hospital_photos" src="assets\images\doctor_image.jpg" alt="" />
                        <img className="hospital_photos" src="assets\images\doctor_image.jpg" alt="" />

                    </div>
                    <div className="d-flex">
                        <img className="hospital_photos" src="assets\images\doctor_image.jpg" alt="" />
                        <img className="hospital_photos" src="assets\images\doctor_image.jpg" alt="" />
                        <img className="hospital_photos" src="assets\images\doctor_image.jpg" alt="" />

                    </div>
                </div>
                <div className="col-md-5 hospital_photos_container">
                    <h5>Insurance</h5>
                    <div className="d-flex">
                        {
                            res.khazna.map((target, index) => (
                                <div className="insurance_detail_container" key={index} {...target}>
                                    <h4 style={{ textAlign: "center" }}>{target.company_name}</h4>
                                    <h4>Basic Plus: {target.basic_build}</h4>
                                    <h4>General   : {target.general}</h4>
                                    <h4>Premium   : {target.premium}</h4>
                                </div>
                            ))}
                        {
                            res.khazna.map((target, index) => (
                                <div className="insurance_detail_container" key={index} {...target}>
                                    <h4 style={{ textAlign: "center" }}>{target.company_name}</h4>
                                    <h4>Basic Plus: {target.basic_build}</h4>
                                    <h4>General   : {target.general}</h4>
                                    <h4>Premium   : {target.premium}</h4>
                                </div>
                            ))}
                    </div>
                    <div className="d-flex">
                        {
                            res.khazna.map((target, index) => (
                                <div className="insurance_detail_container" key={index} {...target}>
                                    <h4 style={{ textAlign: "center" }}>{target.company_name}</h4>
                                    <h4>Basic Plus: {target.basic_build}</h4>
                                    <h4>General   : {target.general}</h4>
                                    <h4>Premium   : {target.premium}</h4>
                                </div>
                            ))}
                        {
                            res.khazna.map((target, index) => (
                                <div className="insurance_detail_container" key={index} {...target}>
                                    <h4 style={{ textAlign: "center" }}>{target.company_name}</h4>
                                    <h4>Basic Plus: {target.basic_build}</h4>
                                    <h4>General   : {target.general}</h4>
                                    <h4>Premium   : {target.premium}</h4>
                                </div>
                            ))}

                    </div>
                </div>
            </div>

        </>
    );

}

export default HOSPITAL_PROFILE;