import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

// Define an asynchronous action to handle registration logic
export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Fetch existing users to check if the email already exists
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
        throw new Error('Unable to fetch users');
      }

      const users = await response.json();

      // Check if the email already exists in the database
      const existingUser = users.find(user => user.email === userData.email);

      if (existingUser) {
        // If the user already exists, reject with a custom error message
        throw new Error('Email already in use. Please login.');
      }

      // If email is unique, proceed with registration
      const registrationResponse = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!registrationResponse.ok) {
        throw new Error('Registration failed');
      }

      const data = await registrationResponse.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message); // Return custom error message if email exists
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
