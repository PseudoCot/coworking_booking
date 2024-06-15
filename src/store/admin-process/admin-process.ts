import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchingStatuses, NameSpaces } from '../../consts';
import { FetchingStatus } from '../../types/fetching-status';
import { postCoworkingAction, postCoworkingAvatarAction, postCoworkingCapabilityAction, postCoworkingEventAction, postCoworkingImageAction, postCoworkingScheduleAction, postCoworkingSeatsAction } from '../api-actions';
import { UploadedImageData } from '../../types/admin/uploaded-image-data';

type AdminProcessState = {
  coworkingCreatingFetchingStatus: FetchingStatus;
  avatarUploadingFetchingStatus: FetchingStatus;
  imagesUploadingFetchingStatuses: { [key: string]: FetchingStatus };
  eventCreatingFetchingStatus: FetchingStatus;
  capabilitiesEditingFetchingStatus: FetchingStatus;
  seatsEditingFetchingStatus: FetchingStatus;
  scheduleEditingFetchingStatus: FetchingStatus;
}

export type AdminFetchingField = keyof Omit<AdminProcessState, 'imagesUploadingFetchingStatuses'>;

const initialState: AdminProcessState = {
  coworkingCreatingFetchingStatus: FetchingStatuses.None,
  avatarUploadingFetchingStatus: FetchingStatuses.None,
  imagesUploadingFetchingStatuses: {},
  eventCreatingFetchingStatus: FetchingStatuses.None,
  capabilitiesEditingFetchingStatus: FetchingStatuses.None,
  seatsEditingFetchingStatus: FetchingStatuses.None,
  scheduleEditingFetchingStatus: FetchingStatuses.None,
};

export const adminProcess = createSlice({
  name: NameSpaces.Admin,
  initialState,
  reducers: {
    setImageFetchingStatus: (state, action: PayloadAction<[string, FetchingStatus]>) => {
      state.imagesUploadingFetchingStatuses[action.payload[0]] = action.payload[1];
    },
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

      .addCase(postCoworkingAvatarAction.pending, (state) => {
        state.avatarUploadingFetchingStatus = FetchingStatuses.Pending;
      })
      .addCase(postCoworkingAvatarAction.fulfilled, (state) => {
        state.avatarUploadingFetchingStatus = FetchingStatuses.Fulfilled;
      })
      .addCase(postCoworkingAvatarAction.rejected, (state) => {
        state.avatarUploadingFetchingStatus = FetchingStatuses.Rejected;
      })

      // .addCase(postCoworkingImageAction.pending, (state) => {
      //   state.imagesUploadingFetchingStatus = FetchingStatuses.Pending;
      // })
      .addCase(postCoworkingImageAction.fulfilled, (state, action: PayloadAction<UploadedImageData>) => {
        state.imagesUploadingFetchingStatuses[action.payload.imageName] = FetchingStatuses.Fulfilled;
      })
      // .addCase(postCoworkingImageAction.rejected, (state) => {
      //   state.imagesUploadingFetchingStatus = FetchingStatuses.Rejected;
      // })

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

export const { setImageFetchingStatus, resetAdminFetchingStatus } = adminProcess.actions;
