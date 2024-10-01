import { configureStore } from '@reduxjs/toolkit';
import shoppingListReducer from './Slices/ShopingListSlice';

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
  },
});
