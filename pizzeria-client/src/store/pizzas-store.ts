import { writable } from "svelte/store";

const pizzas = writable([]);

const customStore = {
  subscribe: pizzas.subscribe,
  setPizzas: (items) => pizzas.set(items),
};

export default customStore;
