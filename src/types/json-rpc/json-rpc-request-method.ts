import { ApiMethods } from '../../consts';
import { ValueOf } from '../value-of';

export type JsonRpcRequestMethod = ValueOf<typeof ApiMethods>;
