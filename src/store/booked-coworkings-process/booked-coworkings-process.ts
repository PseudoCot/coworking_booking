import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpaces } from '../../consts';
import { fetchBookedCoworkingsAction, fetchCoworkingAction } from '../api-actions';
import { BookedCoworkingDto } from '../../types/booking/booked-coworking-dto';
import { CoworkingDto } from '../../types/coworking/coworking-dto';

type BookedCoworkingsProcessState = {
  coworkingsFetching: boolean;
  coworkingsFetchingError: boolean;
  bookingsDto?: BookedCoworkingDto[];
  coworkingsFullDto: { [key: string]: CoworkingDto };
}

const initialState: BookedCoworkingsProcessState = {
  coworkingsFetching: false,
  coworkingsFetchingError: false,
  bookingsDto: [],
  coworkingsFullDto: {},
};

export const bookedCoworkingsProcess = createSlice({
  name: NameSpaces.Coworkings,
  initialState,
  reducers: {
    clearBookedCoworkingsFullDto: (state) => {
      state.coworkingsFullDto = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBookedCoworkingsAction.pending, (state) => {
        state.bookingsDto = [];
        state.coworkingsFetching = true;
      })
      .addCase(fetchBookedCoworkingsAction.fulfilled, (state, action: PayloadAction<BookedCoworkingDto[]>) => {
        state.bookingsDto = action.payload;
        // state.coworkingsFetching = false;
      })
      .addCase(fetchBookedCoworkingsAction.rejected, (state) => {
        state.coworkingsFetching = false;
        state.coworkingsFetchingError = true;
      })
      // .addCase(fetchCoworkingAction.pending, (state) => {
      //   state.coworkingsFetching = true;
      // })
      .addCase(fetchCoworkingAction.fulfilled, (state, action: PayloadAction<CoworkingDto>) => {
        state.coworkingsFullDto[action.payload.id] = action.payload;
        state.coworkingsFetching = false;
      })
      .addCase(fetchCoworkingAction.rejected, (state) => {
        state.coworkingsFetching = false;
      });
  },
});

export const { clearBookedCoworkingsFullDto } = bookedCoworkingsProcess.actions;
