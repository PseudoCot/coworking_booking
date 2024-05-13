import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpaces } from '../../consts';
import { CoworkingShortData } from '../../types/coworking/coworking-short-data';
import { fetchCoworkingsBySearchAction, fetchCoworkingsByTimestampAction } from '../api-actions';

type CoworkingsProcessState = {
  coworkingsFetching: boolean;
  coworkingsFetchingError: boolean;
  coworkingsData?: CoworkingShortData[];
  coworkingNameSearch?: string;
  instituteSearch?: string;
  dateTimeSearch?: string;
}

const initialState: CoworkingsProcessState = {
  coworkingsFetching: false,
  coworkingsFetchingError: false,
  coworkingsData: [],
  coworkingNameSearch: '',
  instituteSearch: '',
  dateTimeSearch: '',
};

export const coworkingsProcess = createSlice({
  name: NameSpaces.Coworkings,
  initialState,
  reducers: {
    setCoworkingNameSearh: (state, action: PayloadAction<string>) => {
      state.coworkingNameSearch = action.payload;
    },
    setInstituteSearh: (state, action: PayloadAction<string>) => {
      state.instituteSearch = action.payload;
    },
    setDateTimeSearh: (state, action: PayloadAction<string>) => {
      state.dateTimeSearch = action.payload;
    },
    resetCoworkingNameSearh: (state) => {
      state.coworkingNameSearch = '';
    },
    resetInstituteSearh: (state) => {
      state.instituteSearch = '';
    },
    resetDateTimeSearh: (state) => {
      state.dateTimeSearch = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCoworkingsBySearchAction.pending, (state) => {
        state.coworkingsFetching = true;
      })
      .addCase(fetchCoworkingsBySearchAction.fulfilled, (state, action: PayloadAction<CoworkingShortData[]>) => {
        state.coworkingsData = action.payload;
        state.coworkingsFetching = false;
      })
      .addCase(fetchCoworkingsBySearchAction.rejected, (state) => {
        state.coworkingsData = []; // перепроверить
        state.coworkingsFetching = false;
      })
      .addCase(fetchCoworkingsByTimestampAction.pending, (state) => {
        state.coworkingsFetching = true;
      })
      .addCase(fetchCoworkingsByTimestampAction.fulfilled, (state, action: PayloadAction<CoworkingShortData[]>) => {
        state.coworkingsData = action.payload;
        state.coworkingsFetching = false;
      })
      .addCase(fetchCoworkingsByTimestampAction.rejected, (state) => {
        state.coworkingsData = []; // перепроверить
        state.coworkingsFetching = false;
      });
  },
});

export const { setCoworkingNameSearh, setInstituteSearh, resetCoworkingNameSearh, resetInstituteSearh } = coworkingsProcess.actions;
