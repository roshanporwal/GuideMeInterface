// import { Modal } from "react-bootstrap";
// import Img from "../../assets/ThnakModal.png";
import { useNavigate } from "react-router-dom";
function ThankYouModal(props) {
  const navigate = useNavigate();
  console.log(props.formValues)
  

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
    return hr + ":" + min + " " + ampm;
  }
  return (
    <>

      <div className="row ">

      <p><b>Dear {props.formValues.name}, </b></p>
			<p><b>Your request for {props.formValues.subtype} has been received. Our team will get back to you shortly confirming the status. Please note down the following details.</b></p>
			<div className="DetailsBox">
				<p><b>Name :</b> {props.formValues.name}</p>
				<p><b>Phone :</b> {props.formValues.mobile}</p>
			
        {props.formValues.location || props.formValues.address_patient ?	(<p><b>Location :</b> {props.formValues.location || props.formValues.address_patient}</p>):null}
			  {props.formValues.symptoms ? (	<p><b>Symptoms :</b> {props.formValues.symptoms}</p>):null}
				{/* <p><b>Preferred Doctor :</b> Dr Ashwin</p> */}
			
				{props.formValues.preferred_date_first ? (<p><b>Preferred Date and Time 1 :</b> {convert(props.formValues.preferred_date_first)} {convertTime(props.formValues.preferred_date_first)} </p>):null}
				{props.formValues.preferred_date_second ? (<p><b>Preferred Date and Time 2 :</b>{convert(props.formValues.preferred_date_second)} {convertTime(props.formValues.preferred_date_second)}</p>):null}
			</div>
			<div className="row mt-3">
				<div className="col-sm-5">
					<button type="button" className="btn connectivity" onClick={() => navigate("/")}><div>&nbsp;Go Home&nbsp;</div></button>
				</div>
				<div className="col-sm-7">
					<button type="button" className="btn connectivity" onClick={() => window.location.reload()}><div>Book {props.formValues.subtype}</div></button>
				</div>
			</div>
        </div>
    </>
  )
}
export default ThankYouModal;