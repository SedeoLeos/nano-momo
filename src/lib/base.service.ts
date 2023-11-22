/**
 * Multiplies a value by 2. (Also a full example of TypeDoc's functionality.)
 *
 * ### Example (es module)
 * ```js
 * import { double } from 'typescript-starter'
 * console.log(double(4))
 * // => 8
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var double = require('typescript-starter').double;
 * console.log(double(4))
 * // => 8
 * ```
 *
 * @param value - Comment describing the `value` parameter.
 * @returns Comment describing the return type.
 * @anotherNote Some other value.
 */
import querystring from 'querystring';

import axios, { AxiosInstance, isAxiosError } from 'axios';

import {
  BcAuthorizeInput,
  BodyBcAuthorize,
  BodyOauth2Token,
  BodyRequestToDepotInput,
  CreateAccessInput,
  RequestGetAccountBalanceInput,
  RequestGetUserInfoInput,
  RequestToDepotInput,
  ValidateAccountHolderStatusInput,
} from '../types/inputs.type';

import {
  ErrorResult,
  PayloadAccessToken,
  PayloadAuthorizeResponse,
  PayloadBalance,
  PayloadOauth2,
  PayloadRequestToPayResult,
  PayloadUserInfo,
  PayloadUserinfoWithConsent,
  SuccessResult,
  isErrorResult,
} from '../types/outputs.type';

export type BaseServiceOptions = {
  readonly subscriptionId: string;
  readonly env: string;
  readonly callback?: string;
  readonly baseUrl: string;
};
export class BaseService {
  protected readonly headers: any = {};
  protected readonly baseUrl: string;
  protected readonly callback?: string;
  protected readonly axiosInstance: AxiosInstance;

