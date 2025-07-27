import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface VerifyState {
  value: boolean
}

const initialState: VerifyState = {
  value: false,
}

export const isVerifySlice = createSlice({
  name: 'varify',
  initialState,
  reducers: {
      setVerify: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setVerify } = isVerifySlice.actions

export default isVerifySlice.reducer