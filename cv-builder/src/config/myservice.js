import axios from "axios";
import { INVOICE_URL } from "./url";
export function AddUser(data) {
  return axios.post(`${INVOICE_URL}user/adduser`, data);
}
// email login
export function UserLogin(data) {
  return axios.post(`${INVOICE_URL}user/loginuser`, data);
}

// add picture

export function AddProfilePicture(data) {
  return axios.post(`${INVOICE_URL}user/addpicture`, data, {
    headers: { "content-type": "multipart/form-data" },
  });
}

export function ADDResume(data) {
  return axios.post(`${INVOICE_URL}resume/addresume`, data);
}

export function UPDATEResume(data) {
  return axios.post(`${INVOICE_URL}resume/updateresume`, data);
}

export function DELETEResume(data) {
  return axios.post(`${INVOICE_URL}resume/delresume`, data);
}

export function GETALLResume(data) {
  return axios.post(`${INVOICE_URL}resume/getallresume`, data);
}

export function GETResume(data) {
  return axios.post(`${INVOICE_URL}resume/getcurrentresume`, data);
}
