import { createSlice } from "@reduxjs/toolkit";

const subAdminSlice = createSlice({
  name: "subAdmin",
  initialState: {
    subAdmins: [],
    subAdmin: {},
  },
  reducers: {
    setSubAdmins: (state, action) => {
      state.subAdmins = action.payload.professors;
    },
    setSubAdmin: (state, action) => {
      state.subAdmin = action.payload.professor;
    },
  },
});

export const { setSubAdmins, setSubAdmin } = subAdminSlice.actions;
export default subAdminSlice.reducer;
