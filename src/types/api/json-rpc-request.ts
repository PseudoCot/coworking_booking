import { JsonRpcRequestMethod } from './json-rpc-request-method';

export type JsonRpcRequest<RequestParams> = {
  jsonrpc: string;
  id: string | number;
  method: JsonRpcRequestMethod;
  params?: RequestParams;
};
