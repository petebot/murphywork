// store.js
import { writable } from "svelte/store";

const initialState = {
  useFly: false,
  flyDirection: "next",
};

export const navigationStore = writable(initialState);
