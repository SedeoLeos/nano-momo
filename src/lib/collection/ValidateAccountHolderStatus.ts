import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

/**
 * An OAuth2 client credentials grant access token request
 */
export class ValidateAccountHolderStatus extends CoreRequest {
  /**
   *
   * @param {string} accountHolderId - The account holder number/email/party code, validated according ID type
   * @param {string} accountHolderIdType - The type of the party ID. Allowed values [msisdn, email, party_code]
   */
  constructor(accountHolderId, accountHolderIdType) {
    super();
    this.url = `/collection/v1_0/accountholder/${accountHolderIdType}/${accountHolderId}/active`;
    this.method = "get";
    this.headers = new AxiosHeaders();
  }
}

