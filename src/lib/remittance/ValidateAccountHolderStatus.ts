import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

/**
 * Request to check if an account holder is registered and active in the system
 */
export class ValidateAccountHolderStatus extends CoreRequest {
  /**
   *
   * @param {string} accountHolderId - The account holder number/email/party code, validated according ID type
   * @param {string} accountHolderIdType - The type of the party ID. Allowed values [msisdn, email, party_code]
   */
  constructor(accountHolderId: string, accountHolderIdType: string) {
    super();
    this.url = `/remittance/v1_0/accountholder/${accountHolderIdType}/${accountHolderId}/active`;
    this.method = "get";
    this.headers = new AxiosHeaders();
  }
}


