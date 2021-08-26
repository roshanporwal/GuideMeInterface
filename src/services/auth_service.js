import { instance } from './base_service';





function login(data) {
  console.log(data,"data")
  const req = instance.post('/doctor/login', data);
  return req
}



export default {
 
  login,
  
};
