import { AxiosInstance } from 'axios';
import FingerprintService from '../services/fingerprint-service';

export type ThunkExtraArgument = {
  fpService: FingerprintService;
  api: AxiosInstance;
}
