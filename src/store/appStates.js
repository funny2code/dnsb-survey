import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "appStates",
  initialState: {
    isTalking: false,
    isRecording: false,
    isRunning: true,
    isChoiceAllowed: true,
  },

  reducers: {
    setIsTalking: (appStates, action) => {
      appStates.isTalking = action.payload;
    },

    setIsRecording: (appStates, action) => {
      appStates.isRecording = action.payload;
    },

    setIsRunning: (appStates, action) => {
      appStates.isRunning = action.payload;
    },

    setIsChoiceAllowed: (appStates, action) => {
      appStates.isChoiceAllowed = action.payload;
    },
  },
});

export const {
  setIsTalking,
  setIsRecording,
  setIsRunning,
  setIsChoiceAllowed,
} = slice.actions;
export default slice.reducer;
