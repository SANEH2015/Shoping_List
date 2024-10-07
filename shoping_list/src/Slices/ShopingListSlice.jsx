import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [],          // All items
  itemDetail: null,   // Detail of a single item
  status: 'idle',     // Loading, succeeded, or failed
  error: null,        // Error message
};

// Fetch items from the backend (JSON Server)
export const fetchItems = createAsyncThunk('shoppingList/fetchItems', async () => {
  const response = await fetch('http://localhost:3000/items');
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return await response.json();
});

// Fetch a single item by ID
export const fetchItemById = createAsyncThunk('shoppingList/fetchItemById', async (id) => {
  const response = await fetch(`http://localhost:3000/items/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch item');
  }
  return await response.json();
});

// Add a new item
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

// Update an existing item
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

// Delete an item
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
    // Handling fetch items
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Handling fetch item by ID
      .addCase(fetchItemById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.itemDetail = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Handling adding an item
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Handling updating an item
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // Handling deleting an item
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default shoppingListSlice.reducer;
