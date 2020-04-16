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

// GET all categories
export const getCategories = () => {
  return fetch(`/api/categories`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Create product
export const createProduct = (userId, authToken, product) => {
  return fetch(`/api/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// GET all products
export const getProducts = () => {
  return fetch(`/api/products`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Delete a product
export const deleteProduct = (userId, authToken, productId) => {
  return fetch(`/api/${productId}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Get a product
export const getProduct = (productId) => {
  return fetch(`/api/product/${productId}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Update a product
export const updateProduct = (userId, productId, authToken, product) => {
  return fetch(`/api/${productId}/${userId}`, {
    methode: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
