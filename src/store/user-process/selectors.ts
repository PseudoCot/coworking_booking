import { NameSpaces } from '../../consts';
import { AuthStatus } from '../../types/auth-status';
import { FetchingStatus } from '../../types/fetching-status';
import { State } from '../../types/state';
import { UserData } from '../../types/user/user-data';
import { UserFetchingField } from './user-process';

export const getUserFetchingStatus = (type: UserFetchingField) => (state: State): FetchingStatus => state[NameSpaces.User][type];

export const getAuthStatus = (state: State): AuthStatus => state[NameSpaces.User].authStatus;
export const getUserData = (state: State): UserData | undefined => state[NameSpaces.User].userData;
export const isUserTelegramConnected = (state: State): boolean | undefined => state[NameSpaces.User].userData?.telegramConnected;
// export const showCheckEmailMessage = (state: State): boolean => state[NameSpaces.User].showCheckEmailMessage;

