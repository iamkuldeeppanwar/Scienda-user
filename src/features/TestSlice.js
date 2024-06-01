import { createSlice } from "@reduxjs/toolkit";

const testsSlice = createSlice({
  name: "tests",
  initialState: {
    tests: [],
    test: {},
  },
  reducers: {
    setTests: (state, action) => {
      state.tests = action.payload.tests;
    },
    setTest: (state, action) => {
      state.test = action.payload.test;
    },
  },
});

export const { setTests, setTest } = testsSlice.actions;
export default testsSlice.reducer;
