import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { localEndpoint, remoteEndpoint, apiEndpoint } from "../config.json";
const remoteEnpointWithSession = remoteEndpoint + "?sid=" + window.sessionStart.sessionId + "&surveyStyle=" + window.sessionStart.surveyStyle;

const slice = createSlice({
  name: "surveys",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
    lastId: 0,
    choiceList: [],
    currentIndex: 0,
  },
  reducers: {
    surveyRequested: (surveys, action) => {
      surveys.loading = true;
    },

    surveyReceived: (surveys, action) => {
      surveys.list.push({
        id: ++surveys.lastId,
        survey: action.payload,
      });
      surveys.loading = false;
      surveys.lastFetch = { ...action.payload };
      surveys.currentIndex = surveys.list.length - 2; // Change to 1 later
      surveys.choiceList = action.payload.reply
        ? action.payload.reply.blanks[0].choiceList
        : action.payload.blanks[0].choiceList;
    },

    surveyRequestFailed: (surveys) => {
      surveys.loading = false;
    },

    moveToPreviousItem: (surveys) => {
      if (surveys.currentIndex > 0) {
        surveys.currentIndex -= 1; // Move to the previous item
      }
    },

    updateChoiceList: (surveys, action) => {
      surveys.choiceList = action.payload;
    },
  },
});

export const {
  surveyRequested,
  surveyReceived,
  surveyRequestFailed,
  moveToPreviousItem,
  updateChoiceList,
} = slice.actions;
export default slice.reducer;

// Action Creators
export const loadSurveys =
  (queryParams = {}) =>
  (dispatch, getState) => {
    dispatch(
      apiCallBegan({
        url: remoteEnpointWithSession,
        onStart: surveyRequested.type,
        onSuccess: surveyReceived.type,
        onError: surveyRequestFailed.type,
        method: "get",
        params: queryParams,
      })
    );
  };

export const addToStory = (formData) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: remoteEnpointWithSession,
      method: "post",
      data: formData,
      onStart: surveyRequested.type,
      onSuccess: surveyReceived.type,
      onError: surveyRequestFailed.type,
    })
  );
};
