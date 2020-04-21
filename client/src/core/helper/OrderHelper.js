export const createOrder = (userId, authToekn, orderData) => {
  return fetch(`/api/order/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToekn}`,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
