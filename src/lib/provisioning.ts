

import axios, {  AxiosInstance, isAxiosError } from 'axios';

import { v4 as uuid4 } from 'uuid';
import {ErrorResult, SuccessResult} from '../types/outputs.type'

export class Provisioning {

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
    this.referenceId = this.generateReference();
  }
  generateReference() {
    return uuid4();
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
      const response = await this.axiosInstance.post('', body, {
        headers
      });
      if (response.status == 201) {
        return new SuccessResult({
          status: response.status,
          data: {
            userApi: this.referenceId
          }
        });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return new ErrorResult({status:error.status,message:error.message,data:error.response?.data})
    }
  }
    return new ErrorResult({
      status: 400,
      data:null,
      message:''
  })

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
        return new SuccessResult({
          status: response.status,
          data: {
            apikey: response.data.apiKey
          }
        });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return new ErrorResult( {
          message: error.message,
          status: error.status,
          data: error.response?.data
        });
      }
    }
    return new ErrorResult({
      message: '',
      status: 400,
      data: null
    });
  }
}