  constructor(options: BaseServiceOptions) {
    this.headers['Ocp-Apim-Subscription-Key'] = options.subscriptionId;
    this.headers['X-Target-Environment'] = options.env;
    this.baseUrl = options.baseUrl;
    this.callback = options.callback;
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: this.headers,
    });
    
  }
  setToken(token: string, type: 'Basic' | 'Bearer' = 'Bearer'): string {
    const _token = token.replace(/\s/g, '');
    return `${type} ${_token}`;
  }
  async createAccessToken(data: CreateAccessInput) {
    const { user_api, api_key } = data;
    try {
      const token = Buffer.from(user_api + ':' + api_key).toString('base64');
      const authorization = this.setToken(token, 'Basic');
      const headers = this.headers;
      headers['Authorization'] = authorization;
      const response = await this.axiosInstance.post<PayloadAccessToken>(
        `/token/`,
        {},
        { headers }
      );
      if (response.status == 200) {
        return new SuccessResult({
          status: response.status,
          data: response.data,
        });
      }
    } catch (e) {
      if (isAxiosError(e)) {
        return new ErrorResult({
          status: e.status,
          message: e.message,
          data: e.response.data,
        });
      }
    }
    return new ErrorResult({
      status: 400,
      message: '',
      data: null,
    });
  }
  async bcAuthorize(data: BcAuthorizeInput, body: BodyBcAuthorize) {
    const url = this.baseUrl + '/v1_0/bc-authorize';
    const { api_key, user_api, callback } = data;
    const authPayload = await this.createAccessToken({
      api_key,
      user_api,
    });

    if (isErrorResult(authPayload)) return authPayload;

    const headers = this.headers;

    headers['X-Callback-Url'] = callback ? callback : this.callback;
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    headers['Authorization'] = this.setToken(authPayload.data.access_token);
    try {
      const response = await this.axiosInstance.post<PayloadAuthorizeResponse>(
        url,
        querystring.stringify(body.toObject()),
        { headers }
      );
      if (response.status == 200) {
        return new SuccessResult({
          status: response.status,
          data: response.data,
        });
      }
    } catch (error) {
      if (!isAxiosError(error))
        return new ErrorResult({
          status: error.status,
          data: error.response?.data,
          message: error.message,
        });
    }
    return new ErrorResult({
      status: 400,
      data: null,
      message: '',
    });
  }
  async createOauth2Token(data: BcAuthorizeInput, body: BodyOauth2Token) {
    const url = 'oauth2/token';
    const { api_key, user_api } = data;

    const headers = this.headers;
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    headers['Authorization'] = this.setToken(Buffer.from(user_api + ':' + api_key).toString('base64'),'Basic');
    try {
      const response = await this.axiosInstance.post<PayloadOauth2>(
        url,
        querystring.stringify(body.toObject()),
        { headers }
      );
      if (response.status == 200)
        return new SuccessResult({
          status: response.status,
          data: response.data,
        });
    } catch (error) {
      console.log(error)
      if (isAxiosError(error))
        return new ErrorResult({
          status: error.status,
          data: error.response.data,
          message: error.message,
        });
      // continue regardless of error
    }
    return new ErrorResult({
      status: 400,
      data: null,
      message: '',
    });
  }

  async getBasicUserInfo(data: RequestGetUserInfoInput) {
    const { user_api, api_key, accountHolderMSISDN } = data;
    const url = `v1_0/accountholder/msisdn/${accountHolderMSISDN}/basicuserinfo`;
    const authPayload = await this.createAccessToken({
      api_key,
      user_api,
    });

    if (isErrorResult(authPayload)) return authPayload;

    const headers = this.headers;
    headers['Authorization'] = this.setToken(authPayload.data.access_token);
    try {
      const response = await this.axiosInstance.get<PayloadUserInfo>(url, {
        headers,
      });
      if (response.status == 200)
        return new SuccessResult({
          status: response.status,
          data: response.data,
        });
    } catch (error) {
      if (isAxiosError(error))
        return new ErrorResult({
          status: error.status,
          data: error.request?.data,
          message: error.message,
        });
    }
    return new ErrorResult({
      status: 400,
      data: null,
      message: '',
    });
  }
  async validateAccountHolderStatus(data: ValidateAccountHolderStatusInput) {
    const { accountHolderId, accountHolderIdType, user_api, api_key } = data;
    const authPayload = await this.createAccessToken({
      user_api,
      api_key,
    });

    if (isErrorResult(authPayload)) return authPayload;

    const url = `v1_0/accountholder`;
    const headers = this.headers;
    headers['Authorization'] = this.setToken(authPayload.data.access_token);
    try {
      const response = await this.axiosInstance.get(`${url}/${accountHolderIdType}/${accountHolderId}/active`, {
        headers,
      });
      if (response.status == 200) {
        return new SuccessResult({
          status: 200,
          data: response.data
        })
      }

    } catch (e) {
      if (isAxiosError(e)) {
        return new ErrorResult({
          status: e.status,
          message: e.message,
          data: e.response.data
        })
      }
    }
    return new ErrorResult({
      status: 400,
      message: '',
      data: false
    })
  }

  async getUserInfoWithConsent(data: { readonly Authorization: string }) {
    const { Authorization } = data;
    const url = 'oauth2/v1_0/userinfo';
    const headers = this.headers;
    headers['Authorization'] = this.setToken(Authorization);
    try {
      const response = await this.axiosInstance.get<PayloadUserinfoWithConsent>(
        url,
        {
          headers,
        }
      );
      if (response.status == 200) {
        return new SuccessResult({
          data:response.data,
          status:response.status
        });
      }
    } catch (error) {
      if(isAxiosError(error))
     return new ErrorResult({
      status:error.status,
      message:error.message,
      data:error.response.data,

     })
    }
    return new ErrorResult({
      status:400,
      message:'',
      data:null,
     })
  }
  async getAccountBalance(data: RequestGetAccountBalanceInput) {
    const { api_key, user_api, currency } = data;
    const url = currency
      ? `/v1_0/account/balance/${currency}`
      : `/v1_0/account/balance`;
    const auth = await this.createAccessToken({
      api_key,
      user_api,
    });
    if (isErrorResult(auth)) return auth;
    const headers = this.headers;
    headers['Authorization'] = this.setToken(auth.data.access_token);
    try {
      const response = await this.axiosInstance.get<PayloadBalance>(url, {
        headers,
      });
      if (response.status == 200) {
        return new SuccessResult({
          data: response.data,
          status: response.status,
        });
      }
    } catch (e) {
      if (isAxiosError(e))
        return new ErrorResult({
          data: e.request?.data,
          message: e.message,
          status: e.status,
        });
    }
    return new ErrorResult({
      data: null,
      message: '',
      status: 400,
    });
  }
}

