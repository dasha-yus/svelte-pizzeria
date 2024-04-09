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
};

export default customStore;
