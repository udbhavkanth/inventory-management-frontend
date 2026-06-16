import api from './api';

export async function getCustomers({ skip = 0, limit = 10 } = {}) {
  const response = await api.get('/customers', {
    params: { skip, limit },
  });
  return response.data;
}

export async function getCustomerById(id) {
  const response = await api.get(`/customers/${id}`);
  return response.data;
}

export async function createCustomer(data) {
  const response = await api.post('/customers', data);
  return response.data;
}

export async function deleteCustomer(id) {
  await api.delete(`/customers/${id}`);
}
