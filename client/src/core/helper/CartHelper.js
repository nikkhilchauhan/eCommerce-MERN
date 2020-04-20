export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.unshift({ ...item, count: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
};

export const removeItemFromCart = (itemId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart = cart.filter((c) => c._id !== itemId);

    //   -----OR----
    // cart.map((item, index) => {
    //   if (item._id === itemId) {
    //     cart.splice(index, 1);
    //   }
    // });

    //Basically we're overriding value of cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  return cart;
};
