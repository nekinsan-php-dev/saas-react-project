import api from "../api/axios"


export const createProduct = async (data) =>{
    return api.post('/products',data)
}

export const fetchProducts = async (page = 1, perPage = 10) => {
  return api.get(`/products?page=${page}&per_page=${perPage}`);
};
