import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import * as auth_service from "../services/auth_service";

import HospitalDetails from '../components/hospital_details';
import HOSPITAL_LIST from '../components/hospital_list';
import './style.css'
import ADMIN_NAVBAR from "../Navbar/admin_navbar";


function HOSPITAL_PROFILE() {
    const [hospitals, setHospitals] = useState([])

    const [hospitalItem, setHospitalItem] = useState()
    const [IsHospitalSelected, setIsHospitalSelected] = useState(false)

    useEffect(() => {

        fetchData();
    }, []);

    const showInfo = (target) => {
        setIsHospitalSelected(true)
        setHospitalItem(target);
    }
    async function fetchData(props) {
        let data = localStorage.getItem("login")
        data = JSON.parse(data)
        const getenquries = await auth_service.gethospitalsall(data.login_id)
        if (getenquries.payload === undefined) {
            setHospitals([])
        } else {
            setHospitals(getenquries.payload)
        }
    }
    if (IsHospitalSelected)
        return (
            <>
                <ADMIN_NAVBAR />
                <HOSPITAL_LIST
                    hospitals={hospitals}
                    showInfo={(target) => showInfo(target)}
                />
                <HospitalDetails
                    target={hospitalItem}
                />
            </>
        );
    else
        return (
            <>
                <ADMIN_NAVBAR />
                <HOSPITAL_LIST
                    hospitals={hospitals}
                    showInfo={(target) => showInfo(target)}
                />
                <div className="hospital-info col-md-8" style={{ border: "3px solid black", borderRadius: "20px", height: "100rem", marginTop: "4rem" }}>
                    <h1 style={{ marginTop: "45rem", marginLeft: "10rem" }}>Please select a hospital to view profile</h1>
                </div>
            </>
        );

}

export default HOSPITAL_PROFILE;