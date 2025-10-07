import api from "../api/axios";


export const createClient = async (data) => {
  return api.post('/clients', data);
};

export const fetchClient = async (clientId) => {
  return api.get(`/clients/${clientId}`);
}

export const updateClient = async (clientId, data) => {
  return api.put(`/clients/${clientId}`, data);
}