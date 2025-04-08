import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  name: "elements",
  initialState: {
    index: 0,
    questionTypeIndex: 0,
    ringTotal: 0,
    seenCheckbox: false,
    seenRank: false,
    scrollSpeed: 0.3,
    addedChoiceCounter: 0,
    exceedMaxWord: false,
    exceedMaxNumber: false,
    activeRow: {},
    activeRowIndex: null,
  },
  reducers: {
    setIndex: (elements, action) => {
      elements.index = action.payload;
    },
    setQuestionTypeIndex: (elements, action) => {
      elements.questionTypeIndex = action.payload;
    },
    setRingTotal: (elements, action) => {
      elements.ringTotal = action.payload;
    },

    setSeenCheckbox: (elements, action) => {
      elements.seenCheckbox = action.payload;
    },
    setSeenRank: (elements, action) => {
      elements.seenRank = action.payload;
    },
    setScrollSpeed: (elements, action) => {
      elements.scrollSpeed = action.payload;
    },

    setAddedChoiceCounter: (elements, action) => {
      elements.addedChoiceCounter = action.payload;
    },

    setExceedMaxWord: (elements, action) => {
      elements.exceedMaxWord = action.payload;
    },

    setExceedMaxNumber: (elements, action) => {
      elements.exceedMaxNumber = action.payload;
    },

    setActiveRow: (elements, action) => {
      elements.activeRow = action.payload;
    },

    setActiveRowIndex: (elements, action) => {
      elements.activeRowIndex = action.payload;
    },
  },
});

export const {
  setIndex,
  setQuestionTypeIndex,
  setRingTotal,
  setSeenCheckbox,
  setSeenRank,
  setScrollSpeed,
  setExceedMaxNumber,
  setExceedMaxWord,
  setActiveRow,
  setActiveRowIndex,
  setAddedChoiceCounter,
} = slice.actions;
export default slice.reducer;
