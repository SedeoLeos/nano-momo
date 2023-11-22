import { CoreRequest } from "../core/core-request";

import { AxiosHeaders }  from 'axios';

/**
 * Request to get the balance of the account
 */
export class GetAccountBalance  extends CoreRequest{
  constructor() {
    super();
    this.url = "/disbursement/v1_0/account/balance";
    this.method = "get";
    this.headers = new AxiosHeaders();
  }
}


