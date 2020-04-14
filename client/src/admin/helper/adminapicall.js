// Create Category
export const createCategory = (userId, authToken, category) => {
  console.log(JSON.stringify({ userId, authToken, category }));
  return fetch(`/api/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      console.log(response.json());
      return response.json();
    })
    .catch((err) => console.log(err));
};
