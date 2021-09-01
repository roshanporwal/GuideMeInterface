import { instance } from './base_service';





function login(data) { 
  const req = instance.post('/hospital/login', data);
  return req
}
function enquries(data) {
  const req = instance.post('/enquries/create', data);
  return req
}
function updateenquries(_id,data) {
  const req = instance.post(`/enquries/addhospitals?_id=${_id}`, data);
  return req
}
function getdoctorbyhospital(_id) {
  const req = instance.get(`/doctor/forhospital?Hospital_Name=${_id}`);
  return req
}
function gethospitals() {
  const req = instance.get('/hospital');
  return req
}

function getenquries() {
  const req = instance.get('/enquries');
  return req
}

function getenquriesbyhospitals(login_id) {
  const req = instance.get(`/enquries/hospital?hospital_login=${login_id}`);
  return req
}

function sendquote(enquries_id,login_id,data) {
  
  const req = instance.post(`/enquries/hospital/sendquote?hospital_login=${login_id}&enquries_id=${enquries_id}`,data);
  return req
}



export default {
 
  login,
  enquries,
  getenquries,
  gethospitals,
  updateenquries,
  getdoctorbyhospital,
  getenquriesbyhospitals,
  sendquote
  
};
