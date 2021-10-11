import React, { useState ,useEffect} from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import * as auth_service from "../services/auth_service";
import { useHistory } from 'react-router-dom';
import './style.css';




function Home(props) {
  
  const [values, setValues] = useState({
    login_id: "",
    password: ""
  })
  const history = useHistory();
  useEffect(() => {
    async function fetchData() {
      let data = localStorage.getItem("login")
     if(data===null){
       return 
     }
     const  islogin = JSON.parse(data)
     
        if(islogin.admin){
         history.push({
          pathname: '/admin/dashboard'
        });
        }else{
          history.push({
            pathname: '/hospital/dashboard'
          });
       
      }
      
    
    }
       
    fetchData()
  }, [history]);

  
  const handleChange = e => {
    const { name, value } = e.currentTarget
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const login = await auth_service.login(values)
    if (login.payload) {
      localStorage.setItem('login', JSON.stringify(login.payload));
      
      history.push({
        pathname: '/hospital/dashboard'
      });
    }else{
      alert(login.message)
    }




  }


  return (


    <Router>
      <div className = "container-fluid">
		<div className="content row">
			<div className="col-md-4 m-0 text-center">
				<img className = "Logo" src="/assets/images/GuideMeDocLogo.png" alt=""  />
			</div>
		</div>
		<div className="row">	
			<div className="col-md-4">
				<img className = "loginImage" src="assets\images\login_img.png" alt=""  />
			</div>
			<div className="col-md-8">
				<div className="login_form">
					<h2 className="login_title">Hospital/Doctor Login</h2>
					<form>
						<div className="email_field">
						  <label htmlFor="exampleInputEmail1">Email</label>
						  <input style={{ borderRadius: "5px" }} className="form-control" type="text" name="login_id" value={values.login_id} onChange={handleChange} placeholder="name@domain.com" />
						</div>
						<div className="password_field">
						  <label htmlFor="exampleInputEmail1">Password</label>
						  <input style={{ borderRadius: "5px" }} className="form-control " type="password" name="password" value={values.password} onChange={handleChange} placeholder="**********" />
						</div>
						<div className="submit_btn">
						  <button className="join_button" onClick={handleSubmit} type="submit">Login</button>
						 </div>
					</form>
				</div>
			</div>
		</div>
    </div>
    </Router>
  );

}

export default Home;
