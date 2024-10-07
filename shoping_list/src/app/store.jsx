import { configureStore } from '@reduxjs/toolkit';
import shoppingListReducer from '../Slices/ShopingListSlice';
import registerReducer from '../Slices/RegisterSlice';
import loginReducer from '../Slices/LoginSlice';

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
    register: registerReducer,
    login: loginReducer,
  },
});
