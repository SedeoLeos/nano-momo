import { Environment } from "../core/environement";
import { MMApiHttpClient } from "../core/momo-client";
import { BcAuthorize } from "./BcAuthorize";
import { CreateAccessToken } from "./CreateAccessToken";
import { CreateOauth2Token } from "./CreateOauth2Token";
import { DepositV1 } from "./DepositV1";
import { DepositV2 } from "./DepositV2";
import { GetAccountBalance } from "./GetAccountBalance";
import { GetAccountBalanceInSpecificCurrency } from "./GetAccountBalanceInSpecificCurrency";
import { GetBasicUserinfo } from "./GetBasicUserinfo";
import { GetDepositStatus } from "./GetDepositStatus";
import { GetRefundStatus } from "./GetRefundStatus";
import { GetTransferStatus } from "./GetTransferStatus";
import { GetUserInfoWithConsent } from "./GetUserInfoWithConsent";
import { RefundV1 } from "./RefundV1";
import { RefundV2 } from "./RefundV2";
import { RequestToPayDeliveryNotification } from "./RequestToPayDeliveryNotification";
import { Transfer } from "./Transfer";
import { ValidateAccountHolderStatus } from "./ValidateAccountHolderStatus";


export class Disbursement {
  private _client: MMApiHttpClient;
  /**
   *
   * @param {Environment} environment - The environment data specific to disbursement
   */
  constructor(environment: Environment) {
    this._client = new MMApiHttpClient(environment);
  }

  /**
   * This operation is used to create an access token which can then be used to authorize and authenticate towards the other end-points of the disbursement API.
   * @returns {Promise<CreateAccessToken>}
   */
  async createAccessToken(): Promise<CreateAccessToken> {
    let _request = new CreateAccessToken(this._client.environment);
    return await this._client.execute(_request);
  }

