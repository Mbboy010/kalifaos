import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define the shape of the user object
export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface VerifyState {
  user: UserData | null;
  isAdmin: boolean;
  isLoading: boolean;
}

const initialState: VerifyState = {
  user: null,
  isAdmin: false,
  isLoading: true, // Useful for checking auth status on page load
}

export const isVerifySlice = createSlice({
  name: 'verify',
  initialState,
  reducers: {
    // Call this when the user logs in
    setAuth: (state, action: PayloadAction<{ user: UserData | null; isAdmin: boolean }>) => {
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin;
      state.isLoading = false;
    },
    // Call this when the user logs out
    clearAuth: (state) => {
      state.user = null;
      state.isAdmin = false;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAuth, clearAuth, setLoading } = isVerifySlice.actions

export default isVerifySlice.reducer
