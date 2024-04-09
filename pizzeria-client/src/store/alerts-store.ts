import { writable } from "svelte/store";
import type { ToastAlert } from "../types";

export const toasts = writable<ToastAlert[]>([]);

export const dismissToast = (id: string) => {
  toasts.update((all) => all.filter((t) => t.id !== id));
};

export const addToast = (toast: ToastAlert) => {
  const id = Math.floor(Math.random() * 10000).toString();

  const defaults = {
    id,
    type: "info",
    timeout: 5000,
  };

  const t = { ...defaults, ...toast } as ToastAlert;
  toasts.update((all) => [t, ...all]);

  if (t.timeout) setTimeout(() => dismissToast(id.toString()), t.timeout);
};
