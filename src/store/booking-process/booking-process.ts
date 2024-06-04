import { createSlice } from '@reduxjs/toolkit';
import { NameSpaces } from '../../consts';
import { postBookedCoworkingAction } from '../api-actions';

type BookingProcessState = {
  bookRequesting: boolean;
  bookingSuccess: boolean;
  bookingError: boolean;
  bookedEventLink?: string;
}

const initialState: BookingProcessState = {
  bookRequesting: false,
  bookingSuccess: false,
  bookingError: false,
  bookedEventLink: undefined,
};

export const bookingProcess = createSlice({
  name: NameSpaces.Coworking,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postBookedCoworkingAction.pending, (state) => {
        state.bookRequesting = true;
        state.bookingSuccess = false;
        state.bookingError = false;
      })
      .addCase(postBookedCoworkingAction.fulfilled, (state) => {
        // state.bookedEventLink = action.payload.eventLink;
        state.bookRequesting = false;
        state.bookingSuccess = true;
      })
      .addCase(postBookedCoworkingAction.rejected, (state) => {
        state.bookRequesting = false;
        state.bookingError = true;
      });
  },
});

// export const { someAction } = coworkingProcess.actions;
