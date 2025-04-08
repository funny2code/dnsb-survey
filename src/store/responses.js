import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "responses",
  initialState: {
    story: [],
    response: [],
  },

  reducers: {
    responseAdded: (responses, action) => {
      responses.list.push({
        name: action.payload.name,
        choiceList: [...action.payload.choiceList],
      });
    },

    storyAdded: (responses, action) => {
      if (action.payload) {
        responses.story = responses.story +" "+ action.payload;
      }
    },
  },
});

export const { responseAdded, storyAdded } = slice.actions;
export default slice.reducer;

// Action Creators
export const saveResponse = (response) =>
  apiCallBegan({
    url: remoteTestEndpoint,
    method: "post",
    data: response,
    onSuccess: responseAdded.type,
  });
