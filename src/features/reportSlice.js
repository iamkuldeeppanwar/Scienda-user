import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
  name: "reports",
  initialState: {
    reports: [],
    report: {},
  },
  reducers: {
    setReports: (state, action) => {
      state.reports = action.payload.reports;
    },
    setReport: (state, action) => {
      state.report = action.payload.report;
    },
  },
});

export const { setReports, setReport } = reportSlice.actions;
export default reportSlice.reducer;
