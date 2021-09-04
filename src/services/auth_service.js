import { instance } from './base_service';





function login(data) { 
  const req = instance.post('/hospital/login', data);
  return req
}
function enquries(login_id,data) {
  const req = instance.post(`/enquries/${login_id}/create`, data);
  return req
}
function updateenquries(_id,data,login_id) {
  const req = instance.post(`/enquries/${login_id}/addhospitals?_id=${_id}`, data);
  return req
}
function getdoctorbyhospital(_id,login_id) {
  const req = instance.get(`/doctor/${login_id}/forhospital?Hospital_Name=${_id}`);
  return req
}
function gethospitals(login_id) {
  const req = instance.get(`/hospital/${login_id}`);
  return req
}

function getenquries(login_id) {
  const req = instance.get(`/enquries/${login_id}`);
  return req
}

function getenquriesbyhospitals(login_id) {
  const req = instance.get(`/enquries/${login_id}/hospital?hospital_login=${login_id}`);
  return req
}

function specility(login_id) {
  const req = instance.get(`/doctor`);
  return req
}

function sendquote(enquries_id,login_id,data) {
  
  const req = instance.post(`/enquries/${login_id}/hospital/sendquote?hospital_login=${login_id}&enquries_id=${enquries_id}`,data);
  return req
}

export  {login,enquries,getenquries,gethospitals,updateenquries,getdoctorbyhospital,getenquriesbyhospitals,sendquote,specility}

