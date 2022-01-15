import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import "react-bootstrap";
import * as auth_service from "../services/auth_service";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import "./style.css";
import ADMIN_NAVBAR from "../Navbar/admin_navbar";
import ReactGifLoader from "../components/gif_loader";
import "react-data-components/css/table-twbs.css";
import ConsultationLogo from ".././assets/consultation.png";
import SecLogo from ".././assets/second-op-logo.png";
import HomeLogo from ".././assets/home-service.png";
import MedicineLogo from ".././assets/medicine.png";
import LabLogo from ".././assets/labtest-logo.png";
import XRayLogo from ".././assets/x-ray-logo.png";

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()].join("/");
}
function convertTime(str) {
  var d = new Date(str);
  var hr = d.getHours();
  var min = d.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  var ampm = "am";
  if (hr > 12) {
    hr -= 12;
    ampm = "pm";
  }
  return hr + ":" + min+ " " + ampm;
}
const columns = [
  {
    name: "Name",
    selector: (row) => row["name"],
    sortable: true,
  },
  {
    name: "Location",
    selector: (row) => row["location"],
    sortable: true,
  },
  {
    name: "Condition /Symptoms",
    selector: (row) => row["symptoms"],
    sortable: true,
  },
  {
    name: "Date",
    selector: (row) => convert(row["preferred_date_first"]),
    sortable: true,
  },
  {
    name: "Time",
    selector: (row) => {
      return convertTime(row["preferred_date_first"]);
    },
    sortable: true,
  },
  {
    name: "Type",
    selector: (row) => row["type"],
    sortable: true,
  },
  {
    name: "Insurance",
    selector: (row) => row["status"],
    sortable: true,
  },
];

const customStyles = {
  rows: {
    style: {
      cursor: "pointer", 
    },
  },
};

