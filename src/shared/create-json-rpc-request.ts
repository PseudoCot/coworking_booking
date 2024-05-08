import { JsonRpcRequest } from '../types/json-rpc/json-rpc-request';
import { v4 as uuidv4 } from 'uuid';
import { JsonRpcRequestMethod } from '../types/json-rpc/json-rpc-request-method';
import { JsonRpcParams } from '../types/json-rpc/json-rpc-params';

const JSON_RPC_VERSION = '2.0';

export function createJsonRpcRequest<P extends JsonRpcParams>(method: JsonRpcRequestMethod, params?: P): JsonRpcRequest<P> {
  const uuid = uuidv4();

  return {
    jsonrpc: JSON_RPC_VERSION,
    id: uuid,
    method: method,
    params: params,
  };
}
