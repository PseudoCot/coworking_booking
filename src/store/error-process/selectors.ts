import { NameSpaces } from '../../consts';
import { State } from '../../types/state';

export const getErrorCode = (state: State): number | undefined => state[NameSpaces.Error].errorCode;
