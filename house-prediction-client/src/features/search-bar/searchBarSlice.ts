import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { isTemplateExpression } from 'typescript';
import { RootState, AppThunk } from '../../app/store';
import { Item } from '../../models/item';

interface ItemState {
  item: Item;
}

const initialState: ItemState = {
  item: {
    property_type: -1,
    rooms: -1,
    floor: -1,
    square_foot: -1,
    day: 30,
    month: 5,
    year: 2022,
    lat: -1,
    lng: -1,
    model: 1,
  }
}

export const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    setSearchInput: (state: ItemState, action: PayloadAction<Item>) => {
      console.log('payload', action.payload)
      state.item = action.payload;
    },
  },
});

export const { setSearchInput, } = searchBarSlice.actions;

export const selectSearchInput = (state: RootState) => state.searchBar;

export default searchBarSlice.reducer;
