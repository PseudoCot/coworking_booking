import { NameSpaces } from '../../consts';
import { FetchingStatus } from '../../types/fetching-status';
import { State } from '../../types/state';
import { AdminFetchingField } from './admin-process';

export const createAdminFetchingStatusGetter = (type: AdminFetchingField) => (state: State): FetchingStatus => state[NameSpaces.Admin][type];
