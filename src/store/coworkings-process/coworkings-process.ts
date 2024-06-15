import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpaces } from '../../consts';
import { fetchCoworkingsBySearchAction, fetchCoworkingsByTimestampAction } from '../api-actions';
import { CoworkingShortDto } from '../../types/coworking/coworking-short-dto';
import { CoworkingsSearchDto } from '../../types/api-shared/search-dto';

type CoworkingsProcessState = {
  coworkingsFetching: boolean;
  coworkingsFetchingError: boolean;
  coworkingsDto?: CoworkingShortDto[];
  searchParams: CoworkingsSearchDto;
}

const initialState: CoworkingsProcessState = {
  coworkingsFetching: false,
  coworkingsFetchingError: false,
  coworkingsDto: [],
  searchParams: {
    title: '',
    institute: ''
  },
};

export const coworkingsProcess = createSlice({
  name: NameSpaces.Coworkings,
  initialState,
  reducers: {
    setCoworkingSearchParams: (state, action: PayloadAction<CoworkingsSearchDto>) => {
      state.searchParams = action.payload;
    },
    resetCoworkingSearchParams: (state) => {
      state.searchParams.title = '';
      state.searchParams.institute = '';
    },
    clearCoworkingsData: (state) => {
      state.coworkingsDto = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCoworkingsBySearchAction.pending, (state) => {
        state.coworkingsDto = [];
        state.coworkingsFetching = true;
        state.coworkingsFetchingError = false;
      })
      .addCase(fetchCoworkingsBySearchAction.fulfilled, (state, action: PayloadAction<CoworkingShortDto[]>) => {
        state.coworkingsDto = action.payload;
        state.coworkingsFetching = false;
      })
      .addCase(fetchCoworkingsBySearchAction.rejected, (state) => {
        state.coworkingsFetching = false;
        state.coworkingsFetchingError = true;
      })

      .addCase(fetchCoworkingsByTimestampAction.pending, (state) => {
        state.coworkingsDto = [];
        state.coworkingsFetching = true;
        state.coworkingsFetchingError = false;
      })
      .addCase(fetchCoworkingsByTimestampAction.fulfilled, (state, action: PayloadAction<CoworkingShortDto[]>) => {
        state.coworkingsDto = action.payload;
        state.coworkingsFetching = false;
      })
      .addCase(fetchCoworkingsByTimestampAction.rejected, (state) => {
        state.coworkingsFetching = false;
        state.coworkingsFetchingError = true;
      });
  },
});

export const { setCoworkingSearchParams, resetCoworkingSearchParams, clearCoworkingsData } = coworkingsProcess.actions;
