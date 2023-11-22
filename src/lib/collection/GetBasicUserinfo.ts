import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

/**
 * An OAuth2 client credentials grant access token request
 */
export class GetBasicUserinfo extends CoreRequest {
    /**
     * @param {string} msisdn - The MSISDN of the user
     *
     *
     */
    constructor(msisdn:string) {
      super()
      this.url = `/collection/v1_0/accountholder/msisdn/${msisdn}/basicuserinfo`;
      this.method = 'get';
      this.headers = new AxiosHeaders();
    }
  }

