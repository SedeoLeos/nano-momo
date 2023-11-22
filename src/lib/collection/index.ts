import { Environment } from "../core/environement";
import { MMApiHttpClient } from "../core/momo-client";
import { BcAuthorize } from "./BcAuthorize";
import { CreateAccessToken } from "./CreateAccessToken";
import { CreateOauth2Token } from "./CreateOauth2Token";
import { GetAccountBalance } from "./GetAccountBalance";
import { GetAccountBalanceInSpecificCurrency } from "./GetAccountBalanceInSpecificCurrency";
import { GetBasicUserinfo } from "./GetBasicUserinfo";
import { GetUserInfoWithConsent } from "./GetUserInfoWithConsent";
import { RequestToPay } from "./RequestToPay";
import { RequestToPayDeliveryNotification } from "./RequestToPayDeliveryNotification";
import { RequestToPayTransactionStatus } from "./RequestToPayTransactionStatus";
import { RequestToWithdrawTransactionStatus } from "./RequestToWithdrawTransactionStatus";
import { RequestToWithdrawV1 } from "./RequestToWithdrawV1";
import { RequestToWithdrawV2 } from "./RequestToWithdrawV2";
import { ValidateAccountHolderStatus } from "./ValidateAccountHolderStatus";

export class Collection {
  private _client:MMApiHttpClient;
  /**
   *
   * @param {Environment} environment - The environment data specific to collection
   */
  constructor(environment: Environment) {
    this._client = new MMApiHttpClient(environment);
  }

  setAPIKey(value:string) {
    this._client.setAPIKey = value
  }

  /**
   *
   * @returns {Promise<CreateAccessToken>}
   */
  async createAccessToken(): Promise<CreateAccessToken> {
    const _request = new CreateAccessToken(this._client.environment);
    return await this._client.execute(_request);
  }

  /**
   *
   * @param {string} msisdn - The MSISDN of the user
   * @returns {Promise<GetBasicUserinfo>}
   */
  async getBasicUserinfo(msisdn:string): Promise<GetBasicUserinfo> {
    let _request = new GetBasicUserinfo(msisdn);
    return await this._client.execute(_request);
  }

