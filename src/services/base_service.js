import axios from 'axios';



const instance = axios.create({
  baseURL: `http://localhost:8080`,
  //"http://localhost:8080"
});

instance.interceptors.request.use(
  config => {
    let user =localStorage.getItem("login")
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
    console.log("error",error.response.status)
    console.log(error)
   // localStorage.removeItem("login")
   
   // window.location = '/';
    if(error.message  ==="Network Error"){
      return "Network Error";
    }
    else if(error.response.status===401){
      localStorage.removeItem("login")
   
       window.location = '/';
      console.log(error.status)
    }else { 
      
      //console.log(`Error requesting url ${error.config.url}: `, error.staus);
      return error?.response?.data;
    }

   
  },
);



 
    

export { instance };
