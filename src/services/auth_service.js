import { instance } from './base_service';





function login(data) { 
  const req = instance.post('/hospital/login', data);
  return req
}
function loginadmin(data) { 
  const req = instance.post('/admin/login', data);
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
function getenquriesbyid(_id) {
  const req = instance.get(`/sendmail/get?_id=${_id}`);
  return req
}
function getdoctorbyhospital(_id,login_id) {
  const req = instance.get(`/doctor/${login_id}/forhospital?hospital_id=${_id}`);
  return req
}
function gethospitals(login_id) {
  const req = instance.get(`/hospital/${login_id}`);
  return req
}
function gethospitalsall(login_id) {
  const req = instance.get(`/hospital/${login_id}/alldata`);
  return req
}

function getenquries(login_id) {
  const req = instance.get(`/enquries/${login_id}`);
  return req
}

function getenquriesbyhospitals(login_id,id) {
  const req = instance.get(`/enquries/${login_id}/hospital?hospital_id=${id}`);
  return req
}

function specility(login_id) {
  const req = instance.get(`/doctor`);
  return req
}

function sendquote(enquries_id,login_id,id,data) {
  
  const req = instance.post(`/enquries/${login_id}/hospital/sendquote?hospital_id=${id}&enquries_id=${enquries_id}`,data);
  return req
}

function sendmail(login_id,data) {
  
  const req = instance.post(`/sendmail/send`,data);
  return req
}

export  {login,enquries,sendmail,gethospitalsall,getenquries,getenquriesbyid,gethospitals,updateenquries,getdoctorbyhospital,getenquriesbyhospitals,sendquote,specility,loginadmin}

