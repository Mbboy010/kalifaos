import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ChatState {
  value: boolean
}

const initialState: ChatState = {
  value: false,
}

export const isChatSlice = createSlice({
  name: 'chatCheck',
  initialState,
  reducers: {
      setChat: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setChat } = isChatSlice.actions

export default isChatSlice.reducer