  /**
   *
   * @param {string} msisdn - The MSISDN of the user
   * @param {string} scope - The scope of access | Optional, default: profile
   * @param {string} access_type - Access type | offline/online | Optional, default: offline
   * @param {string} callbackURL - Call back URL | Optional
   * @returns {Promise<GetUserInfoWithConsent>}
   */
  async getUserInfoWithConsent(msisdn:string, scope:string, access_type:'offline'|'online', callbackURL:string): Promise<GetUserInfoWithConsent> {
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
   *
   * @returns {Promise<GetAccountBalance>}
   */
  async getAccountBalance() {
    let _request = new GetAccountBalance();
    return await this._client.execute(_request);
  }

  /**
   *
   * @param {string} currency - ISO4217 Currency Code
   * @returns {Promise<GetAccountBalanceInSpecificCurrency>}
   */
  async getAccountBalanceInSpecificCurrency(currency:string) {
    let _request = new GetAccountBalanceInSpecificCurrency(currency);
    return await this._client.execute(_request);
  }

  /**
   *
   * @param {uuid} referenceId - Unique reference ID for the payment, UUID v4 preferred
   * @param {object} options - The additional options required for the pay request
   * @param {string} options.amount - Amount that will be debited from the payer account.
   * @param {string} options.currency - ISO4217 Currency Code
   * @param {string} options.externalId - External id is used as a reference to the transaction, not required to be unique.
   * @param {object} options.payer - The additional payer details, identifies a account holder in the wallet platform
   * @param {string} options.payer.partyIdType - Payer ID Type, should be either MSISDN, EMAIL or PARTY_CODE
   * @param {string} options.payer.partyId - Payer's party ID
   * @param {string} options.payerMessage - Message that will be written in the payer transaction history message field
   * @param {string} options.payeeNote - Message that will be written in the payee transaction history note field
   * @returns {Promise<RequestToPay>}
   */
  async requestToPay(referenceId:string, options: { amount: string; currency: string; externalId: string; payer: { partyIdType: string; partyId: string; }; payerMessage: string; payeeNote: string; }): Promise<RequestToPay> {
    let _request = new RequestToPay(referenceId, options);
    let _response = await this._client.execute(_request);
    _response.data = {
      status: true,
      referenceId: referenceId,
    };
    return _response;
  }

  /**
   *
   * @param {uuid} referenceId - The unique reference ID for the payment
   * @returns {Promise<RequestToPayTransactionStatus>}
   */
  async requestToPayTransactionStatus(referenceId:string): Promise<RequestToPayTransactionStatus> {
    let _request = new RequestToPayTransactionStatus(referenceId);
    return await this._client.execute(_request);
  }

  /**
   *
   * @param {uuid} referenceId - The unique reference ID for the payment request
   * @param {string} message - The message to send in the delivery notification | Max length 160
   * @param {string} language - An ISO 639-1 or ISO 639-3 language code
   * @returns {Promise<RequestToPayDeliveryNotification>}
   */
  async requestToPayDeliveryNotification(referenceId: string, message: string, language: string): Promise<RequestToPayDeliveryNotification> {
    let _request = new RequestToPayDeliveryNotification(
      referenceId,
      message,
      language
    );
    let _response = await this._client.execute(_request);
    _response.data = {
      status: true,
    };
    return _response;
  }

  /**
   *
   * @param {uuid} referenceId - A unique reference ID for the withdraw request, UUID v4 preferred
   * @param {object} options - The additional options required for the withdraw request
   * @param {string} options.amount - Amount that will be debited from the payer account
   * @param {string} options.currency - ISO4217 Currency Code
   * @param {string} options.externalId - External id is used as a reference to the transaction, not required to be unique.
   * @param {object} options.payer - The additional payer details, identifies a account holder in the wallet platform
   * @param {string} options.payer.partyIdType - Payer ID Type, should be either MSISDN, EMAIL or PARTY_CODE
   * @param {string} options.payer.partyId - Payer's party ID
   * @param {string} options.payerMessage - Message that will be written in the payer transaction history message field
   * @param {string} options.payeeNote - Message that will be written in the payee transaction history note field
   * @returns {Promise<RequestToWithdrawV1>}
   */
  async requestToWithdrawV1(referenceId:string, options: { amount: string; currency: string; externalId: string; payer: { partyIdType: string; partyId: string; }; payerMessage: string; payeeNote: string; }): Promise<RequestToWithdrawV1> {
    let _request = new RequestToWithdrawV1(referenceId, options);
    let _response = await this._client.execute(_request);
    _response.data = {
      status: true,
      referenceId: referenceId,
    };
    return _response;
  }

  /**
   *
   * @param {uuid} referenceId - A unique reference ID for the withdraw request, UUID v4 preferred
   * @param {object} options - The additional options required for the withdraw request
   * @param {string} options.amount - Amount that will be debited from the payer account
   * @param {string} options.currency - ISO4217 Currency Code
   * @param {string} options.externalId - External id is used as a reference to the transaction, not required to be unique.
   * @param {object} options.payer - The additional payer details, identifies a account holder in the wallet platform
   * @param {string} options.payer.partyIdType - Payer ID Type, should be either MSISDN, EMAIL or PARTY_CODE
   * @param {string} options.payer.partyId - Payer's party ID
   * @param {string} options.payerMessage - Message that will be written in the payer transaction history message field
   * @param {string} options.payeeNote - Message that will be written in the payee transaction history note field
   * @returns { Promise<RequestToWithdrawV2> }
   */
  async requestToWithdrawV2(referenceId:string, options: { amount: string; currency: string; externalId: string; payer: { partyIdType: string; partyId: string; }; payerMessage: string; payeeNote: string; }): Promise<RequestToWithdrawV2> {
    let _request = new RequestToWithdrawV2(referenceId, options);
    let _response = await this._client.execute(_request);
    _response.data = {
      status: true,
      referenceId: referenceId,
    };
    return _response;
  }

  /**
   *
   * @param {uuid} referenceId - The unique reference ID of the payment request
   * @returns {Promise<RequestToWithdrawTransactionStatus>}
   */
  async requestToWithdrawTransactionStatus(referenceId:string) {
    let _request = new RequestToWithdrawTransactionStatus(referenceId);
    return await this._client.execute(_request);
  }

  /**
   *
   * @param {string} accountHolderId - The account holder number/email/party code, validated according ID type
   * @param {string} accountHolderIdType - The type of the party ID. Allowed values [msisdn, email, party_code]
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

