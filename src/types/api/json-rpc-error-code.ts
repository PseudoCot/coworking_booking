import { JsonRpcErrorCodes } from '../../consts';
import { ValueOf } from '../value-of';

export type JsonRpcErrorCode = ValueOf<typeof JsonRpcErrorCodes>;
