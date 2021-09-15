import React, {useState,useEffect} from 'react';






export default function HospitalDetails({target}){
    const [selectedImages, setSelectedImage] = useState([])

    const [insurance, setInsurance] = useState([]);

    useEffect(() => {

       setInsurance(target.insurance)
    }, [target]);
    const imageHandleChange = (e) => {
        if(e.target.files){
            const fileArray = Array.from(e.target.files).map((file)=> URL.createObjectURL(file))

            setSelectedImage((prevImages)=>prevImages.concat(fileArray))
            Array.from(e.target.files).map(
                (file)=>URL.revokeObjectURL(file)
            )
        }
    }

    const renderPhotos = (source) =>{
        return source.map((photo)=>{
            return <img className = "photos" src= {photo} key = {photo} alt = ""/>
        })
    }
    
    return(
        <>
        <div className = "hospital-info col-md-4">
                <div className = "medstar_container">
                        <img className = "medstar_image"  src = "assets\images\Medstar-Healthcare-Jobs.png" alt = ""/>  
                        <h5 style = {{textAlign: "center", padding: 5}}>{target.hospital_name}</h5>
                        <h6 style = {{textAlign: "center", padding: 5}}>{target.google_location}</h6>
                        <div className = "d-flex p-4">
                            <i style = {{fontSize: 22}} className = "fa fa-map-marker"></i>
                            <h6 style = {{paddingLeft: 10}}>{target.address}</h6>
                            
                        </div>
                        <div className = "d-flex p-4">
                            <i style = {{fontSize: 20}} className = "fa fa-phone"></i>
                            <h6 style = {{paddingLeft: 10}}>{target.phno}</h6>
                            
                        </div>
                        <div className = "d-flex p-4">
                            <i style = {{fontSize: 22}} className = "fa fa-map-marker"></i>
                            <h6 style = {{paddingLeft: 10}}>{target.hospital_email}</h6>
                            
                        </div>
                    </div> 
                    <div className = " hospital_photos_container">
                <div className = "d-flex">
                <h5 style = {{paddingLeft: 10}}>Gallery</h5>
                <input style = {{paddingLeft: 150}} type = "file" id = "file" multiple onChange = {imageHandleChange} className = "inputfile"/>
                </div>
                <div className = "hospital_photos_inner"> 
                    {/* <div className = "d-flex">
                        <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                        <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                        <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                        
                    </div>
                    <div className = "d-flex">
                        <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                        <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                        <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                        
                    </div>
                    <div className = "d-flex">
                        <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                        <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                        <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                        
                    </div>
                    <div className = "d-flex">
                        <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                        <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                        <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                        
                    </div>
                    <div className = "d-flex">
                        <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                        <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                        <img className = "hospital_photos"  src = "assets\images\doctor_image.jpg" alt = ""/>
                        
                    </div>
                    
                     */}
                     {renderPhotos(selectedImages)}
                </div>
              </div>
              </div>        
              <div className = "col-md-4">
             
                            <div className = "hospital_services_container">
                                <h4 style = {{marginLeft: 30}}>Our Specialities</h4>
                                <div className = "d-flex">
                                    <div style = {{marginLeft: 30, marginTop: 10}}>
                                        <ul>
                                         { 
                            target.speciality.map((item,index) => (
                                                <li key = {index}>{item}</li>
                            ))}
                                               
                                        </ul>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            <div style = {{overflow: "hidden", overflowY: "scroll"}} className = "insurance_container ">
                  <h5 style = {{paddingLeft: 20, paddingTop: 10}}>Insurance</h5>
                <div>
                <div className = "insurance_inner">
                 <div className = "row">
                 { 
                insurance.map((target,index) => (
                    <div className = "insurance_detail_container col-sm-4" key = {index} {...target}>
                        <h4 style = {{textAlign: "center"}}>{target.insurance_company_name}</h4>
                        <h4>Type: {target.type}</h4>
                        
                    </div>
                ))}
               
               </div>     
                 </div>
                </div>
              </div>
                       
                       
                </div>
             
              
    
 
        </>
    )
}