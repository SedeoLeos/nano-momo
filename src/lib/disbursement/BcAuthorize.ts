import { AxiosHeaders } from "axios";
import { BcAuthorizeInput } from "../collection/BcAuthorize";
import { CoreRequest } from "../core/core-request";
import { FormEncoded } from "../core/serializer";


/**
 * Request to claim a consent by the account holder for the requested scopes
 */
export class BcAuthorize  extends CoreRequest{
  /**
   *
   * @param {string} msisdn - The MSISDN of the user
   * @param {string} scope - The scope of access | Optional, default: profile
   * @param {string} access_type - Access type | offline/online | Optional, default: offline
   * @param {string} callbackURL - Call back URL | Optional
   *
   */
  constructor(msisdn:string, scope:string='profile', access_type:"offline"|"online"="offline", callbackURL?:string) {
    super();
    const body :BcAuthorizeInput = {
      login_hint: `ID:${msisdn}/MSISDN`,
      scope,
      access_type,
    };
    this.url = "/disbursement/v1_0/bc-authorize";
    this.method = "post";
    this.data = new FormEncoded().encode(body);
    this.headers = new AxiosHeaders();
    this.headers.setContentType('application/x-www-form-urlencoded')

    if (callbackURL !== undefined) {
      this.headers.set("X-Callback-Url",  callbackURL);
    }
  }
}

module.exports = {
  BcAuthorize,
};
