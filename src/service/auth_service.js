import { instance } from './base_service';

function login(data) {
  const req = instance.post('/patient/login', data);
  return req
}
function createaccount(data) {
  const req = instance.post('/patient/create', data);
  return req
}
function createNewConsulation(login_id,data) {
  const req = instance.post(`/newconsulation/${login_id}/create`, data);
  return req
}
function createSecondConsulation(login_id, data) {
  const req = instance.post(`/secondconsulation/${login_id}/create`, data);
  return req
}
function createHomeService(login_id, data) {
  const req = instance.post(`/homeservice/${login_id}/create`, data);
  return req
}
function createlab(login_id, data) {

  const req = instance.post(`/lab/${login_id}/create`, data);
  return req
}
function createDiagnostics(login_id, data) {

  const req = instance.post(`/diagnostics/${login_id}/create`, data);
  return req
}



export {
  login,
  createNewConsulation,
  createSecondConsulation,
  createHomeService,
  createlab,
  createDiagnostics,
  
  
  createaccount,
  
}
