export type JsonRpcResponce<ResponseData> = {
  jsonrpc: string;
  id: string | number;
  result: ResponseData;
};
