import api from './api';

export async function getProducts({ skip = 0, limit = 10 } = {}) {
  const response = await api.get('/products', {
    params: { skip, limit },
  });
  return response.data;
}

export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

export async function createProduct(data) {
  const response = await api.post('/products', data);
  return response.data;
}

export async function updateProduct(id, data) {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
}

export async function deleteProduct(id) {
  await api.delete(`/products/${id}`);
}
