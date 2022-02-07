// import { Modal } from "react-bootstrap";
// import Img from "../../assets/ThnakModal.png";
function ThankYouModal(props) {

  return (
    <>
      {/* <Modal 
        show={props.modalshow} 
        onHide={props.handleModalClose}
        centered
      >        
            <img src={Img} alt="some logo"/>
      </Modal> */}
      <div className="row justify-content-center">
          <h1>Your response has been submitted Successfully.</h1>
          <div className="text-center mt-4">
            <input className="form-button" style = {{width:"13rem"}} type="button" value="Go to Home Page" onClick = {() => window.location = "/"} />
          </div>
        </div>
    </>
  )
}
export default ThankYouModal;