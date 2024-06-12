import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchingStatuses, NameSpaces } from '../../consts';
import { FetchingStatus } from '../../types/fetching-status';
import { postCoworkingAction, postCoworkingCapabilityAction, postCoworkingEventAction, postCoworkingScheduleAction, postCoworkingSeatsAction } from '../api-actions';

type AdminProcessState = {
  coworkingCreatingFetchingStatus: FetchingStatus;
  // coworkingEditingFetchingStatus: FetchingStatus;
  eventCreatingFetchingStatus: FetchingStatus;
  capabilitiesEditingFetchingStatus: FetchingStatus;
  seatsEditingFetchingStatus: FetchingStatus;
  scheduleEditingFetchingStatus: FetchingStatus;
}

// export type UserFetchingField = keyof Omit<UserProcessState, 'authStatus' | 'userData'>;
export type AdminFetchingField = keyof AdminProcessState;

const initialState: AdminProcessState = {
  coworkingCreatingFetchingStatus: FetchingStatuses.None,
  // coworkingEditingFetchingStatus: FetchingStatuses.None,
  eventCreatingFetchingStatus: FetchingStatuses.None,
  capabilitiesEditingFetchingStatus: FetchingStatuses.None,
  seatsEditingFetchingStatus: FetchingStatuses.None,
  scheduleEditingFetchingStatus: FetchingStatuses.None,
};

export const adminProcess = createSlice({
  name: NameSpaces.Admin,
  initialState,
  reducers: {
    resetAdminFetchingStatus: (state, action: PayloadAction<AdminFetchingField>) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore:
      state[action] = FetchingStatuses.None;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postCoworkingAction.pending, (state) => {
        state.coworkingCreatingFetchingStatus = FetchingStatuses.Pending;
      })
      .addCase(postCoworkingAction.fulfilled, (state) => {
        state.coworkingCreatingFetchingStatus = FetchingStatuses.Fulfilled;
      })
      .addCase(postCoworkingAction.rejected, (state) => {
        state.coworkingCreatingFetchingStatus = FetchingStatuses.Rejected;
      })

      .addCase(postCoworkingEventAction.pending, (state) => {
        state.capabilitiesEditingFetchingStatus = FetchingStatuses.Pending;
      })
      .addCase(postCoworkingEventAction.fulfilled, (state) => {
        state.capabilitiesEditingFetchingStatus = FetchingStatuses.Fulfilled;
      })
      .addCase(postCoworkingEventAction.rejected, (state) => {
        state.capabilitiesEditingFetchingStatus = FetchingStatuses.Rejected;
      })

      .addCase(postCoworkingCapabilityAction.pending, (state) => {
        state.eventCreatingFetchingStatus = FetchingStatuses.Pending;
      })
      .addCase(postCoworkingCapabilityAction.fulfilled, (state) => {
        state.eventCreatingFetchingStatus = FetchingStatuses.Fulfilled;
      })
      .addCase(postCoworkingCapabilityAction.rejected, (state) => {
        state.eventCreatingFetchingStatus = FetchingStatuses.Rejected;
      })

      .addCase(postCoworkingSeatsAction.pending, (state) => {
        state.seatsEditingFetchingStatus = FetchingStatuses.Pending;
      })
      .addCase(postCoworkingSeatsAction.fulfilled, (state) => {
        state.seatsEditingFetchingStatus = FetchingStatuses.Fulfilled;
      })
      .addCase(postCoworkingSeatsAction.rejected, (state) => {
        state.seatsEditingFetchingStatus = FetchingStatuses.Rejected;
      })

      .addCase(postCoworkingScheduleAction.pending, (state) => {
        state.scheduleEditingFetchingStatus = FetchingStatuses.Pending;
      })
      .addCase(postCoworkingScheduleAction.fulfilled, (state) => {
        state.scheduleEditingFetchingStatus = FetchingStatuses.Fulfilled;
      })
      .addCase(postCoworkingScheduleAction.rejected, (state) => {
        state.scheduleEditingFetchingStatus = FetchingStatuses.Rejected;
      });
  },
});

export const { resetAdminFetchingStatus } = adminProcess.actions;
