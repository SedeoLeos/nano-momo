import { AxiosHeaders } from "axios";
import { FormEncoded } from "../core/serializer";
import { CoreRequest } from "../core/core-request";


/**
 * Request to claim a consent by the account holder for the requested scopes
 */
export type BcAuthorizeInput = {
  scope:string,
  access_type:"offline"|"online",
  login_hint:string,
}
export class BcAuthorize extends CoreRequest {
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

    this.url = "/collection/v1_0/bc-authorize";
    this.method = "post";
    this.data = new FormEncoded().encode(body);
    this.headers = new AxiosHeaders();
    this.headers.setContentType('application/x-www-form-urlencoded')

    if (callbackURL !== undefined) {
      this.headers.set("X-Callback-Url", callbackURL);
    }
  }
}

