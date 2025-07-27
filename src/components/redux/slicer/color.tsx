import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ColorState {
  value: boolean
}

const initialState: ColorState = {
  value: false,
}

export const isColorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
      setColor: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setColor } = isColorSlice.actions

export default isColorSlice.reducer