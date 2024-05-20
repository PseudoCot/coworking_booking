import { NameSpaces } from '../../consts';
import { AuthStatus } from '../../types/auth-status';
import { State } from '../../types/state';
import { UserData } from '../../types/user/user-data';

export const getUserLastName = (state: State): string | undefined => state[NameSpaces.User].lastName;
export const getUserFirstName = (state: State): string | undefined => state[NameSpaces.User].firstName;
export const getUserPatronymic = (state: State): string | undefined => state[NameSpaces.User].patronymic;
export const getUserEmail = (state: State): string | undefined => state[NameSpaces.User].email;
export const isUserStudent = (state: State): boolean | undefined => state[NameSpaces.User].isStudent;
export const isUserTelegramConnected = (state: State): boolean | undefined => state[NameSpaces.User].telegramConnected;
export const getUserAvatarFileName = (state: State): string | undefined => state[NameSpaces.User].avatarFileName;

export const getUserData = (state: State): Partial<UserData> => state[NameSpaces.User];

export const getAuthStatus = (state: State): AuthStatus => state[NameSpaces.User].authStatus;
