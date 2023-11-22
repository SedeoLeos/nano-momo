import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

/**
 * Basic user info API
 *
 */
export class GetBasicUserinfo extends CoreRequest {
    /**
     * @param {string} msisdn - The MSISDN of the user
     *
     */
    constructor(msisdn:string) {
      super();
      this.url = `/remittance/v1_0/accountholder/msisdn/${msisdn}/basicuserinfo`;
      this.method = 'get';
      this.headers = new AxiosHeaders();
    }
  }


