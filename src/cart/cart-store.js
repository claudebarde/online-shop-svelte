import { writable } from "svelte/store";

const cart = writable([]);

const customCart = {
  subscribe: cart.subscribe,
  addToCart: obj => {
    cart.update(items => [
      ...items.filter(item => item.id !== obj.id),
      { ...obj, quantity: 1 }
    ]);
  },
  updateQuantity: (value, id) => {
    if (value > 0 && value < 6) {
      cart.update(items =>
        items.map(item => {
          if (item.id === id) {
            return { ...item, quantity: value };
          } else {
            return item;
          }
        })
      );
    }
  },
  empty: () => cart.set([])
};

export default customCart;