export default function ADMIN_ENQUIRY_DASHBOARD(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [enquriesstatus, setEnquriesstatus] = useState([]);
  const [search, setSearch] = useState("");
  const [enquries, setEnquries] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchData("null").then(() => setLoading(false));
  }, []);
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  async function fetchData(enquiryField) {
    let data = localStorage.getItem("login");
    data = JSON.parse(data);
    const getadminstaus = await auth_service.getadminstaus(data.login_id);
    setEnquriesstatus(getadminstaus.payload);

    const getenquries = await auth_service.getenquriesSpecific(
      data.login_id,
      enquiryField
    );
    setEnquries(getenquries.payload);
  }

  const handleSubmit = async (event) => {
    history.push({
      pathname: "/admin/enquiry/info",
      state: event._id,
    });
  };
  const DashboardItem = ({ item_img, item_desc, item_link }) => {
    return (
      <div
        role={"button"}
        className="dashboard-item-container text-center p-3"
        onClick={() => {
          fetchData(item_link);
          setTitle(item_desc);
        }}
      >
        <div className="item-logo">
          <img src={item_img} width="40px" alt="dashboard item" />
        </div>
        <div className="item-desc">
          <p>{item_desc}</p>
        </div>
      </div>
    );
  };

  if (loading === true)
    return (
      <>
        <ReactGifLoader />
      </>
    );
  else
    return (
      <>
        <ADMIN_NAVBAR />
        <div className="text-center">
          <h1 className="mt-0 p-4 " style={{ color: "#164572" }}>
            Enquiry Dashboard
          </h1>
          <h2 style={{ color: "#787575" }}>Quick Stats</h2>
        </div>
        {enquriesstatus.map((target, index) => (
          <div key={index} {...target}>
            <div className="enquiries container-fluid">
              <div className="col-md-2 col-sm-6 total_enquiries text-center">
                <div className="text-center">
                  <i
                    style={{
                      fontSize: 26,
                      marginTop: "25px",
                      color: "#000000",
                    }}
                    className="fa fa-file"
                  ></i>
                  <h1 style={{ paddingLeft: "1rem", color: "#000000" }}>
                    {target.total}
                  </h1>
                </div>
                <h3 className="mt-0 pb-3" style={{ color: "#000000" }}>
                  Total Enquiries
                </h3>
              </div>
              <div className="col-md-2 col-sm-6 new_enquiries text-center">
                <div className=" text-center">
                  <i
                    style={{
                      fontSize: 26,
                      marginTop: "25px",
                      color: "#000000",
                    }}
                    className="fa fa-plus"
                  ></i>
                  <h1 style={{ paddingLeft: "1rem", color: "#000000" }}>
                    {target.new}
                  </h1>
                </div>
                <h3 className="mt-0 pb-3" style={{ color: "#000000" }}>
                  New Enquiries
                </h3>
              </div>
              <div className="col-md-2 col-sm-6 won_enquiries text-center">
                <div className="text-center">
                  <i
                    style={{
                      fontSize: 26,
                      marginTop: "25px",
                      color: "#000000",
                    }}
                    className=" fa fa-smile-o "
                  ></i>
                  <h1 style={{ paddingLeft: "1rem", color: "#000000" }}>
                    {target.won}
                  </h1>
                </div>
                <h3 className="mt-0 pb-3" style={{ color: "#000000" }}>
                  Won Enquiries
                </h3>
              </div>
              <div className="col-md-2 col-sm-6 awaiting_enquiries text-center">
                <div className="text-center">
                  <i
                    style={{
                      fontSize: 26,
                      marginTop: "25px",
                      color: "#000000",
                    }}
                    className="fa fa-frown-o"
                  ></i>
                  <h1 style={{ paddingLeft: "1rem", color: "#000000" }}>
                    {target.lost}
                  </h1>
                </div>
                <h3 className="mt-0 pb-3" style={{ color: "#000000" }}>
                  Lost Enquiries
                </h3>
              </div>

              <div className="col-md-2 col-sm-6 lost_enquiries text-center">
                <div className="text-center">
                  <i
                    style={{
                      fontSize: 26,
                      marginTop: "25px",
                      color: "#000000",
                    }}
                    className="fa fa-tasks"
                  ></i>
                  <h1 style={{ paddingLeft: "1rem", color: "#000000" }}>
                    {target.inprogress}
                  </h1>
                </div>
                <h3 className="mt-0 pb-3" style={{ color: "#000000" }}>
                  In Progress
                </h3>
              </div>
              <div className="col-md-2 col-sm-6 sent_quote text-center">
                <div className="text-center">
                  <i
                    style={{
                      fontSize: 26,
                      marginTop: "25px",
                      color: "#000000",
                    }}
                    className="fa fa-share"
                  ></i>
                  <h1 style={{ paddingLeft: "1rem", color: "#000000" }}>
                    {target.sentquote}
                  </h1>
                </div>
                <h3 className="mt-0 pb-3" style={{ color: "#000000" }}>
                  Quote Sent
                </h3>
              </div>
            </div>
          </div>
        ))}

        <div className="container-fluid">
          <div className="col-md-2 col-sm-6">
            <DashboardItem
              item_desc="New Consultation"
              item_img={ConsultationLogo}
              item_link={"new_consultation"}
            />
          </div>
          <div className="col-md-2 col-sm-6">
            <DashboardItem
              item_desc="Second Opinion"
              item_img={SecLogo}
              item_link={"free_opinion"}
            />
          </div>
          <div className="col-md-2 col-sm-6">
            <DashboardItem
              item_desc="Home Service"
              item_img={HomeLogo}
              item_link={"home_care_services"}
            />
          </div>
          <div className="col-md-2 col-sm-6">
            <DashboardItem
              item_desc="Pharmacy"
              item_img={MedicineLogo}
              item_link={"pharmacy"}
            />
          </div>
          <div className="col-md-2 col-sm-6">
            <DashboardItem
              item_desc="Lab Tests"
              item_img={LabLogo}
              item_link={"lab_tests"}
            />
          </div>
          <div className="col-md-2  col-sm-6">
            <DashboardItem
              item_desc="Diagnostics/ Radiology"
              item_img={XRayLogo}
              item_link={"diagnostic"}
            />
          </div>
        </div>
        <div className="patient_table_container">
          <div className="text-center">
            <h1>{title ? title + " :" : ""}</h1>
          </div>
          <div className="data_table">
            <div className="col-md-12">
              <label htmlFor="search">
                Search by Patient Name:
                <br />
                <input id="search" type="text" onChange={handleSearch} />
              </label>
            </div>

            <DataTable
              className="react_table"
              style={{ paddingTop: "30px" }}
              columns={columns}
              data={enquries.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
              )}
              highlightOnHover
              pagination
              paginationPerPage={5}
              defaultSortField="name"
              onRowClicked={(target) => handleSubmit(target)}
              paginationRowsPerPageOptions={[3, 5, 15, 25, 50]}
              customStyles={customStyles}
              theme="default"
              fixedHeader
              paginationComponentOptions={{
                rowsPerPageText: "Records per page:",
                rangeSeparatorText: "out of",
              }}
            />
          </div>
        </div>
      </>
    );
}
