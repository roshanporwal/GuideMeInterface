import axios from 'axios';
import constants from '../constant';



const instance = axios.create({
  baseURL: `${constants.serverBaseUrl}`,
  //"http://localhost:8080"
});

instance.interceptors.request.use(
  config => {
    let user =localStorage.getItem("login_patient")
    user =JSON.parse(user)
   /* const state = store.getState();
    const { user } = state.appReducer;*/

    if (user && user.token) {
      config.headers.common.authorization = `Bearer ${user.token}`;
      //config.headers.common['X-Arnexa-Fid'] = constants.defaultNamespace;
    }
  
    return config;
  },
  error => {
    //localStorage.removeItem("login")
   // window.location = '/';
    if(error.message ==="Network Error"){
      return "Network Error";
    }
    else  {
      //console.log(`Error requesting url ${error.config.url}: `, error.message);
      
      throw error;
    }
   
  },
);

instance.interceptors.response.use(
  resp => {
    return resp.data;
  },
  error => {
    
   
   // window.location = '/';
    if(error.message  ==="Network Error"){
      return "Network Error";
    }
    else if(error.response.status===401){
      localStorage.removeItem("login")
   
      window.location = '/'; 
    }else { 
      
      //console.log(`Error requesting url ${error.config.url}: `, error.staus);
      return error?.response?.data;
    }

   
  },
);



 
    

export { instance };
