import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';

type ErrorProcessState = {
  errorCode: number | undefined;
}

const initialState: ErrorProcessState = {
  errorCode: undefined,
};

export const errorProcess = createSlice({
  name: NameSpace.Error,
  initialState,
  reducers: {
    setErrorCode: (state, action: PayloadAction<number | undefined>) => {
      state.errorCode = action.payload;
    },
  },
});

export const {setErrorCode} = errorProcess.actions;
