import { createSlice } from '@reduxjs/toolkit';
import { FetchingStatuses, NameSpaces } from '../../consts';
import { postBookedCoworkingAction } from '../api-actions';
import { FetchingStatus } from '../../types/fetching-status';

type BookingProcessState = {
  bookFetchingStatus: FetchingStatus;
  bookedEventLink?: string;
}

const initialState: BookingProcessState = {
  bookFetchingStatus: FetchingStatuses.None,
  bookedEventLink: undefined,
};

export const bookingProcess = createSlice({
  name: NameSpaces.Coworking,
  initialState,
  reducers: {
    resetBookFetchingStatus: (state) => {
      state.bookFetchingStatus = FetchingStatuses.None;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postBookedCoworkingAction.pending, (state) => {
        state.bookFetchingStatus = FetchingStatuses.Pending;
      })
      .addCase(postBookedCoworkingAction.fulfilled, (state) => {
        // state.bookedEventLink = action.payload.eventLink;
        state.bookFetchingStatus = FetchingStatuses.Fulfilled;
      })
      .addCase(postBookedCoworkingAction.rejected, (state) => {
        state.bookFetchingStatus = FetchingStatuses.Rejected;
      });
  },
});

export const { resetBookFetchingStatus } = bookingProcess.actions;
