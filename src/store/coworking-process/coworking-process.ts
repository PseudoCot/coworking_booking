import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpaces } from '../../consts';
import { fetchCoworkingAction } from '../api-actions';
import { CoworkingData } from '../../types/coworking-data';

type CoworkingProcessState = {
  coworkingFetching: boolean;
  coworkingFetchingError: boolean;
  coworkingData?: CoworkingData;
}

const initialState: CoworkingProcessState = {
  coworkingFetching: false,
  coworkingFetchingError: false,
  coworkingData: undefined,
};

export const coworkingProcess = createSlice({
  name: NameSpaces.Coworking,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCoworkingAction.pending, (state) => {
        state.coworkingFetching = true;
      })
      .addCase(fetchCoworkingAction.fulfilled, (state, action: PayloadAction<CoworkingData>) => {
        state.coworkingData = action.payload;
        state.coworkingFetching = false;
      })
      .addCase(fetchCoworkingAction.rejected, (state) => {
        state.coworkingData = undefined; // перепроверить
        state.coworkingFetching = false;
      });
  },
});

// export const { someAction } = coworkingProcess.actions;
