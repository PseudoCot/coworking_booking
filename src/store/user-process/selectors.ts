import { NameSpaces } from '../../consts';
import { AuthStatus } from '../../types/auth-status';
import { State } from '../../types/state';

export const getUserName = (state: State): string | undefined => state[NameSpaces.User].lastName;
export const getUserAvatar = (state: State): string | undefined => state[NameSpaces.User].avatarUrl;
export const getUserEmail = (state: State): string | undefined => state[NameSpaces.User].email;
export const getAuthStatus = (state: State): AuthStatus => state[NameSpaces.User].authStatus;
