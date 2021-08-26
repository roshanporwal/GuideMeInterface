import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';



class Home extends React.Component{
    render(){
        return (


<Router>
<div className = "content d-flex" >
  <div className = "col-4">
    <div className = "d-flex">
    <img className = "login_image"  src = "assets\images\login_img.png" alt = ""/>
    
    </div>
    
  </div>
  <div className = "col-8">
    <h2 class = "login_title">Hospital/Doctor Login</h2>
    <form className = "login_form">
      <div className = "email_field">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input style = {{borderRadius: "5px"}} className = "form-control" type = "email" name = "email" placeholder = "name@domain.com" />
      </div>
      <div className = "password_field">
          <label htmlFor="exampleInputEmail1">Password</label>
          <input style = {{borderRadius: "5px"}} className = "form-control " type = "password" name = "password" placeholder = "**********" />
      </div>
      <div className = "submit_btn">
          
          <button className = "join_button" type = "submit">Join Now</button>
         
      </div>




    </form>
  </div>
</div>

</Router>
);
}
}

export default Home;
