import { writable } from "svelte/store";
import { browser } from "$app/environment";

import type { User } from "../types";

const persistedUser = browser
  ? JSON.parse(atob(localStorage.getItem("user") || "") || '""')
  : null;

const user = writable<User | null>(persistedUser);
export const tokenStore = writable<string>("");

const customStore = {
  subscribe: user.subscribe,
  signIn: (userData: User) => {
    const { token, ...data } = userData;
    user.update((u) => (u = userData));
    tokenStore.update((t) => (t = token));
    localStorage.setItem("user", btoa(JSON.stringify(data)));
    localStorage.setItem("token", btoa(token));
  },
  logOut: () => {
    user.update((u) => (u = null));
    tokenStore.update((t) => (t = ""));
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
};

export default customStore;
