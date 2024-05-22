import FingerprintJS, { Agent } from '@fingerprintjs/fingerprintjs';


export default class FingerprintService {
  private readonly fpServiceLoading: Promise<Agent>;
  private readonly fpIdLoading: Promise<string>;

  constructor() {
    this.fpServiceLoading = FingerprintJS.load();
    this.fpIdLoading = this.createFingerprintId();
  }

  private async createFingerprintId(): Promise<string> {
    const fpService = await this.fpServiceLoading;
    const fingerprint = await fpService.get();
    return fingerprint.visitorId;
  }

  public async getFingerprintId(): Promise<string> {
    return this.fpIdLoading;
  }
}

