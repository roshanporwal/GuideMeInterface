import React, { useState } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import * as auth_service from "../services/auth_service";
import { useHistory } from 'react-router-dom';
import './style.css'



function Home(props) {
  const [values, setValues] = useState({
    login_id: "",
    password: ""
  })
  const history = useHistory();
  const handleChange = e => {
    const { name, value } = e.currentTarget
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleSubmit = async (event) => {
    console.log(values)
    event.preventDefault();
    const login = await auth_service.login(values)
    if (login.payload) {
      localStorage.setItem('login', JSON.stringify(login.payload));
      history.push({
        pathname: '/hospital/dashboard'
      });
    }




  }


  return (


    <Router>
      <div className="content d-flex" >
        <div className="col-4">
          <div className="d-flex">
            <img className="login_image" src="assets\images\login_img.png" alt="" />

          </div>

        </div>
        <div className="col-8">
          <h2 className="login_title">Hospital/Doctor Login</h2>
          <form className="login_form">
            <div className="email_field">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input style={{ borderRadius: "5px" }} className="form-control" type="text" name="login_id" value={values.login_id} onChange={handleChange} placeholder="name@domain.com" />
            </div>
            <div className="password_field">
              <label htmlFor="exampleInputEmail1">Password</label>
              <input style={{ borderRadius: "5px" }} className="form-control " type="password" name="password" value={values.password} onChange={handleChange} placeholder="**********" />
            </div>
            <div className="submit_btn">

              <button className="join_button" onClick={handleSubmit} type="submit">Join Now</button>

            </div>




          </form>
        </div>
      </div>

    </Router>
  );

}

export default Home;
