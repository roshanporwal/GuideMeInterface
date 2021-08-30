import { instance } from './base_service';





function login(data) { 
  const req = instance.post('/doctor/login', data);
  return req
}
function enquries(data) {
  const req = instance.post('/enquries/create', data);
  return req
}



export default {
 
  login,
  enquries
  
};
