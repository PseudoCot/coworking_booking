import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpaces } from '../../consts';
import { CoworkingShortData } from '../../types/coworking-short-data';
import { fetchCoworkingsAction } from '../api-actions';

type CoworkingsProcessState = {
  coworkingsFetching: boolean;
  coworkingsFetchingError: boolean;
  coworkingsData?: CoworkingShortData[];
  coworkingNameSearch?: string;
  instituteSearch?: string;
}

const initialState: CoworkingsProcessState = {
  coworkingsFetching: false,
  coworkingsFetchingError: false,
  coworkingsData: [],
  coworkingNameSearch: '',
  instituteSearch: '',
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
    resetCoworkingNameSearh: (state) => {
      state.coworkingNameSearch = '';
    },
    resetInstituteSearh: (state) => {
      state.instituteSearch = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCoworkingsAction.pending, (state) => {
        state.coworkingsFetching = true;
      })
      .addCase(fetchCoworkingsAction.fulfilled, (state, action: PayloadAction<CoworkingShortData[]>) => {
        state.coworkingsData = action.payload;
        state.coworkingsFetching = false;
      })
      .addCase(fetchCoworkingsAction.rejected, (state) => {
        state.coworkingsData = []; // перепроверить
        state.coworkingsFetching = false;
      });
  },
});

export const { setCoworkingNameSearh, setInstituteSearh, resetCoworkingNameSearh, resetInstituteSearh } = coworkingsProcess.actions;
