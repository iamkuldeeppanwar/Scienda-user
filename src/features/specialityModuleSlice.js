import { createSlice } from "@reduxjs/toolkit";

const specialityModuleSlice = createSlice({
  name: "specialityModule",
  initialState: {
    specialities: [],
    speciality: {},
  },
  reducers: {
    setSpecialitys: (state, action) => {
      state.specialities = action.payload.topics;
    },
    setSpeciality: (state, action) => {
      state.speciality = action.payload.topic;
    },
  },
});

export const { setSpecialitys, setSpeciality } = specialityModuleSlice.actions;
export default specialityModuleSlice.reducer;
