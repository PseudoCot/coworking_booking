import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpaces } from '../../consts';
import { fetchBookedCoworkingsAction } from '../api-actions';
import { BookedCoworkingDto } from '../../types/booking/booked-coworking-dto';

type BookedCoworkingsProcessState = {
  coworkingsFetching: boolean;
  coworkingsFetchingError: boolean;
  bookingsDto?: BookedCoworkingDto[];
}

const initialState: BookedCoworkingsProcessState = {
  coworkingsFetching: false,
  coworkingsFetchingError: false,
  bookingsDto: [],
};

export const bookedCoworkingsProcess = createSlice({
  name: NameSpaces.Coworkings,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBookedCoworkingsAction.pending, (state) => {
        state.bookingsDto = [];
        state.coworkingsFetching = true;
        state.coworkingsFetchingError = false;
      })
      .addCase(fetchBookedCoworkingsAction.fulfilled, (state, action: PayloadAction<BookedCoworkingDto[]>) => {
        state.bookingsDto = action.payload;
        state.coworkingsFetching = false;
      })
      .addCase(fetchBookedCoworkingsAction.rejected, (state) => {
        state.coworkingsFetching = false;
        state.coworkingsFetchingError = true;
      });
  },
});

// export const { someAction } = bookedCoworkingsProcess.actions;
