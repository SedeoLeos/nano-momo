/* eslint-disable no-empty */
import { RequestToDepotInput } from '../types/inputs.type';
import { PlayloadCashTransfer } from '../types/outputs.type';

import { BaseService2 } from './base.service';

export class Remittance extends BaseService2 {
  async cashTransfer(data: RequestToDepotInput, body: PlayloadCashTransfer) {
    const { referenceId, user_api, api_key, callback } = data;
    const url = `v2_0/cashtransfer`;
    const authPlayload = await this.createAccessToken({
      api_key: api_key,
      user_api: user_api
    });
    if (!authPlayload) return null;
    const headers = {
      ...this.headers,
      'X-Callback-Url': callback ? callback : this.callback,
      'X-Reference-Id': referenceId,
      Authorization: this.setToken(authPlayload?.access_token)
    };
    try {
      const response = await this.axiosInstance.post(url, body, { headers });
      if (response.status == 202) return true;
    } catch (error) {}
    return false;
  }

  async getCashTransferStatus(data: RequestToDepotInput) {
    const { referenceId, user_api, api_key, callback } = data;
    const url = `v2_0/cashtransfer/${referenceId}`;
    const authPlayload = await this.createAccessToken({
      api_key: api_key,
      user_api: user_api
    });
    if (!authPlayload) return null;

    const headers = {
      ...this.headers,
      Authorization: this.setToken(authPlayload?.access_token),
      'X-Callback-Url': callback ? callback : this.callback
    };
    try {
      const response = await this.axiosInstance.get<PlayloadCashTransfer>(url, {
        headers
      });
      if (response.status == 200) return response.data;
    } catch (error) {}
    return null;
  }
}
