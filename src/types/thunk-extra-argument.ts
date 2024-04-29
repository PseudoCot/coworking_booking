import { AxiosInstance } from 'axios';
import FingerprintService from '../shared/fingerprint-service';

export type ThunkExtraArgument = {
  fpService: FingerprintService;
  api: AxiosInstance;
}
