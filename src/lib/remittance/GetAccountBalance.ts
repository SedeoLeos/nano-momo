import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

/**
 * Account balance API
 *
 */
export class GetAccountBalance extends CoreRequest{
  constructor() {
    super()
    this.url = '/remittance/v1_0/account/balance';
    this.method = 'get';
    this.headers = new AxiosHeaders();
  }
}


