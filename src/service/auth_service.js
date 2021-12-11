import { instance } from './base_service';





function login(data) {
  const req = instance.post('/hospital/login', data);
  return req
}
function loginadmin(data) {
  const req = instance.post('/admin/login', data);
  return req
}
function createNewConsulation(login_id,data) {
  const req = instance.post(`/newconsulation/create`, data);
  return req
}
function createSecondConsulation(login_id, data) {
  const req = instance.post(`/secondconsulation/create`, data);
  return req
}
function createHomeService(login_id, data) {
  const req = instance.post(`/homeservice/create`, data);
  return req
}
function createlab(login_id, data) {

  const req = instance.post(`/lab/create`, data);
  return req
}
function createDiagnostics(login_id, data) {

  const req = instance.post(`/diagnostics/create`, data);
  return req
}



export {
  login,
  createNewConsulation,
  createSecondConsulation,
  createHomeService,
  createlab,
  createDiagnostics,
  
  
  loginadmin,
  
}
