import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface MapState {
  value: number;
}

const initialState: MapState = {
  value: 0,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setPosition: (state: MapState, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setPosition, } = mapSlice.actions;

export const selectPosition = (state: RootState) => state.map.value;

export default mapSlice.reducer;
