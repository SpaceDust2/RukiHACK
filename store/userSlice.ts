import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  developerId: number | null;
}

const initialState: UserState = {
  developerId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDeveloperId(state, action: PayloadAction<number>) {
      state.developerId = action.payload;
    },
  },
});

export const { setDeveloperId } = userSlice.actions;
export default userSlice.reducer;