  /**
   * This operation returns personal information of the account holder
   * @param {string} msisdn - The MSISDN of the user
   * @returns {Promise<GetBasicUserinfo>}
   */
  async getBasicUserinfo(msisdn: string): Promise<GetBasicUserinfo> {
    let _request = new GetBasicUserinfo(msisdn);
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
  async getUserInfoWithConsent(msisdn: string, scope: string, access_type: 'offline'|'online', callbackURL: string): Promise<GetUserInfoWithConsent> {
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
   * Get the balance of the account
   * @returns {Promise<GetAccountBalance>}
   */
  async getAccountBalance(): Promise<GetAccountBalance> {
    let _request = new GetAccountBalance();
    return await this._client.execute(_request);
  }

  /**
   * Get the balance of the account in a specific currency
   * @param {string} currency - ISO4217 Currency Code
   * @returns {Promise<GetAccountBalanceInSpecificCurrency>}
   */
  async getAccountBalanceInSpecificCurrency(currency: string): Promise<GetAccountBalanceInSpecificCurrency> {
    let _request = new GetAccountBalanceInSpecificCurrency(currency);
    return await this._client.execute(_request);
  }

  /**
   * Transfer operation is used to transfer an amount from the own account to a payee account
   * @param {uuid} referenceId - Unique reference ID for the payment, UUID v4 preferred
   * @param {object} options - The additional options required for the pay request
   * @param {string} options.amount - Amount that will be debited from the payer account
   * @param {string} options.currency - ISO4217 Currency Code
   * @param {string} options.externalId - External id is used as a reference to the transaction, not required to be unique.
   * @param {object} options.payee - The additional payee details, identifies a account holder in the wallet platform
   * @param {string} options.payee.partyIdType - Payee ID Type, should be either MSISDN, EMAIL or PARTY_CODE
   * @param {string} options.payee.partyId - Payee's party ID
   * @param {string} options.payerMessage - Message that will be written in the payer transaction history message field
   * @param {string} options.payeeNote - Message that will be written in the payee transaction history note field
   * @param {string} callbackURL - Call back URL | Optional
   * @returns {Promise<Transfer>}
   */
  async transfer(referenceId: string, options: { amount: string; currency: string; externalId: string; payee: { partyIdType: string; partyId: string; }; payerMessage: string; payeeNote: string; }, callbackURL: string): Promise<Transfer> {
    let _request = new Transfer(referenceId, options, callbackURL);
    let _response = await this._client.execute(_request);
    _response.data = {
      status: true,
      referenceId: referenceId,
    };
    return _response;
  }

  /**
   * Check the status of the particular Transfer
   * @param {uuid} referenceId - The unique reference ID of the transfer request
   * @returns {Promise<GetTransferStatus>}
   */
  async getTransferStatus(referenceId: string): Promise<GetTransferStatus> {
    let _request = new GetTransferStatus(referenceId);
    return await this._client.execute(_request);
  }

  /**
   * This operation is used to send additional Notification to an End User
   * @param {uuid} referenceId - The unique reference ID of the payment request
   * @param {string} message - The message to send in the delivery notification | Max length 160
   * @param {string} language - An ISO 639-1 or ISO 639-3 language code | Optional
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
   * This operation is used to check if an account holder is registered and active in the system
   * @param {string} accountHolderId - The account holder number/email/party code, validated according ID type
   * @param {string} accountHolderIdType - The type of the party ID. Allowed values [msisdn, email, party_code]
   * @returns {Promise<ValidateAccountHolderStatus>}
   */
  async validateAccountHolderStatus(accountHolderId: string, accountHolderIdType: string): Promise<ValidateAccountHolderStatus> {
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

  /**
   * Deposit operation is used to deposit an amount from the owner’s account to a payee account
   * @param {uuid} referenceId - Unique reference ID for the payment, UUID v4 preferred
   * @param {object} options - The additional options required for the pay request
   * @param {string} options.amount - Amount that will be debited from the payer account
   * @param {string} options.currency - ISO4217 Currency Code
   * @param {string} options.externalId - External id is used as a reference to the transaction, not required to be unique.
   * @param {object} options.payee - The additional payee details, identifies a account holder in the wallet platform
   * @param {string} options.payee.partyIdType - Payee ID Type, should be either MSISDN, EMAIL or PARTY_CODE
   * @param {string} options.payee.partyId - Payee's party ID
   * @param {string} options.payerMessage - Message that will be written in the payer transaction history message field
   * @param {string} options.payeeNote - Message that will be written in the payee transaction history note field
   * @param {string} callbackURL - Call back URL | Optional
   * @returns {Promise<DepositV1>}
   */
  async depositV1(referenceId: string, options: { amount: string; currency: string; externalId: string; payee: { partyIdType: string; partyId: string; }; payerMessage: string; payeeNote: string; }, callbackURL: string): Promise<DepositV1> {
    let _request = new DepositV1(referenceId, options, callbackURL);
    let _response = await this._client.execute(_request);
    _response.data = {
      status: true,
      referenceId: referenceId,
    };
    return _response;
  }

  /**
   * Deposit operation is used to deposit an amount from the owner’s account to a payee account
   * @param {uuid} referenceId - Unique reference ID for the payment, UUID v4 preferred
   * @param {object} options - The additional options required for the pay request
   * @param {string} options.amount - Amount that will be debited from the payer account
   * @param {string} options.currency - ISO4217 Currency Code
   * @param {string} options.externalId - External id is used as a reference to the transaction, not required to be unique.
   * @param {object} options.payee - The additional payee details, identifies a account holder in the wallet platform
   * @param {string} options.payee.partyIdType - Payee ID Type, should be either MSISDN, EMAIL or PARTY_CODE
   * @param {string} options.payee.partyId - Payee's party ID
   * @param {string} options.payerMessage - Message that will be written in the payer transaction history message field
   * @param {string} options.payeeNote - Message that will be written in the payee transaction history note field
   * @param {string} callbackURL - Call back URL | Optional
   * @returns {Promise<DepositV2>}
   */
  async depositV2(referenceId: string, options: { amount: string; currency: string; externalId: string; payee: { partyIdType: string; partyId: string; }; payerMessage: string; payeeNote: string; }, callbackURL: string): Promise<DepositV2> {
    let _request = new DepositV2(referenceId, options, callbackURL);
    let _response = await this._client.execute(_request);
    _response.data = {
      status: true,
      referenceId: referenceId,
    };
    return _response;
  }

  /**
   * Check the status of the particular Deposit
   * @param {uuid} referenceId - The unique reference ID of the deposit request
   * @returns {Promise<GetDepositStatus>}
   */
  async getDepositStatus(referenceId: string): Promise<GetDepositStatus> {
    let _request = new GetDepositStatus(referenceId);
    return await this._client.execute(_request);
  }

  /**
   * Refund operation is used to refund an amount from the owner’s account to a payee account
   * @param {uuid} referenceId - Unique reference ID for the payment, UUID v4 preferred
   * @param {object} options - The additional options required for the pay request
   * @param {string} options.amount - Amount that will be debited from the payer account
   * @param {string} options.currency - ISO4217 Currency Code
   * @param {string} options.externalId - External id is used as a reference to the transaction, not required to be unique.
   * @param {string} options.payerMessage - Message that will be written in the payer transaction history message field
   * @param {string} options.payeeNote - Message that will be written in the payee transaction history note field
   * @param {string} options.referenceIdToRefund - Resource ID of the created refund transaction, UUID v4 preferred
   * @param {string} callbackURL - Call back URL | Optional
   * @returns {Promise<RefundV1>}
   */
  async refundV1(referenceId: string, options: { amount: string; currency: string; externalId: string; payerMessage: string; payeeNote: string; referenceIdToRefund: string; }, callbackURL: string): Promise<RefundV1> {
    let _request = new RefundV1(referenceId, options, callbackURL);
    let _response = await this._client.execute(_request);
    _response.data = {
      status: true,
      referenceId: referenceId,
    };
    return _response;
  }

  /**
   * Refund operation is used to refund an amount from the owner’s account to a payee account
   * @param {uuid} referenceId - Unique reference ID for the payment, UUID v4 preferred
   * @param {object} options - The additional options required for the pay request
   * @param {string} options.amount - Amount that will be debited from the payer account
   * @param {string} options.currency - ISO4217 Currency Code
   * @param {string} options.externalId - External id is used as a reference to the transaction, not required to be unique.
   * @param {string} options.payerMessage - Message that will be written in the payer transaction history message field
   * @param {string} options.payeeNote - Message that will be written in the payee transaction history note field
   * @param {string} options.referenceIdToRefund - Resource ID of the created refund transaction, UUID v4 preferred
   * @param {string} callbackURL - Call back URL | Optional
   * @returns {Promise<RefundV2>}
   */
  async refundV2(referenceId: string, options: { amount: string; currency: string; externalId: string; payerMessage: string; payeeNote: string; referenceIdToRefund: string; }, callbackURL: string): Promise<RefundV2> {
    let _request = new RefundV2(referenceId, options, callbackURL);
    let _response = await this._client.execute(_request);
    _response.data = {
      status: true,
      referenceId: referenceId,
    };
    return _response;
  }

  /**
   * Check the status of the particular refund
   * @param {uuid} referenceId - The unique reference ID of the refund request
   * @returns {Promise<GetRefundStatus>}
   */
  async getRefundStatus(referenceId: string): Promise<GetRefundStatus> {
    let _request = new GetRefundStatus(referenceId);
    return await this._client.execute(_request);
  }
}

