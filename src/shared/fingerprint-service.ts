import FingerprintJS, { Agent } from '@fingerprintjs/fingerprintjs';


export default class FingerprintService {
  private readonly fpServiceLoading: Promise<Agent>;

  constructor() {
    this.fpServiceLoading = FingerprintJS.load();
  }

  public async createFingerprintId(): Promise<string> {
    const fpService = await this.fpServiceLoading;
    const fingerprint = await fpService.get();
    // eslint-disable-next-line no-console
    console.log(fingerprint);
    return fingerprint.visitorId;
  }
}

