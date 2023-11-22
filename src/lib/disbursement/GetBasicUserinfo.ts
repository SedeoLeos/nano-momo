import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

/**
 * Request to get personal information of the account holder
 */
export class GetBasicUserinfo  extends CoreRequest{
    /**
     * @param {string} msisdn - The MSISDN of the user
     *
     *
     */
    constructor(msisdn:string) {
      super()
      this.url = `/disbursement/v1_0/accountholder/msisdn/${msisdn}/basicuserinfo`;
      this.method = 'get';
      this.headers = new AxiosHeaders();
    }
  }


