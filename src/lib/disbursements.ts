/* eslint-disable no-empty */
import {
  BodyRequestToDepotInput,
  BodyRequestToRefund,
  RequestToDepotInput
} from '../types/inputs.type';
import { PlayloadRequestToPayResult } from '../types/outputs.type';

import { BaseService2 } from './base.service';

export class Distribution extends BaseService2 {
  /*
    L'opération de dépôt est utilisée pour déposer un montant du compte 
    du propriétaire vers un compte du bénéficiaire.
    Le statut de la transaction peut être validé en utilisant 
    le GET /deposit/{referenceId}
    */
  async createDepot(data: RequestToDepotInput, body: BodyRequestToDepotInput) {
    const { referenceId, user_api, api_key, callback, version } = data;
    const url = `${version ? version : 'v1_0'}/deposit`;
    const authPlayload = await this.createAccessToken({
        api_key: api_key,
        user_api: user_api
    });
    if (!authPlayload) return null;
    const headers = {...this.headers,
    'X-Reference-Id': referenceId,
    'X-Callback-Url': callback ? callback : this.callback,
    'Authorization' :this.setToken(authPlayload?.access_token)
}
    try {
      const response = await this.axiosInstance.post(url, body, { headers });
      if (response.status == 202) return true;
    } catch (error) {}
    return false;
  }

  async getDepositStatus(data: RequestToDepotInput) {
    const { referenceId, user_api, api_key, callback } = data;
    const url = `v1_0/deposit/${referenceId}`;
    const authPlayload = await this.createAccessToken({
        api_key: api_key,
        user_api: user_api
    });
    if (!authPlayload) return null;
    const headers = {...this.headers,
    'X-Callback-Url': callback ? callback : this.callback,
    'Authorization': this.setToken(authPlayload?.access_token)};
    try {
      const response = await this.axiosInstance.get<PlayloadRequestToPayResult>(
        url,
        { headers }
      );
      if (response.status == 200) return response.data;
    } catch (error) {}
    return null;
  }

  async getRefundStatus(data: RequestToDepotInput) {
    const { referenceId, user_api, api_key, callback } = data;
    const url = `v1_0/refund/${referenceId}`;
    const authPlayload = await this.createAccessToken({
        api_key: api_key,
        user_api: user_api
    });
    if (!authPlayload) return null;
    const headers = {
        ... this.headers,
    'X-Callback-Url': callback ? callback : this.callback,
    'Authorization': this.setToken(authPlayload?.access_token)
}
    try {
      const response = await this.axiosInstance.get<PlayloadRequestToPayResult>(
        url,
        { headers }
      );
      if (response.status == 200) return response.data;
    } catch (error) {}
    return null;
  }

  async refund(data: RequestToDepotInput, body: BodyRequestToRefund) {
    const { referenceId, user_api, api_key, callback, version } = data;
    const url = `${version ? version : 'v1_0'}/refund`;
    const authPlayload = await this.createAccessToken({
        api_key: api_key,
        user_api: user_api
    });
    if (!authPlayload) return null;
    const headers = {
        ...this.headers,
    'X-Reference-Id' : referenceId,
    'X-Callback-Url' : callback ? callback : this.callback,
    'Authorization' : this.setToken(authPlayload?.access_token)};
    try {
      const response = await this.axiosInstance.post(url, body, { headers });
      if (response.status == 202) return true;
    } catch (error) {}
    return false;
  }
}
