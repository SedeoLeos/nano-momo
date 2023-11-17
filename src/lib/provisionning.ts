/* eslint-disable no-empty */

import axios, { AxiosInstance } from 'axios';

import { v4 as uuidv4 } from 'uuid';

export class ProvioningController {
  static createUserId() {
    throw new Error('Method not implemented.');
  }
  protected readonly headers: any = {};
  protected readonly axiosInstance: AxiosInstance;
  protected readonly referenceId: string;

  constructor(
    pimarykey: string,
    private readonly providerCallbackHost: string
  ) {
    this.headers['Ocp-Apim-Subscription-Key'] = pimarykey;
    this.headers['X-Target-Environment'] = 'sandbox';
    this.axiosInstance = axios.create({
      baseURL: 'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/',
      headers: this.headers
    });
    this.referenceId = '3fa300fe-c071-414a-ab68-5bf760d1f9e7';
  }
  generateRefence() {
    return uuidv4();
  }

  async createUserId() {
    const headers = {
      ...this.headers,
      'X-Reference-Id': this.referenceId
    };
    const body = {
      providerCallbackHost: this.providerCallbackHost
    };

    try {
      const reponse = await this.axiosInstance.post('', body, {
        headers
      });
      if (reponse.status == 201) {
        return {
          userApi: this.referenceId
        };
      }
      return null;
    } catch (e) {}
    return null;
  }
  async createApikey() {
    const url = `${this.referenceId}/apikey`;
    const option = {
      headers: {
        ...this.headers
      }
    };
    try {
      const response = await this.axiosInstance.post<{
        readonly apiKey: string;
      }>(url, {}, option);
      if (response.status == 201) {
        return {
          apikey: response.data.apiKey
        };
      }
    } catch (e) {}
    return null;
  }
}
