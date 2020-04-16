// Create Category
export const createCategory = (userId, authToken, name) => {
  return fetch(`/api/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(name),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
