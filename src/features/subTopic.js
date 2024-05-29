import { createSlice } from "@reduxjs/toolkit";

const topicsSlice = createSlice({
  name: "topics",
  initialState: {
    topics: [],
    topic: {},
  },
  reducers: {
    setTopics: (state, action) => {
      state.topics = action.payload.topics;
    },
    setTopic: (state, action) => {
      state.topic = action.payload.topic;
    },
  },
});

export const { setTopics, setTopic } = topicsSlice.actions;
export default topicsSlice.reducer;
