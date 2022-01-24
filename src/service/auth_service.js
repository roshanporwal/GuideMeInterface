import { instance } from './base_service';

function login(data) {
  const req = instance.post('/patient/login', data);
  return req
}
function createaccount(data) {
  const req = instance.post('/patient/create', data);
  return req
}
function createNewenqurire(login_id,data) {
  const req = instance.post(`/patientenquries/${login_id}/create`, data);
  return req
}
function addFamilyMember(login_id,data){
  const req = instance.post(`/patient/${login_id}/addfamily`, data);
  return req
}
function getFamilyMembers(login_id){
  const req = instance.get(`/patient/${login_id}/getfamily`);
  return req
}




export {
  login,
  createNewenqurire,  
  addFamilyMember,
  createaccount,
  getFamilyMembers,
}
