

import axios from 'axios';

import {
  BodyInvoiceInput,
  BodyPreApproval,
  BodyRequesttoPayDeliveryNotificationInput,
  BodyRequestTopayInput,
  RequesttoPayDeliveryNotificationInput,
  RequestToPayInput
} from '../types/inputs.type';
import {
  PaymentResult,
  PayloadRequestToPayResult,
  PayloadUserinfoWithConsent,
  PreApprovalResult
} from '../types/outputs.type';

import { BaseService } from './base.service';

export class Colloction extends BaseService {
  /*

  */
  async requestToPay(data: RequestToPayInput, body: BodyRequestTopayInput) {
    const url = '/v1_0/requesttopay';
    const { api_key, user_api, referenceId } = data;
    const auth = await this.createAccessToken({
      api_key,
      user_api
    });
    if (!auth) return null;
    const headers = {
      ...this.headers,
      'X-Reference-Id': referenceId,
      'X-Callback-Url': this.callback,
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer' + auth.access_token
    };
    try {
      const response = await axios.post(url, body, { headers });
      if (response.status == 202) {
        return true;
      }
    } catch (e) {
      // continue regardless of error
    }
    return null;
  }

  async requesttoPayDeliveryNotification(
    data: RequesttoPayDeliveryNotificationInput,
    body: BodyRequesttoPayDeliveryNotificationInput
  ) {
    const { api_key, user_api, referenceId, language, notificationMessage } =
      data;
    const url = `/v1_0/requesttopay/${referenceId}/deliverynotification`;
    const auth = await this.createAccessToken({
      api_key,
      user_api
    });
    if (!auth) return null;
    const headers = {
      ...this.headers,
      'X-Reference-Id': referenceId,
      Authorization: 'Bearer' + auth.access_token,
      notificationMessage: notificationMessage,
      Language: language
    };
    try {
      const response = await axios.post(url, body, { headers });
      if (response.status == 202) {
        return true;
      }
    } catch (e) {
      // continue regardless of error
    }
    return null;
  }

  async createInvoiceStatus(data: RequestToPayInput, body: BodyInvoiceInput) {
    const url = 'v2_0/invoice';
    const { referenceId, user_api, api_key } = data;
    const token = await this.createAccessToken({
      user_api,
      api_key
    });
    if (!token) return null;
    const headers = {
      ...this.headers,
      'X-Reference-Id': referenceId,
      Authorization: 'Bearer ' + token.access_token
    };
    try {
      const response = await axios.post(url, body, { headers });
      if (response.status == 202) {
        return true;
      }
    } catch (error) {
      // continue regardless of error
    }
    return false;
  }

  async getInvoiceStatus(data: RequestToPayInput) {
    const { referenceId, user_api, api_key } = data;
    const url = `v2_0/invoice/${referenceId}`;
    const token = await this.createAccessToken({
      user_api,
      api_key
    });
    if (!token) return null;
    const headers = {
      ...this.headers,
      Authorization: 'Bearer ' + token.access_token
    };
    try {
      const response = await axios.get(url, { headers });
      if (response.status == 200) {
        return response.data;
      }
    } catch (error) {
      // continue regardless of error
    }
    return null;
  }

  async cancelInvoice(
    data: RequestToPayInput,
    // body: { readonly externalId: string }
  ) {
    const { referenceId, user_api, api_key } = data;
    const url = `v2_0/invoice/${referenceId}`;
    const authPlayload = await this.createAccessToken({
      user_api,
      api_key
    });
    if (!authPlayload) return null;
    const headers = {
      ...this.headers,
      Authorization: this.setToken(authPlayload.access_token)
    };
    try {
      const response = await axios.delete(url, { headers });
      if (response.status == 200) {
        return response.data;
      }
    } catch (error) {
      // continue regardless of error
    }
    return null;
  }

