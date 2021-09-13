import React, {useState} from 'react';



const res = {
    "medstar":[
        {
            "hospital_name":"MEDSTAR AESTHETICS & MULTI SPECIALITY CENTRE",
            "hospital_location":"Dubai, UAE",
            "hospital_address":"GROUND FLOOR, GULF TOWER, OUD METHA P.O BOX: 117084, DUBAI, UAE",
            "hospital_mobile":"800 22 33",
            "hospital_email":"talktous@medstarhhc.com"
        },
        
    ],
    "hospital_names":[
        {
            "name":"MEDSTAR AESTHETICS & MULTI SPECIALITY CENTRE",
            "location":"Dubai, UAE"
        },
        {
            "name":"Abcd",
            "location":"Abu Dhabi, UAE"
        },
        {
            "name":"Efgh",
            "location":"Reading, UK"
        },
    ],
    "services":[
        {
            "list1":"Breast Clinic",
            "list2":"Fistula",
            "list3":"Face Lift",
            "list4":"Gynecomastia",
            "list5":"Liposuction",
            "list6":"Mommy Makeover",
            "list7":"Tummy Tuck",
            "list8":"Circumsision",
            "list9":"Contipation",
            "list10":"Fistula",
            "list11":"Hemorrhoids(Piles)",
            "list12":"Hernia",
            "list13":"Pilonidal Sinus",
            "list14":"Fillers",
            "list15":"Laser and body contering",
            "list16":"Laser Procedure",
            "list17":"Skin Care",
            "list18":"Gastric Pill Balloon",
            "list19":"Endoscopic Procedures",
            "list20":"Weight loss clinic",
            "list21":"Gastric Pill Balloon",
            "list22":"Endoscopic Procedures",
            "list23":"Weight loss Clinic",
            "list24":"Cosmetic Gynaecology",
            "list25":"Back Pain"

        }
    ],
    "khazna":[
        {
            "company_name":"AL Khazna Insurance Company",
            "basic_build":"yes",
            "general":"yes",
            "premium":"yes"
        }
    ]

}


export default function Hospital_Details({target}){
    const [selectedImages, setSelectedImage] = useState([])

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
    console.log(target.speciality)
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
                            <div className = "insurance_container ">
                  <h5 style = {{paddingLeft: 20, paddingTop: 10}}>Insurance</h5>
                <div>
                <div className = "insurance_inner">
                 <div className = "row">
                 { 
                res.khazna.map((target,index) => (
                    <div className = "insurance_detail_container col-sm-4" key = {index} {...target}>
                        <h4 style = {{textAlign: "center"}}>{target.company_name}</h4>
                        <h4>Basic Plus: {target.basic_build}</h4>
                        <h4>General   : {target.general}</h4>
                        <h4>Premium   : {target.premium}</h4>
                    </div>
                ))}
                { 
                res.khazna.map((target,index) => (
                    <div className = "insurance_detail_container col-sm-4" key = {index} {...target}>
                        <h4 style = {{textAlign: "center"}}>{target.company_name}</h4>
                        <h4>Basic Plus: {target.basic_build}</h4>
                        <h4>General   : {target.general}</h4>
                        <h4>Premium   : {target.premium}</h4>
                    </div>
                ))}
                 </div>
                
                 <div className = "row">
                 { 
                res.khazna.map((target,index) => (
                    <div className = "insurance_detail_container col-sm-4" key = {index} {...target}>
                        <h4 style = {{textAlign: "center"}}>{target.company_name}</h4>
                        <h4>Basic Plus: {target.basic_build}</h4>
                        <h4>General   : {target.general}</h4>
                        <h4>Premium   : {target.premium}</h4>
                    </div>
                ))}
                { 
                res.khazna.map((target,index) => (
                    <div className = "insurance_detail_container col-sm-4" key = {index} {...target}>
                        <h4 style = {{textAlign: "center"}}>{target.company_name}</h4>
                        <h4>Basic Plus: {target.basic_build}</h4>
                        <h4>General   : {target.general}</h4>
                        <h4>Premium   : {target.premium}</h4>
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