import { JsonRpcRequestMethod } from './json-rpc-request-method';

export type JsonRpcRequest<RequestData> = {
  jsonrpc: string;
  id: string | number;
  method: JsonRpcRequestMethod;
  params?: {
    data?: RequestData;
    fingerprint?: string;
  };
};