  async preApproval(data: RequestToPayInput, body: BodyPreApproval) {
    const { api_key, user_api, referenceId } = data;
    const url = `v2_0/preapproval`;
    const authPlayload = await this.createAccessToken({
      user_api,
      api_key
    });
    if (!authPlayload) return null;
    const headers = {
      ...this.headers,
      Authorization: this.setToken(authPlayload.access_token),
      'X-Reference-Id': referenceId,
      'X-Callback-Url': this.callback
    };
    try {
      const response = await axios.post(url, body, { headers });
      if (response.status == 202) return true;
    } catch (error) {
      // continue regardless of error
    }
    return false;
  }

  async getPaymentStatus(data: RequestToPayInput) {
    const { api_key, user_api, referenceId } = data;
    const url = `v2_0/payment/${referenceId}`;
    const authPlayload = await this.createAccessToken({
      user_api,
      api_key
    });
    if (!authPlayload) return null;
    const headers = {
      ...this.headers,
      Authorization: this.setToken(authPlayload.access_token),
      'X-Callback-Url': this.callback
    };

    try {
      const response = await axios.get<PaymentResult>(url, { headers });
      if (response.status == 200) return response.data;
    } catch (error) {
      // continue regardless of error
    }
    return null;
  }

  async getPreApprovalStatus(data: RequestToPayInput) {
    const { api_key, user_api, referenceId } = data;
    const url = `v2_0/preapproval/${referenceId}`;
    const authPlayload = await this.createAccessToken({
      user_api,
      api_key
    });
    if (!authPlayload) return null;
    const headers = {
      ...this.headers,
      Authorization: this.setToken(authPlayload.access_token),
      'X-Callback-Url': this.callback
    };
    try {
      const response = await axios.get<PreApprovalResult>(url, { headers });
      if (response.status == 200) return response.data;
    } catch (error) {
      // continue regardless of error
    }
    return null;
  }

  async getUserInfoWithConsent(data: { readonly Authorization: string }) {
    const { Authorization } = data;
    const url = 'oauth2/v1_0/userinfo';
    const headers = {
      ...this.headers,
      Authorization: this.setToken(Authorization)
    };
    try {
      const response = await axios.get<PayloadUserinfoWithConsent>(url, {
        headers
      });
      if (response.status == 200) {
        return response.data;
      }
    } catch (error) {
      // continue regardless of error
    }
    return null;
    // PlayloadUserinfoWithConsent
  }

  async requestToWithdraw(
    data: RequestToPayInput,
    body: BodyRequestTopayInput
  ) {
    const { referenceId, user_api, api_key, version } = data;
    const version_r = version ? version : 'v1_0';
    const authPlayload = await this.createAccessToken({
      user_api,
      api_key
    });
    if (!authPlayload) return null;
    const url = `${version_r}/requesttowithdraw`;
    const headers = {
      ...this.headers,
      Authorization: this.setToken(authPlayload.access_token)
    };
    try {
      const response = await axios.post<PayloadRequestToPayResult>(
        `${url}/${referenceId}`,
        body,
        {
          headers
        }
      );
      if (response.status == 202) {
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  async requesttoPayTransactionStatus(data: RequestToPayInput) {
    const { referenceId, user_api, api_key } = data;
    const authPlayload = await this.createAccessToken({
      user_api,
      api_key
    });
    if (!authPlayload) return null;
    const url = `requesttopay`;
    const headers = {
      ...this.headers,
      Authorization: this.setToken(authPlayload.access_token)
    };
    try {
      const response = await axios.get<PayloadRequestToPayResult>(
        `${url}/${referenceId}`,
        {
          headers
        }
      );
      if (response.status == 200) {
        return response.data;
      }
    } catch (e) {
      return false;
    }
    return null;
  }

  async requestToWithdrawTransactionStatus(data: RequestToPayInput) {
    const { referenceId, user_api, api_key } = data;
    const authPlayload = await this.createAccessToken({
      user_api,
      api_key
    });
    if (!authPlayload) return null;
    const url = `requesttowithdraw`;
    const headers = {
      ...this.headers,
      Authorization: this.setToken(authPlayload.access_token)
    };
    try {
      const response = await axios.get<PayloadRequestToPayResult>(
        `${url}/${referenceId}`,
        {
          headers
        }
      );
      if (response.status == 200) {
        return response.data;
      }
    } catch (e) {
      return false;
    }
    return null;
  }
}
