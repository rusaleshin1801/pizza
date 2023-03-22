import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice.ts";
import cartSlice from "./slices/cartSlice.ts";
import pizza from "./slices/pizzaClice";

export const store = configureStore({
  reducer: { filterSlice, cartSlice, pizza },
});

export type RootState = ReturnType<typeof store.getState>;

// reducer: { filterSlice },, создали хранилище
