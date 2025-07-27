import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LoadState {
  value: boolean
}

const initialState: LoadState = {
  value: false,
}

export const isLoadSlice = createSlice({
  name: 'load',
  initialState,
  reducers: {
      setLoad: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoad } = isLoadSlice.actions

export default isLoadSlice.reducer