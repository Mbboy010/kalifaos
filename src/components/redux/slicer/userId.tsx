import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface userIdState {
  value: string 
}

const initialState: userIdState = {
  value: "0",
}

export const opacitySlice = createSlice({
  name: 'userId',
  initialState,
  reducers: {
      setUserId: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserId } = opacitySlice.actions

export default opacitySlice.reducer