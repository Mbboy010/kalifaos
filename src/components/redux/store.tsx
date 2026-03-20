import { configureStore } from '@reduxjs/toolkit'
import isAsideSlice from "./slicer/AsideCheck"
import opacitySlice from "./slicer/opacity"
import positSlice from "./slicer/posit"
import isColorSlice from "./slicer/color"
import isChatSlice from "./slicer/CheckChat"
import isLoadSlice from "./slicer/Load"
import isVerifySlice from "./slicer/verify" // This likely contains your user/isAdmin state
import userIdSlice from "./slicer/userId"

export const store = configureStore({
  reducer: {
    isAs: isAsideSlice,
    opacity: opacitySlice,
    posit: positSlice,
    color: isColorSlice,
    chatCheck: isChatSlice,
    load: isLoadSlice,
    verify: isVerifySlice,
    // --- ADDED THIS LINE ---
    auth: isVerifySlice, 
    // -----------------------
    userId: userIdSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
