import { writable } from "svelte/store";
import type { Pizza } from "../types";

const pizzas = writable<Pizza[]>([]);

const customStore = {
  subscribe: pizzas.subscribe,
  setPizzas: (items: Pizza[]) => pizzas.set(items),
  removePizza: (id: string) => {
    pizzas.update((items: Pizza[]) => {
      return items.filter((item: Pizza) => item._id !== id);
    });
  },
  updatePizza: (id: string, pizza: Pizza) => {
    pizzas.update((items: Pizza[]) => {
      return items.map((item) => {
        if (item._id === id) {
          return pizza;
        }
        return item;
      });
    });
  },
  addPizza: (pizza: Pizza) => {
    pizzas.update((items: Pizza[]) => {
      return [...items, pizza];
    });
  },
};

export default customStore;
