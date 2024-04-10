import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  isLoadingComplete: boolean;
}

const initialState: State = {
  isLoadingComplete: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoadingComplete: (s, action: PayloadAction<boolean>) => {
      s.isLoadingComplete = action.payload;
    },
  },
});

export const { setLoadingComplete } = loaderSlice.actions;

export default loaderSlice.reducer;
