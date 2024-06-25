import { createSlice } from "@reduxjs/toolkit";

const proficiencySlice = createSlice({
  name: "proficiency",
  initialState: {
    proficiencies: [],
    proficiency: {},
  },
  reducers: {
    setProficiencies: (state, action) => {
      state.proficiencies = action.payload;
    },
    setProficiency: (state, action) => {
      state.proficiency = action.payload;
    },
  },
});

export const { setProficiencies, setProficiency } = proficiencySlice.actions;
export default proficiencySlice.reducer;
