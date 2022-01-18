import React, {useState,useEffect} from 'react';
import constants from '../constant';

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
            return <img src= {photo} key = {photo} alt = ""/>
        })
    }
    
    return(
        <>
        <div className = "hospital-info col-md-7 my-5">
            <div className="row">
                <div className="col-md-6">
                    <div className = "HospitalDetails">
                        <img src = {target.avatar[0]?target.avatar:`${constants.serverBaseUrl}/view?filepath=./tmp/pngegg.png`} alt = ""/>  
                        <h2>{target.hospital_name}</h2>
                        <h6>{target.google_location}</h6><br/>
                        <div className= "d-flex text-left">
                            <i className = "fa fa-map-marker pr-3"></i>&nbsp;&nbsp;
                            <h3>{target.address}</h3>
                        </div>
                        <div className= "d-flex text-left">
                            <i className = "fa fa-phone"></i>&nbsp;&nbsp;
                            <h3>{target.phno}</h3> 
                        </div>
                        <div className= "d-flex text-left">
                            <i className = "fa fa-map-marker"></i>&nbsp;&nbsp;
                            <h3>{target.hospital_email}</h3> 
                        </div>
                    </div> 
                    <div className = "HospitalGallary mt-3">
                        <h4>Gallery</h4>
                        <div className = "d-flex">
                            <input type = "file" id = "file" multiple onChange = {imageHandleChange} className = "inputfile"/>
                        </div>
                        <div className = "uploadedPhotos mt-3"> 
                            {renderPhotos(selectedImages)}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className = "HospitalServices">
                        <h4>Our Specialities</h4>
                         <ul>
                            { 
                            target.speciality.map((item,index) => (
                            <li key = {index}>{item}</li>
                            ))}                                             
                        </ul>
                    </div>
                    <div className = "HospitalInsurance mt-3">
                        <h4>Insurance</h4>
                        <div className = "row justify-content-center align-items-center">
                            { 
                            insurance.map((target,index) => (
                            <div className="col-md-4" key = {index} >    
                                <div className = "HospitalInsuranceDetail">
                                    <h6>{target.insurance_company_name}</h6>
                                    <h6>Type : {target.type}</h6>
                                </div>
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