
import axios, {  AxiosInstance, isAxiosError } from 'axios';

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
      baseURL: 'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser',
      headers: this.headers
    });
    this.referenceId = this.generateRefence();
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
          message: '',
          success: true,
          error: false,
          status: reponse.status,
          data: {
            userApi: this.referenceId
          }
        };
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(this.referenceId);
        return {
          message: error.message,
          success: false,
          error: true,
          status: error.status,
          data: null
        };
      }
    }
    return {
      message: '',
      success: false,
      error: true,
      status: 400,
      data: null
    };
  }
  async createApikey() {
    const url = `/${this.referenceId}/apikey`;
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
          satus: response.status,
          message: '',
          success: true,
          error: false,
          data: {
            apikey: response.data.apiKey
          }
        };
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          message: error.message,
          success: false,
          error: true,
          status: error.status,
          data: null
        };
      }
    }
    return {
      message: '',
      success: false,
      error: true,
      status: 400,
      data: null
    };
  }
}
