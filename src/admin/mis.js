import React from "react";
import "font-awesome/css/font-awesome.min.css";

import "./style.css";
import ADMIN_NAVBAR from "../Navbar/admin_navbar";
import Button from "@restart/ui/esm/Button";
import constants from "../constant";
import { FiDownload } from "react-icons/fi";
function Mis() {
    return (
        <>
            <ADMIN_NAVBAR />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 text-center download-button">
                        <Button
                            className="btn btn-info button-style"
                            onClick={() => {
                                window.location.href = `${constants.serverBaseUrl}/uploadexcel/patient_excel`;
                            }}
                        >
                            Download Patient Data &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FiDownload />
                        </Button>
                    </div>
                    <div className="col-md-4 text-center download-button">
                        <Button
                            className="btn btn-info button-style"
                            onClick={() => {
                                window.location.href = `${constants.serverBaseUrl}/uploadexcel/hospital_excel`;
                            }}
                        >
                            Download Hospital Data&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <FiDownload />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Mis;
