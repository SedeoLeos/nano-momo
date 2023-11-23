import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

type RequestToWithdrawV1Body = {
  amount: string;
  currency: string;
  externalId: string;
  payerMessage: string;
  payeeNote: string;
  payer: Payer;
}
type Payer = {
  partyIdType: string;
  partyId: string;
}
/**
 * An OAuth2 client credentials grant access token request
 */
export class RequestToWithdrawV1 extends CoreRequest {
  /**
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
   */
  constructor(referenceId: string, options: RequestToWithdrawV1Body) {
    super()
    this.url = "/collection/v1_0/requesttowithdraw";
    this.method = "post";
    this.data = options;
    this.headers = new AxiosHeaders();
    this.headers.setContentType('application/json')
    this.headers.set('X-Reference-Id', referenceId)

  }
}
