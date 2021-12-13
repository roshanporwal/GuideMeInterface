import { Modal } from "react-bootstrap";
import Img from "../../assets/ThnakModal.png";
function ThankYouModal(props) {

  return (
    <>
      <Modal 
        show={props.modalshow} 
        onHide={props.handleModalClose}
        centered
      >        
            <img src={Img} alt="some logo"/>
      </Modal>
    </>
  )
}
export default ThankYouModal;