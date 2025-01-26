import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransactionData: (state, action) => {
      state.transactions = action.payload;
    },
    clearTransactionData: (state) => {
      state.transactions = null;
    },
  },
});

export const { addTransactionData, clearTransactionData } =
  transactionSlice.actions;
export default transactionSlice.reducer;
