import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SearchState = {
  value: string;
};

const initialState: SearchState = {
  value: "",
};

export const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    reset: () => initialState,
    changeSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { changeSearch } = search.actions;

export default search.reducer;
