import React from "react";
import 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import { Modal, Button } from 'react-bootstrap';

const res = {
    "doctors":[
        {
          "id":1,
          "name": "Dr Abrar Ahmed",
          "position": "General Medicine, Obesity Clinic",
          "desc": "Dr Abrar Ahmed has been associated with the science and study of Obesity and weight loss for the last 15 years. With his expertise in weight management and body transformation, he has helped a vast number of prople in achieving their body weight and shape. An experienced medical professional with a remarkable career, he has worked as a Physician in internal medical in multiple super speciality hospitals spanning over 3 countries. He iscertified obedity specialist (UK) affiliated with major international Obesity Organisation. He is the pioneer of Max Fat Loss which is designed and developed to produce rapid fat loss result.He is the author of international selling book '100 rules of fat loss' and also writes articles in different media on weight loss, health, and fitness.He speaks regularly on Obesity and related topics at various conventions and seminars. "
        },
        {
          "id":2,
          "name": "Dr Yunus Shaikh",
          "position": "General Medicine, Obesity Clinic",
          "desc": "Dr Yunus Shaikh has been associated with the science and study of Obesity and weight loss for the last 15 years. With his expertise in weight management and body transformation, he has helped a vast number of prople in achieving their body weight and shape. An experienced medical professional with a remarkable career, he has worked as a Physician in internal medical in multiple super speciality hospitals spanning over 3 countries. He iscertified obedity specialist (UK) affiliated with major international Obesity Organisation. He is the pioneer of Max Fat Loss which is designed and developed to produce rapid fat loss result.He is the author of international selling book '100 rules of fat loss' and also writes articles in different media on weight loss, health, and fitness.He speaks regularly on Obesity and related topics at various conventions and seminars."
        },
        {
          "id":3,
          "name": "Dr Ahfaz Shaikh",
          "position": "General Medicine, Obesity Clinic",
          "desc": "Dr Ahfaz Khan has been associated with the science and study of Obesity and weight loss for the last 15 years. With his expertise in weight management and body transformation, he has helped a vast number of prople in achieving their body weight and shape. An experienced medical professional with a remarkable career, he has worked as a Physician in internal medical in multiple super speciality hospitals spanning over 3 countries. He iscertified obedity specialist (UK) affiliated with major international Obesity Organisation. He is the pioneer of Max Fat Loss which is designed and developed to produce rapid fat loss result.He is the author of international selling book '100 rules of fat loss' and also writes articles in different media on weight loss, health, and fitness.He speaks regularly on Obesity and related topics at various conventions and seminars."
        }
      ]
}



class DOCTOR_LIST extends React.Component{
    constructor() {
        super();
        this.state = {
          name: 'React'
        };
      }

      state = {
        isOpen: false
      };
    
      openModal = () => this.setState({ isOpen: true });
      closeModal = () => this.setState({ isOpen: false });
    
    
   
    render(){
      
         
        return(
            <>
            <div className = "doctor_list_title">
                    <h1>Our Doctors</h1>
                    
                </div>
                <button style = {{marginLeft: "120rem"}} className = "new_doctor"  onClick={this.openModal}><i style = {{fontSize: 32}} className = "fa fa-user-plus"></i></button>
                <Modal show={this.state.isOpen} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>
                    Close
                    </Button>
                </Modal.Footer>
                </Modal>
             { 
                res.doctors.map((target,index) => (
                   
                <div key = {index}{...target}> 
                
                
           
                
               
                    <div className = "doctor_container d-flex col-md-10">
                        
                        <div className = "doctor_image_container">
                            <img className = "doctor_image"  src = "assets\images\doctor_image.jpg" alt = ""/>
                            <h5>{target.name}</h5>
                            <h6>{target.position}</h6>
                        </div>
                        <div className = "doctor_detail_container  col-md-10">
                            <h5 style = {{padding: 10, marginTop: "2rem"}}>
                                {target.desc}
                                </h5>
                                <i style = {{fontSize: 20, marginLeft: "80rem"}} class = "fa fa-pencil"></i>
                        </div>
                    </div>
                </div>     

        ))
    }
                
           
                   
             
                
                
            </>
        );
        
    
    }
}

export default DOCTOR_LIST;