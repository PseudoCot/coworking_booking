import { NameSpaces } from '../../consts';
import { AuthStatus } from '../../types/auth-status';
import { State } from '../../types/state';

export const getUserLastName = (state: State): string | undefined => state[NameSpaces.User].lastName;
export const getUserFirstName = (state: State): string | undefined => state[NameSpaces.User].firstName;
export const getUserPatronymic = (state: State): string | undefined => state[NameSpaces.User].patronymic;
export const getUserEmail = (state: State): string | undefined => state[NameSpaces.User].email;
export const getUserTelegram = (state: State): string | undefined => state[NameSpaces.User].telegram;
export const isUserStudent = (state: State): boolean | undefined => state[NameSpaces.User].isStudent;
export const getUserAvatar = (state: State): string | undefined => state[NameSpaces.User].avatarUrl;

export const getUserData = (state: State): UserData => state[NameSpaces.User];

export const getAuthStatus = (state: State): AuthStatus => state[NameSpaces.User].authStatus;
