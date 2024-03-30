import { NameSpace } from '../../consts';
import { State } from '../../types/state';

export const getErrorCode = (state: State): number => state[NameSpace.Error].errorCode;
