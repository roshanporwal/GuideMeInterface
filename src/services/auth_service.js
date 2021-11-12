import { instance } from './base_service';





function login(data) {
  const req = instance.post('/hospital/login', data);
  return req
}
function loginadmin(data) {
  const req = instance.post('/admin/login', data);
  return req
}
function getadminstaus(login_id) {
  const req = instance.get(`/enquries/${login_id}/admin/status`);
  return req
}
function gethospitalstaus(login_id, id) {
  const req = instance.get(`/enquries/${login_id}/hospitalstatus?id=${id}`);
  return req
}
function enquries(login_id, data) {
  const req = instance.post(`/enquries/${login_id}/create`, data);
  return req
}
function updatedoctor(login_id, _id, data) {

  const req = instance.post(`/doctor/${login_id}/update?login_id=${_id}`, data);
  return req
}
function updatehospital(login_id, data) {

  const req = instance.post(`/hospital/${login_id}/update?login_id=${login_id}`, data);
  return req
}

function createdoctor(data) {

  const req = instance.post(`/doctor/create`, data);
  return req
}
function updateenquries(_id, data, login_id) {
  const req = instance.post(`/enquries/${login_id}/addhospitals?_id=${_id}`, data);
  return req
}
function getenquriesbyid(login_id, _id) {
  const req = instance.get(`/enquries/${login_id}/id?_id=${_id}`);
  return req
}
function getenquriesbyid_patient(_id) {
  const req = instance.get(`/sendmail/get?id=${_id}`);
  return req
}
function getdoctorbyhospital(_id, login_id) {
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
function uploadexcelfile(data) {
  const req = instance.post(`/uploadexcel/insurance`, data);
  return req
}
function getenquries(login_id) {
  const req = instance.get(`/enquries/${login_id}`);
  return req
}

function deleteenquries(login_id,_id) {
  const req = instance.delete(`/enquries/${login_id}/remove?id=${_id}`);
  return req
}

function getenquriesbyhospitals(login_id, id) {
  const req = instance.get(`/enquries/${login_id}/hospital?hospital_id=${id}`);
  return req
}

function specility(login_id) {
  const req = instance.get(`/doctor`);
  return req
}

function sendquote(enquries_id, login_id, id, data) {

  const req = instance.post(`/enquries/${login_id}/hospital/sendquote?hospital_id=${id}&enquries_id=${enquries_id}`, data);
  return req
}

function wonandloss(enquries_id, login_id, hospital_id, data) {

  const req = instance.post(`/enquries/${login_id}/hospital/wonandloss?hospital_id=${hospital_id}&enquries_id=${enquries_id}`, data);
  return req
}

function feedback(enquries_id, login_id, data) {

  const req = instance.post(`/enquries/${login_id}/feedback?enquries_id=${enquries_id}`, data);
  return req
}


function sendmail(login_id, data) {

  const req = instance.post(`/sendmail/send`, data);
  return req
}
function idealdata(login_id, data) {

  const req = instance.get(`/smartsearch/ideal`);
  return req
}

function smartsearch(insurance, speciality) {

  const req = instance.get(`/smartsearch?insurance=${insurance}&&speciality=${speciality}`);
  return req
}

export {
  login,
  enquries,
  sendmail,
  getenquriesbyid_patient,
  gethospitalsall,
  gethospitalstaus,
  feedback,
  updatehospital,
  updatedoctor,
  createdoctor,
  getadminstaus,
  wonandloss,
  uploadexcelfile,
  getenquries,
  getenquriesbyid,
  gethospitals,
  updateenquries,
  getdoctorbyhospital,
  getenquriesbyhospitals,
  sendquote,
  specility,
  loginadmin,
  idealdata,
  smartsearch,
  deleteenquries
}
