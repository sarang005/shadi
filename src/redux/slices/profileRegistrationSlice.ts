import { createSlice } from "@reduxjs/toolkit";

const profileRegistrationSlice = createSlice({
  name: "profileRegistration",
  initialState: {
    step: 1,
    loading: false,
  },
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
  },
});

export const { nextStep } = profileRegistrationSlice.actions;
export default profileRegistrationSlice.reducer;
