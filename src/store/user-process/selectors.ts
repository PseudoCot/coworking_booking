import { NameSpace } from '../../consts';
import { AuthStatus } from '../../types/auth-status';
import { State } from '../../types/state';

export const getUserName = (state: State): string | undefined => state[NameSpace.User].name;
export const getUserAvatar = (state: State): string | undefined => state[NameSpace.User].avatarUrl;
export const getUserEmail = (state: State): string | undefined => state[NameSpace.User].email;
export const getAuthStatus = (state: State): AuthStatus => state[NameSpace.User].authStatus;
