import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  name: "timers",
  initialState: {
    sessionTimer: { startTime: null, remainingTime: 0 },
    pauseTimer: { startTime: null, remainingTime: 0 },
  },
  reducers: {
    saveSessionTimer: (state, action) => {
      state.sessionTimer = action.payload; // { startTime, remainingTime }
    },
    savePauseTimer: (state, action) => {
      state.pauseTimer = action.payload; // { startTime, remainingTime }
    },
  },
});

export const { saveSessionTimer, savePauseTimer } = slice.actions;
export default slice.reducer;
