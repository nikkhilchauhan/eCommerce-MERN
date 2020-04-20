export const getProducts = async () => {
  try {
    const products = fetch(`api/products`, {
      method: 'GET',
    });
    return (await products).json();
  } catch (error) {
    console.log(error);
  }
};
