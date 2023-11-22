import { BodyRequestToDepotInput, RequestToDepotInput } from "../types/inputs.type";
import { PayloadRequestToPayResult, isErrorResult } from "../types/outputs.type";
import { BaseService } from "./base.service";

export class BaseService2 extends BaseService {
  async transfer(data: RequestToDepotInput, body: BodyRequestToDepotInput) {
    const { referenceId, user_api, api_key, callback } = data;
    const url = 'v1_0/transfer';
    const headers = this.headers;
    headers['X-Reference-Id'] = referenceId;
    headers['X-Callback-Url'] = callback ? callback : this.callback;
    const authPayload = await this.createAccessToken({
      api_key: api_key,
      user_api: user_api,
    });
    if (isErrorResult(authPayload)) return null;
    headers['Authorization'] = this.setToken(authPayload?.data.access_token);
    try {
      const response = await this.axiosInstance.post(url, body, { headers });
      if (response.status == 202) return true;
    } catch (error) {
      // continue regardless of error
    }
    return false;
  }

  async getTransferStatus(data: RequestToDepotInput) {
    const { referenceId, user_api, api_key, callback } = data;
    const url = `v1_0/transfer/${referenceId}`;
    const headers = this.headers;
    headers['X-Callback-Url'] = callback ? callback : this.callback;
    const authPayload = await this.createAccessToken({
      api_key: api_key,
      user_api: user_api,
    });
    if (isErrorResult(authPayload)) return authPayload;
    headers['Authorization'] = this.setToken(
      authPayload?.data.data.access_token
    );
    try {
      const response = await this.axiosInstance.get<PayloadRequestToPayResult>(
        url,
        { headers }
      );
      if (response.status == 200) return response.data;
    } catch (error) {
      // continue regardless of error
    }
    return null;
  }
}
