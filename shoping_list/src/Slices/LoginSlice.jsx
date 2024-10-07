import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an initial state for the login slice
const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,  // Keeps track of whether the user is logged in
};

// Define an asynchronous action to handle login logic
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      // Fetch all users from the database
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
        throw new Error('Unable to fetch users');
      }

      const users = await response.json();

      // Find the user with matching email
      const user = users.find((user) => user.email === loginData.email);

      if (!user) {
        throw new Error('User not found');
      }

      // Check if the password matches
      if (user.password !== loginData.password) {
        throw new Error('Invalid credentials');
      }

      // If email and password match, return user data
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a slice for login
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload; // Store the returned user data
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      });
  },
});

// Export the logout action and reducer
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
