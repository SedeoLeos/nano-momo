import { Environment } from "../core/environement";
import { MMApiHttpClient } from "../core/momo-client";
import { BcAuthorize } from "./BcAuthorize";
import { CashTransfer, CashTransferBody } from "./CashTransfer";
import { CreateAccessToken } from "./CreateAccessToken";
import { CreateOauth2Token } from "./CreateOauth2Token";
import { GetAccountBalance } from "./GetAccountBalance";
import { GetBasicUserinfo } from "./GetBasicUserinfo";
import { GetCashTransferStatus } from "./GetCashTransferStatus";
import { GetTransferStatus } from "./GetTransferStatus";
import { GetUserInfoWithConsent } from "./GetUserInfoWithConsent";

import { Transfer } from "./Transfer";
import { ValidateAccountHolderStatus } from "./ValidateAccountHolderStatus";

export class Remittance {
  private _client: MMApiHttpClient;
  /**
   *
   * @param {Environment} environment - The environment data specific to remittance
   *
   */
  constructor(environment: Environment) {
    this._client = new MMApiHttpClient(environment);
  }

  /**
   *
   * @returns {Promise<CreateAccessToken>}
   */
  async createAccessToken(): Promise<CreateAccessToken> {
    let _request = new CreateAccessToken(this._client.environment);
    return await this._client.execute(_request);
  }

  /**
   *
   * @param {string} msisdn - The MSISDN of the user
   * @returns {Promise<GetBasicUserinfo>}
   */
  async getBasicUserinfo(msisdn: string): Promise<GetBasicUserinfo> {
    let _request = new GetBasicUserinfo(msisdn);
    return await this._client.execute(_request);
  }

  /**
   *
   * @returns {Promise<GetAccountBalance>}
   */
  async getAccountBalance(): Promise<GetAccountBalance> {
    let _request = new GetAccountBalance();
    return await this._client.execute(_request);
  }

  /**
   *
   * @param {uuid} referenceId - UUID of transaction - Reference id used when creating the request to pay.
   * @returns {Promise<GetTransferStatus>}
   */
  async getTransferStatus(referenceId: string): Promise<GetTransferStatus> {
    let _request = new GetTransferStatus(referenceId);
    return await this._client.execute(_request);
  }

  /**
   * This operation returns personal information and claims a consent by the account holder for the requested scopes
   * @param {string} msisdn - The MSISDN of the user
   * @param {string} scope - The scope of access | Optional, default: profile
   * @param {string} access_type - Access type | offline/online | Optional, default: offline
   * @param {string} callbackURL - Call back URL | Optional
   * @returns {Promise<GetUserInfoWithConsent>}
   */
  async getUserInfoWithConsent(msisdn: string, scope: string, access_type: 'offline' |'online', callbackURL: string): Promise<GetUserInfoWithConsent> {
    let _requestA = new BcAuthorize(msisdn, scope, access_type, callbackURL);
    let _responseA = await this._client.execute(_requestA);
    let _requestB = new CreateOauth2Token(
      this._client.environment,
      _responseA.data.auth_req_id
    );
    let _responseB = await this._client.execute(_requestB);
    let _request = new GetUserInfoWithConsent(
      this._client.environment,
      `${_responseB.data.token_type} ${_responseB.data.access_token}`
    );
    let _response = await this._client.execute(_request);
    return _response;
  }

  /**
   * @param {string} referenceId
   * @return {Promise<GetCashTransferStatus>}
   **/
  async getCashTransferStatus(referenceId:string): Promise<GetCashTransferStatus>{
    const _request = new GetCashTransferStatus(referenceId);
    const _response = this._client.execute(_request);
    return _response;
  }
  /**
   * @param {string} referenceId
   * @param {CashTransferBody} option
   * @return {Promise<CashTransfer>}
   **/
  async cashTransfer(referenceId:string,option:CashTransferBody): Promise<CashTransfer>{
    const _request = new CashTransfer(referenceId,option);
    const _response = this._client.execute(_request);
    return _response;
  }

  /**
   * @param {uuid} referenceId - UUID of transaction - Reference id used when creating the request to pay.
   * @param {object} body - Request body
   *
   * @returns {Promise<Transfer>}
   */
  async transfer(referenceId: string, body: object, callback:string): Promise<Transfer> {
    let _request = new Transfer(referenceId);

    if (callback) {
      _request.callback(callback);
    }

    _request.body(body);
    let _response = await this._client.execute(_request);
    _response.data = {
      status: true,
      referenceId: referenceId,
    };
    return _response;
  }

  /**
   * @param {uuid} referenceId - UUID of transaction - Reference id used when creating the request to pay.
   * @param {object} body - An ISO 639-1 or ISO 639-3 language code
   *
   * @returns {Promise<ValidateAccountHolderStatus>}
   */
  async validateAccountHolderStatus(accountHolderId:string, accountHolderIdType:string): Promise<ValidateAccountHolderStatus> {
    let _request = new ValidateAccountHolderStatus(
      accountHolderId,
      accountHolderIdType
    );
    let _response = await this._client.execute(_request);
    _response.data = {
      status: true,
    };
    return _response;
  }
}


