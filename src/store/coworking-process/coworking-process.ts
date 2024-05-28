import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpaces } from '../../consts';
import { fetchCoworkingAction } from '../api-actions';
import { CoworkingDto } from '../../types/coworking/coworking-dto';

type CoworkingProcessState = {
  coworkingFetching: boolean;
  coworkingFetchingError: boolean;
  coworkingDto?: CoworkingDto;
}

const initialState: CoworkingProcessState = {
  coworkingFetching: false,
  coworkingFetchingError: false,
  coworkingDto: undefined,
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
      .addCase(fetchCoworkingAction.fulfilled, (state, action: PayloadAction<CoworkingDto>) => {
        state.coworkingDto = action.payload;
        state.coworkingFetching = false;
      })
      .addCase(fetchCoworkingAction.rejected, (state) => {
        state.coworkingDto = undefined; // перепроверить
        state.coworkingFetching = false;
      });
  },
});

// export const { someAction } = coworkingProcess.actions;
