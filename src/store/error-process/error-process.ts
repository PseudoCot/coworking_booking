import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpaces } from '../../consts';

type ErrorProcessState = {
  errorCode?: number;
}

const initialState: ErrorProcessState = {
  errorCode: undefined,
};

export const errorProcess = createSlice({
  name: NameSpaces.Error,
  initialState,
  reducers: {
    setErrorCode: (state, action: PayloadAction<number | undefined>) => {
      state.errorCode = action.payload;
    },
  },
});

export const { setErrorCode } = errorProcess.actions;
