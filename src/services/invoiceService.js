import api from "../api/axios"


export const fetchInvoiceSetting = async ()=>{
    return api.get('/invoice-settings');
}

export const updateInvoiceSetting = (data) =>
  api.post("/invoice-settings", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });