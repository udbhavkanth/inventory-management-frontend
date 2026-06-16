import api from './api';

export async function getOrders({ skip = 0, limit = 10 } = {}) {
  const response = await api.get('/orders', {
    params: { skip, limit },
  });
  return response.data;
}

export async function getOrderById(id) {
  const response = await api.get(`/orders/${id}`);
  return response.data;
}

export async function createOrder(data) {
  const response = await api.post('/orders', data);
  return response.data;
}

export async function deleteOrder(id) {
  await api.delete(`/orders/${id}`);
}
