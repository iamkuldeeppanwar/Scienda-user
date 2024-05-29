import { createSlice } from "@reduxjs/toolkit";

const ticketsSlice = createSlice({
  name: "ticket",
  initialState: {
    tickets: [],
    ticket: {},
  },
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload.tickets;
    },
    setTicket: (state, action) => {
      state.ticket = action.payload.ticket;
    },
  },
});

export const { setTickets, setTicket } = ticketsSlice.actions;
export default ticketsSlice.reducer;
