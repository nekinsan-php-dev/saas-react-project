import api from "../api/axios";


export const createClient = async (data) => {
  return api.post('/clients', data);
};