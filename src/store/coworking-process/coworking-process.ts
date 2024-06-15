import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpaces } from '../../consts';
import { fetchCoworkingAction, postCoworkingAction, postCoworkingAvatarAction, postCoworkingCapabilityAction, postCoworkingEventAction, postCoworkingImageAction, postCoworkingScheduleAction, postCoworkingSeatsAction } from '../api-actions';
import { CoworkingDto } from '../../types/coworking/coworking-dto';
import { CoworkingShortDto } from '../../types/coworking/coworking-short-dto';
import { EventDto } from '../../types/api-shared/event-dto';
import { CoworkingCapabilityDto } from '../../types/api-shared/coworking-capability-dto';
import { SeatDto } from '../../types/api-shared/seat-dto';
import { ScheduleDto } from '../../types/api-shared/schedule-dto';
import { UploadedImageData } from '../../types/admin/uploaded-image-data';

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
        state.coworkingFetchingError = false;
      })
      .addCase(fetchCoworkingAction.fulfilled, (state, action: PayloadAction<CoworkingDto>) => {
        state.coworkingDto = action.payload;
        state.coworkingFetching = false;
      })
      .addCase(fetchCoworkingAction.rejected, (state) => {
        state.coworkingDto = undefined;
        state.coworkingFetching = false;
        state.coworkingFetchingError = true;
      })

      .addCase(postCoworkingAction.fulfilled, (state, action: PayloadAction<CoworkingShortDto>) => {
        state.coworkingDto = { ...action.payload } as CoworkingDto;
      })
      .addCase(postCoworkingAvatarAction.fulfilled, (state, action: PayloadAction<UploadedImageData>) => {
        if (state.coworkingDto?.id === action.payload.coworkingId) {
          state.coworkingDto.avatar = action.payload.imageName;
        }
      })
      .addCase(postCoworkingImageAction.fulfilled, (state, action: PayloadAction<UploadedImageData>) => {
        if (state.coworkingDto?.id === action.payload.coworkingId) {
          const images = state.coworkingDto.images ? [...state.coworkingDto.images] : [];
          // eslint-disable-next-line camelcase
          images.push({ image_filename: action.payload.imageName });
          state.coworkingDto.images = images;
        }
      })

      .addCase(postCoworkingEventAction.fulfilled, (state, action: PayloadAction<EventDto>) => {
        if (state.coworkingDto?.events) {
          state.coworkingDto.events.push(action.payload);
        }
      })
      .addCase(postCoworkingCapabilityAction.fulfilled, (state, action: PayloadAction<CoworkingCapabilityDto[]>) => {
        if (state.coworkingDto) {
          // eslint-disable-next-line camelcase
          state.coworkingDto.technical_capabilities = action.payload;
        }
      })
      .addCase(postCoworkingSeatsAction.fulfilled, (state, action: PayloadAction<SeatDto[]>) => {
        if (state.coworkingDto) {
          state.coworkingDto.seats = action.payload;
        }
      })
      .addCase(postCoworkingScheduleAction.fulfilled, (state, action: PayloadAction<ScheduleDto[]>) => {
        if (state.coworkingDto) {
          // eslint-disable-next-line camelcase
          state.coworkingDto.working_schedules = action.payload;
        }
      });
  },
});

// export const { someAction } = coworkingProcess.actions;
