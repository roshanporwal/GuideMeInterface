import axios from 'axios';


const instance = axios.create({
  baseURL: `http://061f-2401-4900-5501-5cf5-ad8e-4e71-77be-dd02.ngrok.io`,
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
    if(error.message ==="Network Error"){
      return "Network Error";
    }
    else{
      console.log(`Error requesting url ${error.config.url}: `, error.message);
      throw error;
    }
   
  },
);

instance.interceptors.response.use(
  resp => {
    return resp.data;
  },
  error => {
    if(error.message  ==="Network Error"){
      return "Network Error";
    
    }

    
    else{
      
      console.log(`Error requesting url ${error.config.url}: `, error.message);
      throw error?.response?.data;
    }

   
  },
);

export { instance };
