import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'idle', 
  error: null,
};


export const fetchItems = createAsyncThunk('shoppingList/fetchItems', async () => {
  const response = await fetch('http://localhost:3000/items');
  return await response.json();
});


export const addItem = createAsyncThunk('shoppingList/addItem', async (item) => {
  const response = await fetch('http://localhost:3000/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return await response.json();
});


export const updateItem = createAsyncThunk('shoppingList/updateItem', async (item) => {
  const response = await fetch(`http://localhost:3000/items/${item.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return await response.json();
});


export const deleteItem = createAsyncThunk('shoppingList/deleteItem', async (id) => {
  await fetch(`http://localhost:3000/items/${id}`, {
    method: 'DELETE',
  });
  return id;
});


const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});
export const {addCase} = shoppingListSlice.actions
export default shoppingListSlice.reducer;