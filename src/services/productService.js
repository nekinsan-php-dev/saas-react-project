import api from "../api/axios"


export const createProduct = async (data) =>{
    return api.post('/products',data)
}

export const fetchProducts = async (page = 1, perPage = 10) => {
  return api.get(`/products?page=${page}&per_page=${perPage}`);
};


export const fetchProduct = async  (productId) =>{
  return api.get(`/products/${productId}`)
}

export const updateProduct = async (productId,data) =>{
  return api.put(`/products/${productId}`,data)
}