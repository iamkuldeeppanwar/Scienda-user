import { createSlice } from "@reduxjs/toolkit";

const testsSlice = createSlice({
  name: "tests",
  initialState: {
    tests: [],
    test: {},
    restriction: false,
  },
  reducers: {
    setTests: (state, action) => {
      state.tests = action.payload.tests;
    },
    setTest: (state, action) => {
      state.test = action.payload.test;
    },
    setRestriction: (state, action) => {
      state.restriction = action.payload;
    },
  },
});

export const { setTests, setTest, setRestriction } = testsSlice.actions;
export default testsSlice.reducer;
